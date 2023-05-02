import { Modal } from '../handlers';

export default new Modal({
    custom_id: 'example',
    run: async ({ interaction }) => {
        await interaction.reply('Modal example');
    },
});
