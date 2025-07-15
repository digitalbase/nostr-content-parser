import {unified} from 'https://esm.sh/unified@11'
import remarkParse from 'https://esm.sh/remark-parse@11'
import { Root } from "https://esm.sh/@types/mdast@4.0.4/index.js";

export async function parseMarkdown(markdown: string) {
    const file = unified()
        .use(remarkParse)
        // .use(remarkGfm)
        // .use(remarkRehype)
        // .use(rehypeStringify)
        .runSync(markdown as Root);

    console.log(file);

    return file;
}
