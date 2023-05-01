import { ClientEvents } from 'discord.js';
import { CustomClient } from './customClient';

export class Event<Key extends keyof ClientEvents> {
    constructor(public event: Key, public run: (...args: ClientEvents[Key]) => any) {}
}
