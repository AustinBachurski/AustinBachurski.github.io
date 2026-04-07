import { DivStyle } from "./styles.js";

export interface TerminalContent {
    style:  DivStyle;
    text:   string;
}

export class BlankLine implements TerminalContent {
    style = DivStyle.empty;
    text = "";
}

export class HtmlLine implements TerminalContent {
    style = DivStyle.html;
    text;

    constructor(content: string) {
        this.text = content;
    }
}

export class DimGreenLine implements TerminalContent {
    style = DivStyle.dimGreenText;
    text;

    constructor(content: string) {
        this.text   = content;
    }
}

export class NormalGreenLine implements TerminalContent {
    style = DivStyle.normalGreenText;
    text;

    constructor(content: string) {
        this.text   = content;
    }
}

export class BrightGreenLine implements TerminalContent {
    style = DivStyle.brightGreenText;
    text;

    constructor(content: string) {
        this.text   = content;
    }
}

export class AmberLine implements TerminalContent {
    style = DivStyle.normalAmberText;
    text;

    constructor(content: string) {
        this.text   = content;
    }
}

