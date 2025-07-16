import {
  type Find,
  findAndReplace,
  //type Replace,
} from "https://esm.sh/mdast-util-find-and-replace@3";
import { Transformer } from "https://esm.sh/unified@11";
import { Root } from "https://esm.sh/@types/mdast@4.0.4/index.js";
import {Link} from "../types/nast.ts";

const LINK_HASHTAG = /https?:\/\/([a-zA-Z0-9\.\-]+\.[a-zA-Z]+(?::\d+)?)([\/\?#][\p{L}\p{N}\p{M}&\.-\/\?=#\-@%\+_,:!~*]*)?/gu;

function cleanUpValue(url: string): string {
  // Step 1: Remove the protocol (http:// or https://)
  let cleanedUrl = url.replace(/^https?:\/\//, "");

  // Step 2: Remove "www." if it exists at the start
  cleanedUrl = cleanedUrl.replace(/^www\./, "");

  // Step 3: Remove trailing slash if it exists
  cleanedUrl = cleanedUrl.replace(/\/$/, "");

  return cleanedUrl;
}

export function links(): Transformer<Root> {
  function link(text: string): Link {

    const display_value = cleanUpValue(text);

    return {
      type: "link",
      display_value,
      title: null,
      url: text,
    } satisfies Link;
  }

  function replaceLink(match: string): string | false | Link {
    return link(match);
  }

  // 2 was Replace. Not sure how to fix the type here
  // deno-lint-ignore no-explicit-any
  const replacers: [Find, any][] = [[LINK_HASHTAG, replaceLink]];
  //
  function transformer(tree: Root): void {
    findAndReplace(tree, replacers);
  }

  return transformer;
}
