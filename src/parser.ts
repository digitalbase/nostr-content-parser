import { unified } from "https://esm.sh/unified@11";
import remarkParse from "https://esm.sh/remark-parse@11";
import remarkEmoji from "https://esm.sh/remark-emoji@5";
import { hashtags } from "./parsers/hashtag_plugin.ts";
import { links } from "./parsers/links_plugin.ts";
import {removePositionProperties} from "./utils/removePositionProperties.ts";


export function parseMarkdown(markdown: string) {
  //https://github.com/remarkjs/remark/blob/main/doc/plugins.md#list-of-plugins
  const processor = unified()
    .use(remarkParse)
    .use(links)
    .use(hashtags)
    .use(remarkEmoji, { emoticon: true });
  // .use(remarkGfm)
  // .use(remarkRehype)
  // .use(rehypeStringify);

  const ast = processor.parse(markdown);

  // Markdown into an AST + run transformer on the AST
  // https://github.com/unifiedjs/unified?tab=readme-ov-file#transformer
  const processed = processor.runSync(ast);

  // must be a better way to remove those position properties. Not get them in the first place by unified?
  return removePositionProperties(processed);
}
