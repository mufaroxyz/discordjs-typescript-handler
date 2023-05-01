import { ActivityType } from 'discord.js';

import client from '@client';
import { Event } from '../extensions/event';

export default new Event('ready', () => {
    client.user.setActivity(`/help | ${client.user.tag}`, {
        type: ActivityType.Playing,
    }); // feel free to remove that and do whatever you want
});
