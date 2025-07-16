import {unified} from 'https://esm.sh/unified@11'
import remarkParse from 'https://esm.sh/remark-parse@11'
import remarkEmoji from 'https://esm.sh/remark-emoji@5'

// import hashtags from "./parsers/hashtag_plugin.ts";

export function parseMarkdown(markdown: string) {

    //https://github.com/remarkjs/remark/blob/main/doc/plugins.md#list-of-plugins
    const processor = unified()
        .use(remarkParse)
        .use(remarkEmoji, { emoticon: true })
        // .use(hashtags)
        // .use(remarkGfm)
        // .use(remarkRehype)
        // .use(rehypeStringify);

    const ast = processor.parse(markdown);

    // Markdown into an AST + run transformer on the AST
    // https://github.com/unifiedjs/unified?tab=readme-ov-file#transformer
    return processor.runSync(ast);
}

