import {
    ActionRowBuilder,
    MessageActionRowComponentBuilder,
    ModalActionRowComponentBuilder,
} from 'discord.js';

export class ButtonActionRowBuilder extends ActionRowBuilder<MessageActionRowComponentBuilder> {
    addComponents(components: MessageActionRowComponentBuilder[]): this {
        return Object.assign(this, { components });
    }
}

export class ModalActionRowBuilder extends ActionRowBuilder<ModalActionRowComponentBuilder> {
    addComponents(components: ModalActionRowComponentBuilder[]): this {
        return Object.assign(this, { components });
    }
}
