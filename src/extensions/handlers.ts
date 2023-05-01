import {
    ButtonType,
    CommandType,
    ModalType,
    SelectMenuType,
    MessageCommandType,
} from '@/constants/interactions';

export class SelectMenu {
    constructor(selectMenuOptions: SelectMenuType) {
        Object.assign(this, selectMenuOptions);
    }
}

export class Modal {
    constructor(modalOptions: ModalType) {
        Object.assign(this, modalOptions);
    }
}

export class Command {
    constructor(commandOptions: CommandType) {
        Object.assign(this, commandOptions);
    }
}

export class Button {
    constructor(buttonOptions: ButtonType) {
        Object.assign(this, buttonOptions);
    }
}

export class MessageCommand {
    constructor(messageOptions: MessageCommandType) {
        Object.assign(this, messageOptions);
    }
}
