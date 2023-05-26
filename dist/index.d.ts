import { marked } from 'marked';

declare type Config = {
    nodeName: string;
    className: string;
    title: {
        nodeName: string;
    };
};
declare const admonitionTypes: string[];
declare const setConfig: (data: Config) => void;

declare const _default: marked.MarkedExtension;

export { admonitionTypes, _default as default, setConfig };
