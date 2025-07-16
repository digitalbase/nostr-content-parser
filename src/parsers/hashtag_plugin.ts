import {
  type Find,
  findAndReplace,
  //type Replace,
} from "https://esm.sh/mdast-util-find-and-replace@3";
import { Transformer } from "https://esm.sh/unified@11";
import { Root } from "https://esm.sh/@types/mdast@4.0.4/index.js";
import { Hashtag } from "../types/nast.ts";

const REGEX_HASHTAG = /(?<=^|[^\p{L}#\/])#([\p{L}\p{N}\p{M}]+)(?=\p{Z}|$|\s)/gu;

export function hashtags(): Transformer<Root> {
  function hashtag(text: string): Hashtag {
    return {
      type: "hashtag",
      name: text.replace("#", ""),
      hashtag: text.toLowerCase(),
    } satisfies Hashtag;
  }

  function replaceHashtag(match: string): string | false | Hashtag {
    return hashtag(match);
  }

  // 2 was Replace. Not sure how to fix the type here
  // deno-lint-ignore no-explicit-any
  const replacers: [Find, any][] = [[REGEX_HASHTAG, replaceHashtag]];
  //
  function transformer(tree: Root): void {
    findAndReplace(tree, replacers);
  }

  return transformer;
}
