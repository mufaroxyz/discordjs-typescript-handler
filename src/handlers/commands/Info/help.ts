import { Command } from '../../handlers';
import { ApplicationCommandType, EmbedBuilder } from 'discord.js';

export default new Command({
    name: 'help',
    description: 'Shows all commands',
    type: ApplicationCommandType.ChatInput,
    run: async ({ interaction, client }) => {
        const pages = client.helpService.renderPage(0);
        const actionRow = client.helpService.renderActionRow(0);

        const pagesEmbed = new EmbedBuilder().setTitle('Help').setDescription(pages);
        await interaction.reply({ embeds: [pagesEmbed], components: [actionRow] });
    },
});
