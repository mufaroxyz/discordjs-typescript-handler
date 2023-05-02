import { SelectMenu } from '../handlers';

export default new SelectMenu({
    custom_id: 'test',
    type: 'String',
    run: async ({ interaction, args, values }) => {
        interaction.reply(`Select menu ${interaction.customId} triggered!`);
    },
});
