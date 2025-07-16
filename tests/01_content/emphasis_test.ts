import { assertObjectMatch } from "jsr:@std/assert";

import { basename } from "https://deno.land/std/path/mod.ts";
import { parseMarkdown } from "../../src/parser.ts";
import {getFilenameWithoutExtension} from "../../src/utils/getFilenameWithoutExtension.ts";

Deno.test("emphasis", async () => {
  const testName = getFilenameWithoutExtension(import.meta.filename ?? "");
  const dirName = basename(import.meta.dirname ?? "");
  const markDown = await Deno.readTextFile(`./tests/${dirName}/${testName}.md`);
  const json = {
        "type": "root",
        "children": [
          {
            "type": "paragraph",
            "children": [
              {
                "type": "text",
                "value": "I feel your frustration. "
              },
              {
                "type": "emphasis",
                "children": [
                  {
                    "type": "text",
                    "value": "Have been there"
                  }
                ]
              },
              {
                "type": "text",
                "value": ". But that statement is not true and you know it."
              }
            ]
          }
        ]
      }
  ;

  const parsedMarkdown = parseMarkdown(markDown);

  // console.log(parsedMarkdown);
  // console.log(JSON.stringify(parsedMarkdown, null, 2));

  assertObjectMatch(parsedMarkdown, json);
});
