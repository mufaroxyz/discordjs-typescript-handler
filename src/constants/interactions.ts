import {
    AnySelectMenuInteraction,
    ApplicationCommandData,
    BaseApplicationCommandData,
    ButtonInteraction,
    ChatInputApplicationCommandData,
    CommandInteraction,
    CommandInteractionOptionResolver,
    GuildMember,
    Message,
    MessageApplicationCommandData,
    ModalSubmitFields,
    ModalSubmitInteraction,
    PermissionResolvable,
    UserApplicationCommandData,
} from 'discord.js';

import { CustomClient } from '../extensions';

// Application command handler

export interface ExtendedInteraction extends CommandInteraction {
    member: GuildMember;
}

interface RunOptions {
    client: CustomClient;
    interaction: ExtendedInteraction;
    args: CommandInteractionOptionResolver;
}

type RunFunction = (options: RunOptions) => any;

export type CommandType = (
    | ({
          userPermissions?: PermissionResolvable[];
          run: RunFunction;
      } & ChatInputApplicationCommandData)
    | ({
          userPermissions?: PermissionResolvable[];
          run: RunFunction;
      } & MessageApplicationCommandData)
    | ({
          userPermissions?: PermissionResolvable[];
          run: RunFunction;
      } & UserApplicationCommandData)
) & {
    type: ApplicationCommandData['type'];
};

// Button handler

export interface ExtendedButtonInteraction extends ButtonInteraction {
    member: GuildMember;
}

type ButtonRunFunction = (options: ButtonRunOptions) => any;

interface ButtonRunOptions {
    client: CustomClient;
    interaction: ExtendedButtonInteraction;
    args: string[];
}

export type ButtonType = {
    custom_id: string;
    run: ButtonRunFunction;
};

// Select menu handler (Currently AnySelectMenuInteraction)
type SelectMenuRunFunction = (options: SelectMenuRunOptions) => any;

interface SelectMenuRunOptions {
    client: CustomClient;
    interaction: AnySelectMenuInteraction;
    args: string[];
    values: string[];
}

export type SelectMenuType = {
    custom_id: string;
    type: 'String' | 'Role' | 'User' | 'Channel';
    run: SelectMenuRunFunction;
};

// Modal handler

type ModalRunFunction = (options: ModalRunOptions) => any;

interface ModalRunOptions {
    client: CustomClient;
    interaction: ModalSubmitInteraction;
    args: string[];
    fields: ModalSubmitFields;
}

export type ModalType = {
    custom_id: string;
    run: ModalRunFunction;
};

// Message handler

type MessageRunFunction = (options: MessageRunOptions) => any;

interface MessageRunOptions {
    client: CustomClient;
    message: Message;
    args: string[];
}

export type MessageCommandType = {
    name: string;
    run: MessageRunFunction;
};
