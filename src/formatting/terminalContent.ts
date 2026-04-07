import { DivStyle } from "./styles";

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
    style = DivStyle.greenTextDim;
    text;

    constructor(content: string) {
        this.text   = content;
    }
}

export class NormalGreenLine implements TerminalContent {
    style = DivStyle.greenTextNormal;
    text;

    constructor(content: string) {
        this.text   = content;
    }
}

export class BrightGreenLine implements TerminalContent {
    style = DivStyle.greenTextBright;
    text;

    constructor(content: string) {
        this.text   = content;
    }
}

export class AmberLine implements TerminalContent {
    style = DivStyle.amberTextNormal;
    text;

    constructor(content: string) {
        this.text   = content;
    }
}

