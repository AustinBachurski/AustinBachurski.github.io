import { DivStyle }     from "./styles.js";
import { WriteDelay }   from "../terminal/writeDelay.js";

export interface TerminalContent {
    style:  DivStyle;
    text:   string;
    typeDelay: number;
}

export class BlankLine implements TerminalContent {
    style = DivStyle.empty;
    text = "";
    typeDelay = WriteDelay.ms_0;
}

export class HtmlLine implements TerminalContent {
    style = DivStyle.html;
    text;
    typeDelay = WriteDelay.ms_0;

    constructor(content: string) {
        this.text = content;
    }
}

export class DimGreenLine implements TerminalContent {
    style = DivStyle.dimGreenText;
    text;
    typeDelay;

    constructor(content: string, delay = WriteDelay.ms_7) {
        this.text   = content;
        this.typeDelay = delay;
    }
}

export class NormalGreenLine implements TerminalContent {
    style = DivStyle.normalGreenText;
    text;
    typeDelay;

    constructor(content: string, delay = WriteDelay.ms_7) {
        this.text   = content;
        this.typeDelay = delay;
    }
}

export class BrightGreenLine implements TerminalContent {
    style = DivStyle.brightGreenText;
    text;
    typeDelay;

    constructor(content: string, delay = WriteDelay.ms_7) {
        this.text   = content;
        this.typeDelay = delay;
    }
}

export class AmberLine implements TerminalContent {
    style = DivStyle.normalAmberText;
    text;
    typeDelay;

    constructor(content: string, delay = WriteDelay.ms_7) {
        this.text   = content;
        this.typeDelay = delay;
    }
}

