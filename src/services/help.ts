import { ButtonActionRowBuilder } from '../structures/ActionRowBuilder';
import { CustomClient } from '../extensions/customClient';
import { ButtonBuilder, ButtonStyle } from 'discord.js';

interface CommandData {
    name: string;
    commandId: string;
    description: string;
}

interface PaginatedCommandData {
    name: string;
    commandId: string;
    description: string | undefined;
}

interface PaginatedCommandChunk {
    page: number;
    commands: PaginatedCommandData[];
}

export class HelpService {
    private helpPages: Map<number, PaginatedCommandData[]>;
    public client: CustomClient;
    public commandsPerPage: number;

    constructor(client: CustomClient, commandsPerPage: number) {
        this.helpPages = new Map();
        this.client = client;
        this.commandsPerPage = commandsPerPage;
    }

    public async syncPagesLocally(): Promise<void> {
        const commandChunks: CommandData[] = [];

        while (!this.client.isReady) {
            await new Promise(resolve => setTimeout(resolve, 1000));
        }

        for (const command of this.client.application.commands.cache.values()) {
            commandChunks.push({
                name: command.name,
                commandId: command.id,
                description: command.description,
            });
        }

        const paginatedCommands: PaginatedCommandChunk[] = commandChunks.reduce(
            (acc: PaginatedCommandChunk[], command: CommandData, i: number) => {
                const index = Math.floor(i / this.commandsPerPage);
                acc[index] = acc[index] ?? { page: index, commands: [] };
                acc[index].commands.push({
                    name: command.name,
                    commandId: command.commandId,
                    description: command.description,
                });
                return acc;
            },
            []
        );

        paginatedCommands.forEach(({ page, commands }) => {
            const helpPage: PaginatedCommandData[] = commands.map(
                ({ name, commandId, description }) => ({
                    name,
                    commandId,
                    description,
                })
            );
            this.helpPages.set(page, helpPage);
        });
    }

    public renderPage(page: number): string {
        const commands = this.getHelpPage(page);
        let output = '';
        for (const command of commands) {
            output += `> </${command.name}:${command.commandId}> - ${command.description}\n`;
        }
        return output;
    }

    public renderActionRow(page: number): ButtonActionRowBuilder {
        const actionRow = new ButtonActionRowBuilder();
        const maxPage = this.helpPages.size - 1;
        actionRow.addComponents([
            new ButtonBuilder()
                .setCustomId(`helpChangePage-previous-${page}`)
                .setLabel('Previous')
                .setStyle(ButtonStyle.Primary)
                .setDisabled(page == 0),

            new ButtonBuilder()
                .setCustomId(`helpChangePage-next-${page}`)
                .setLabel('Next')
                .setStyle(ButtonStyle.Primary)
                .setDisabled(page == maxPage),
        ]);
        return actionRow;
    }

    private getHelpPage(page: number): PaginatedCommandData[] {
        return this.helpPages.get(page);
    }
}
