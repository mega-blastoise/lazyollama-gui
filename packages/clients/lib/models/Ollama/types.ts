import { parse as parseHtml } from 'node-html-parser';

export type NodeHtmlParserHTMLElement = ReturnType<typeof parseHtml>;
