import {unified} from 'https://esm.sh/unified@11'
import remarkParse from 'https://esm.sh/remark-parse@11'

export function parseMarkdown(markdown: string) {
    return unified()
        .use(remarkParse)
        // .use(remarkGfm)
        // .use(remarkRehype)
        // .use(rehypeStringify)
        .parse(markdown);
}
