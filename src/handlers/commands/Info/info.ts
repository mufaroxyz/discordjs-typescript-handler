import { Command } from '../../handlers';
import Discord, { ApplicationCommandType, EmbedBuilder } from 'discord.js';
import os from 'node:os';
import typescript from 'typescript';

import { FormatUtils } from '../../../utils/formatUtils';

import TSConfig from '../../../../tsconfig.json';

export default new Command({
    name: 'info',
    description: "Show's the bot's info",
    type: ApplicationCommandType.ChatInput,
    run: async ({ interaction }) => {
        const embed = new EmbedBuilder().setTitle('Info').setColor('#2f3136');

        const serverCount = interaction.client.guilds.cache.size;
        let memory = process.memoryUsage();

        embed.setDescription(`
            **Versions**
            **Node.js**: ${process.version}
            **TypeScript**: v${typescript.version}
            **ECMAScript**: ${TSConfig.compilerOptions.target}
            **discord.js**: v${Discord.version}

            **Stats**
            **Servers**: ${serverCount}

            **Memory**
            **RSS**: ${FormatUtils.fileSize(memory.rss)} (${FormatUtils.fileSize(
            memory.rss / serverCount
        )}/Server)
            **Heap**: ${FormatUtils.fileSize(memory.heapTotal)} (${FormatUtils.fileSize(
            memory.heapTotal / serverCount
        )}/Server)
            **Heap Used**: ${FormatUtils.fileSize(memory.heapUsed)} (${FormatUtils.fileSize(
            memory.heapUsed / serverCount
        )}/Server)

            **IDs**
            **Hostname**: ${os.hostname()}
            **PID**: ${process.pid}
            **Server ID**: ${interaction.guildId}
            **Bot ID**: ${interaction.client.user.id}
            **User ID**: ${interaction.user.id}
        `);

        await interaction.reply({ embeds: [embed] });
    },
});
