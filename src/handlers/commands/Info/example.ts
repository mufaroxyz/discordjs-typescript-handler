import { Command } from '../../handlers';
import { ApplicationCommandType } from 'discord.js';

export default new Command({
    name: 'example',
    type: ApplicationCommandType.User,
    run: async ({ interaction }) => {
        await interaction.reply({
            content: 'Example command',
            ephemeral: true,
        });
    },
});
