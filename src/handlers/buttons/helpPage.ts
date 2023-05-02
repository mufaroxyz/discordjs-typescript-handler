import { Button } from '../handlers';
import { EmbedBuilder } from 'discord.js';

export default new Button({
    custom_id: 'helpChangePage',
    run: async ({ interaction, client, args }) => {
        const changeType = args[0];

        if (changeType === 'next') {
            const page = args[1];
            const pages = client.helpService.renderPage(parseInt(page) + 1);
            const actionRow = client.helpService.renderActionRow(parseInt(page) + 1);

            const pagesEmbed = new EmbedBuilder().setTitle('Help').setDescription(pages);
            await interaction.update({ embeds: [pagesEmbed], components: [actionRow] });
            return;
        } else if (changeType === 'previous') {
            const page = args[1];
            const pages = client.helpService.renderPage(parseInt(page) - 1);
            const actionRow = client.helpService.renderActionRow(parseInt(page) - 1);

            const pagesEmbed = new EmbedBuilder().setTitle('Help').setDescription(pages);
            await interaction.update({ embeds: [pagesEmbed], components: [actionRow] });
            return;
        }
    },
});
