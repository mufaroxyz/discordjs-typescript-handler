import {
    ChannelSelectMenuInteraction,
    CommandInteractionOptionResolver,
    RoleSelectMenuInteraction,
    StringSelectMenuInteraction,
    UserSelectMenuInteraction,
} from 'discord.js';

import { ExtendedButtonInteraction, ExtendedInteraction } from '../constants/interactions';
import { Event } from '../extensions/event';
import client from '..';

export default new Event('interactionCreate', async interaction => {
    if (interaction.isCommand()) {
        const command = client.commands.get(interaction.commandName);
        if (!command) return await interaction.followUp("`❌` The command doesn't exist!");
        command.run({
            args: interaction.options as CommandInteractionOptionResolver,
            client,
            interaction: interaction as ExtendedInteraction,
        });
    } else if (interaction.isButton()) {
        const args = interaction.customId.split('-');

        const button = client.buttons.get(args[0]);
        if (!button) return await interaction.reply("`❌` The button doesn't exist!");
        button.run({
            client,
            interaction: interaction as ExtendedButtonInteraction,
            args: args.slice(1),
        });
    } else if (interaction.isAnySelectMenu()) {
        const args = interaction.customId.split('-');
        const selectMenu = client.selectMenus.get(args[0]);

        switch (selectMenu.type) {
            case 'String':
                selectMenu.run({
                    client,
                    interaction: interaction as StringSelectMenuInteraction,
                    args: args.slice(1),
                    values: interaction.values,
                });
                break;
            case 'Role':
                selectMenu.run({
                    client,
                    interaction: interaction as RoleSelectMenuInteraction,
                    args: args.slice(1),
                    values: interaction.values,
                });
                break;
            case 'User':
                selectMenu.run({
                    client,
                    interaction: interaction as UserSelectMenuInteraction,
                    args: args.slice(1),
                    values: interaction.values,
                });
                break;
            case 'Channel':
                selectMenu.run({
                    client,
                    interaction: interaction as ChannelSelectMenuInteraction,
                    args: args.slice(1),
                    values: interaction.values,
                });
                break;
            default:
                break;
        }
    } else if (interaction.isModalSubmit()) {
        const args = interaction.customId.split('-');
        const modal = client.modals.get(args[0]);
        if (!modal) return await interaction.reply("`❌` The modal doesn't exist!");
        modal.run({
            client,
            interaction: interaction,
            fields: interaction.fields,
            args: args.slice(1),
        });
    }
});
