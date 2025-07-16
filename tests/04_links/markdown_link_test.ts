import { assertObjectMatch } from "jsr:@std/assert";

import { basename } from "https://deno.land/std/path/mod.ts";
import { parseMarkdown } from "../../src/parser.ts";
import {getFilenameWithoutExtension} from "../../src/utils/getFilenameWithoutExtension.ts";

Deno.test("clean up the display url", async () => {
  const testName = getFilenameWithoutExtension(import.meta.filename ?? "");
  const dirName = basename(import.meta.dirname ?? "");
  const markDown = await Deno.readTextFile(`./tests/${dirName}/${testName}.md`);
  const json = {
        type: "root",
        children: [
          {
            type: "paragraph",
            children: [
              { type: "text", value: "Here is " },
              {
                type: "link",
                title: null,
                url: "https://bitcoin.org",
              }
            ]
          }
        ]
      }
  ;

  const parsedMarkdown = parseMarkdown(markDown);

  assertObjectMatch(parsedMarkdown, json);
});
