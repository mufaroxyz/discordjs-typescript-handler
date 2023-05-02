# 📥 **Installation**
Copy and paste the commands into your terminal (or download the zip)
```
git clone https://github.com/xMufaro/discordjs-typescript-handler discord-bot
cd discord-bot
pnpm install
```
Or use the [CLI](https://github.com/xmufaro/create-discordjs-bot)
```
npx @xmufaro/create-discordjs-bot
```

### Configure
`.env`
```toml
clientToken= Your Discord Bot Token
```
`config.json`
```jsonc
{
    "guildId": "", // Your Guild ID (OPTIONAL, only needed for guild specific slash commands)
    "prefix": "!",
    "features": {
        //... Decide which features you want to use      
    }
}


```

### Run
```
pnpm dev # Development
pnpm build # Build
pnpm start # Production
```


# ✨ **Features**
- Slash Commands, Buttons, Select Menus, Modals, Context Menu Handler
- Message Commands Handler (for the oldschool homies)
- Event Handler
- Customizable
- Typescript
- Easy to use
- Based on [discord.js](https://discord.js.org/#/)

# ❓ **Usage (Examples)**
## Slash Commands
```ts
import { Command } from '../../handlers';
import { ButtonActionRowBuilder } from "../../../structures/ActionRowBuilder"
import { ApplicationCommandOptionType, ApplicationCommandType, ButtonBuilder, ButtonStyle } from 'discord.js';

export default new Command({
    name: 'example',
    description: 'Test command',
    type: ApplicationCommandType.ChatInput // You can also use User and Message for context menus
    options: [
        {
            name: 'example',
            description: 'Example option',
            type: ApplicationCommandOptionType.String,
            required: true,
        },
    ]
    run: async ({ interaction, args, client }) => {
        const example = args.getString('example');
        const buttons = new ButtonActionRowBuillder().addComponents([
            new ButtonBuilder().setCustomId("example-1-2-3").setLabel("Example Button").setStyle(ButtonStyle.Primary)
        ])

        await interaction.reply({
            content: `Hello World! ${example}, ${client.ws.ping}ms`, 
            components: [buttons]
        });
    },
});
```

## Buttons
```ts
import { Button } from '../handlers';

export default new Button({
    custom_id: 'example', // You can transfer basic data through ids seperating it by '-' (example-1-2-3), first element is always the id the handler will be looking for, in that case, when a button with id 'example' is pressed, the handler will run the function below
    run: async ({ interaction, args }) => {
        const example = args[0] // args is the basic data we passed through the id before (example-1-2-3), which in this case returns '1'
        await interaction.reply('Hello World!');
    },
});
```

### **📝 The same rule applies to Select Menus and Modals**
