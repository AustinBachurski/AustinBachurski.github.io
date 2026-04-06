import { DivStyle } from "./styles";

export interface TerminalContent {
    style:  DivStyle;
    text:   string;
}

export class BlankLine implements TerminalContent {
    style:  DivStyle = DivStyle.empty;
    text:   string = "";
}

export class HtmlContent implements TerminalContent {
    style:  DivStyle = DivStyle.html;
    text:   string;

    constructor(content: string) {
        this.text = content;
    }
}

export class TextContent implements TerminalContent {
    style:  DivStyle;
    text:   string;

    constructor(style: DivStyle, content: string) {
        this.style  = style;
        this.text   = content;
    }
}

