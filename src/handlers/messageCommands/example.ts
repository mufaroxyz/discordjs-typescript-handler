import { MessageCommand } from '../handlers';

export default new MessageCommand({
    name: 'example',
    run: async ({ message }) => {
        message.reply('Example message command triggered!');
    },
});
