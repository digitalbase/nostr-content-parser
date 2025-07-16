import { unified } from "https://esm.sh/unified@11";
import remarkParse from "https://esm.sh/remark-parse@11";
import remarkEmoji from "https://esm.sh/remark-emoji@5";
import remarkGfm from 'https://esm.sh/remark-gfm@4';
// import remarkImages from 'https://esm.sh/remark-images@4'
import { hashtags } from "./parsers/hashtag_plugin.ts";
import {removePositionProperties} from "./utils/removePositionProperties.ts";
import {imageLiterals} from "./parsers/image_literals_plugin.ts";
import linkTransformImagesPlugin from "./parsers/link_transform_images_plugin.ts";
// import {linkLiterals} from "./parsers/links_literals_plugin.ts";

export function parseMarkdown(markdown: string) {
  //https://github.com/remarkjs/remark/blob/main/doc/plugins.md#list-of-plugins
  const processor = unified()
    .use(remarkParse)
    // .use(remarkImages)
    .use(imageLiterals)
    .use(remarkGfm)
    .use(linkTransformImagesPlugin)
    //.use(linkLiterals)
    .use(hashtags)
    .use(remarkEmoji, { emoticon: true });
  // .use(remarkRehype)
  // .use(rehypeStringify);

  const ast = processor.parse(markdown);

  // Markdown into an AST + run transformer on the AST
  // https://github.com/unifiedjs/unified?tab=readme-ov-file#transformer
  const processed = processor.runSync(ast);

  // must be a better way to remove those position properties. Not get them in the first place by unified?
  return removePositionProperties(processed);
}
