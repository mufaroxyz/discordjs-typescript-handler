import {
    ApplicationCommandDataResolvable,
    Client,
    ClientEvents,
    Collection,
    GatewayIntentBits,
    Partials,
} from 'discord.js';
import glob from 'glob';
import { promisify } from 'node:util';

import { Event } from './event';
import { RegisterCommandsOptions } from '../constants/client';
import {
    ButtonType,
    CommandType,
    MessageCommandType,
    ModalType,
    SelectMenuType,
} from '../constants/interactions';
import { HelpService } from '../services';
import { Logger } from '../services/logger';
import config from '../../config.json';

const globPromisify = promisify(glob);

export class CustomClient extends Client {
    commands: Collection<string, CommandType> = new Collection();
    buttons: Collection<string, ButtonType> = new Collection();
    selectMenus: Collection<string, SelectMenuType> = new Collection();
    modals: Collection<string, ModalType> = new Collection();
    messageCommands: Collection<string, MessageCommandType> = new Collection();
    helpService = new HelpService(this, 5);
    config = config;

    constructor() {
        super({
            intents: [
                GatewayIntentBits.Guilds,
                GatewayIntentBits.MessageContent,
                GatewayIntentBits.GuildMessages,
                GatewayIntentBits.GuildMembers,
            ],
            partials: [Partials.Message, Partials.User, Partials.Channel, Partials.GuildMember],
        });
    }

    async start(): Promise<void> {
        await this.loadHandlers();
        this.login(process.env.clientToken);
    }
    async importFile(filePath: string): Promise<any> {
        return (await import(filePath))?.default;
    }

    async registerCommands({ commands, guildId }: RegisterCommandsOptions): Promise<void> {
        if (guildId) {
            await (await this.guilds.fetch(guildId)).commands.set(commands);
            Logger.info(`Registered commands in guild [ ${guildId} ]`);
        } else {
            this.application?.commands.set(commands);
            Logger.info(`Registered commands globally`);
        }
    }

    async loadHandlers(): Promise<void> {
        if (config.features.commands)
            await controllerHandler<CommandType>({
                path: 'commands',
                collection: this.commands,
            });
        if (config.features.buttons)
            await controllerHandler<ButtonType>({
                path: 'buttons',
                collection: this.buttons,
            });
        if (config.features.selectMenus)
            await controllerHandler<SelectMenuType>({
                path: 'selectMenus',
                collection: this.selectMenus,
            });
        if (config.features.modals)
            await controllerHandler<ModalType>({
                path: 'modals',
                collection: this.modals,
            });
        if (config.features.messageCommands)
            await controllerHandler<MessageCommandType>({
                path: 'messageCommands',
                collection: this.messageCommands,
            });

        const eventFiles = await globPromisify(`${__dirname}/../events/*{.ts,.js}`);
        Logger.info(`Found [ ${eventFiles.length} ] events`);
        eventFiles.forEach(async filePath => {
            const event: Event<keyof ClientEvents> = await this.importFile(filePath);
            this.on(event.event, event.run);
        });

        this.on('ready', () => {
            const commands = this.commands.map(
                command => command as ApplicationCommandDataResolvable
            );
            this.registerCommands({
                commands: commands,
                guildId: config.guildId,
            });
            this.helpService.syncPagesLocally();
            Logger.info(`Logged in as ${this.user?.tag}`);
        });
    }
}

interface ControllerHandler<T> {
    path: string;
    type?: T;
    collection: Collection<string, { [key: string]: any }>;
}

async function controllerHandler<T>({
    path,
    type = {} as T,
    collection,
}: ControllerHandler<T>): Promise<void> {
    const files = await globPromisify(`${__dirname}/../handlers/${path}/**/*{.ts,.js}`);
    Logger.info(`Found [ ${files.length} ] ${path}`);
    files.forEach(async filePath => {
        const item: { [key: string]: any } = await import(filePath).then(m => m.default);

        if (!(item instanceof Object)) {
            Logger.error(
                `Invalid ${path.slice(0, -1)} element [${filePath}]: ${JSON.stringify(item)}`
            );
            return;
        }
        collection.set(item.custom_id || item.name, item);
    });
}
