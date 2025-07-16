import { assertObjectMatch } from "jsr:@std/assert";

import { basename } from "https://deno.land/std/path/mod.ts";
import { parseMarkdown } from "../../src/parser.ts";
import {getFilenameWithoutExtension} from "../../src/utils/getFilenameWithoutExtension.ts";

Deno.test("literal image", async () => {
  const testName = getFilenameWithoutExtension(import.meta.filename ?? "");
  const dirName = basename(import.meta.dirname ?? "");
  const markDown = await Deno.readTextFile(`./tests/${dirName}/${testName}.md`);
  const json = {
        type: "root",
        children: [
          {
            type: "paragraph",
            children: [ { type: "text", value: "This is the Prezly logo" } ]
          },
          {
            type: "paragraph",
            children: [
              {
                type: "image",
                title: null,
                url: "https://www.prezly.com/apple-touch-icon.png",
              }
            ]
          }
        ]
      }
  ;

  const parsedMarkdown = parseMarkdown(markDown);

  assertObjectMatch(parsedMarkdown, json);
});
