import {findAndReplace, type Find, type Replace} from 'https://esm.sh/mdast-util-find-and-replace@3'
import { Plugin } from "https://esm.sh/unified@11.0.5/index.d.ts";
import { Root, Nodes, Text } from "https://esm.sh/@types/mdast@4.0.4/index.js";

//const REGEX_HASHTAG = /(?<=^|[^\p{L}#\/])#([\p{L}\p{N}\p{M}]+)(?=\p{Z}|$|\s)/gu;
const REGEX_HASHTAG = /:\+1:|:-1:|:[\w-]+:/g;
const RE_PUNCT = /(?:_|-(?!1))/g;

/**
 * Configuration of remark-emoji plugin.
 */
export interface RemarkHashtagOptions {
    /**
     * Makes converted emoji and emoticon texts accessible by wrapping them with
     * `span` element setting `role` and `aria-label` attributes.
     *
     * @defaultValue false
     */
    accessible?: boolean;
    /**
     * Adds an extra whitespace after emoji.
     * Useful when browser handle emojis with half character length and
     * the following character is hidden.
     *
     * @defaultValue false
     */
    padSpaceAfter?: boolean;
}

const DEFAULT_SETTINGS: RemarkHashtagOptions = {
    padSpaceAfter: false,
    accessible: false,
};

const plugin: Plugin<[(RemarkHashtagOptions | null | undefined)?], Root> = options => {
    const settings = Object.assign({}, DEFAULT_SETTINGS, options);
    const pad = !!settings.padSpaceAfter;
    const accessible = !!settings.accessible;

    function aria(text: string, label: string): Text {
        // Creating HTML node in Markdown node is undocumented.
        // https://github.com/syntax-tree/mdast-util-math/blob/e70bb824dc70f5423324b31b0b68581cf6698fe8/index.js#L44-L55
        return {
            type: 'text',
            value: text,
            data: {
                hName: 'span',
                hProperties: {
                    role: 'img',
                    ariaLabel: label,
                },
                hChildren: [{ type: 'text', value: text }],
            },
        };
    }

    function getEmoji(bla: string) {
        console.log('found one');
        return bla;
    }

    function replaceHashtag(match: string): string | false | Text {
        console.log(match);

        let got = getEmoji(match);

        if (typeof got === 'undefined') {
            return false;
        }

        if (pad) {
            got = got + ' ';
        }

        if (accessible) {
            const label = match.slice(1, -1).replace(RE_PUNCT, ' ') + ' emoji';
            return aria(got, label);
        }

        return got;
    }

    const replacers: [Find, Replace][] = [[REGEX_HASHTAG, replaceHashtag]];

    function transformer(tree: Nodes): void {
        findAndReplace(tree, replacers);
    }

    return transformer;
};

export default plugin;