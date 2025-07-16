import {
  type Find,
  findAndReplace,
  //type Replace,
} from "https://esm.sh/mdast-util-find-and-replace@3";
import { Transformer } from "https://esm.sh/unified@11";
import { Root } from "https://esm.sh/@types/mdast@4.0.4/index.js";
import {Image} from "../types/nast.ts";

// const IMAGE_REGEX = /https?:\/\/([a-zA-Z0-9\.\-]+\.[a-zA-Z]+(?::\d+)?)([\/\?#][\p{L}\p{N}\p{M}&\.-\/\?=#\-@%\+_,:!~*]*)?/gu;
const IMAGE_REGEX = /(https?:\/\/(?:[a-zA-Z0-9\-_]+\.)+[a-zA-Z]{2,}(?:\/[^\s]*)?\.(?:jpg|jpeg|png|gif|webp)(?:[?#][^\s]*)?)/gu;

export function imageLiterals(): Transformer<Root> {
  function image(text: string): Image {

    return {
      type: "image",
      title: null,
      url: text,
    } satisfies Image;
  }

  function replaceImage(match: string): string | false | Image {
    return image(match);
  }

  // 2 was Replace. Not sure how to fix the type here
  // deno-lint-ignore no-explicit-any
  const replacers: [Find, any][] = [[IMAGE_REGEX, replaceImage]];
  //
  function transformer(tree: Root): void {
    findAndReplace(tree, replacers);
  }

  return transformer;
}
