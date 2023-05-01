import dotenv from 'dotenv';
dotenv.config();

import { CustomClient } from './extensions';
import { Logger } from './services/logger';

const client = new CustomClient();

async function start(): Promise<void> {
    await client.start();
}

start().catch(error => {
    Logger.error('Failed to start the bot', error);
});

export default client;
