import Discord, {
    ActionRowBuilder,
    ButtonStyle,
    MessageActionRowComponentBuilder,
} from 'discord.js';

import { ButtonActionRowBuilder } from './ActionRowBuilder';

export class ButtonBuilder extends Discord.ButtonBuilder {
    constructor() {
        super();
    }

    public label = (label: string): ButtonActionRowBuilder => {
        this.setLabel(label);
        return this.build();
    };

    public style = (style: ButtonStyle): ButtonActionRowBuilder => {
        this.setStyle(style);
        return this.build();
    };

    public customId = (customId: string): ButtonActionRowBuilder => {
        this.setCustomId(customId);
        return this.build();
    };

    public emoji = (emoji: string): ButtonActionRowBuilder => {
        this.setEmoji(emoji);
        return this.build();
    };

    public url = (url: string): ButtonActionRowBuilder => {
        this.setURL(url);
        return this.build();
    };

    build(): ButtonActionRowBuilder {
        const actionRow = new ActionRowBuilder<MessageActionRowComponentBuilder>();
        actionRow.addComponents(this);
        return actionRow;
    }
}
