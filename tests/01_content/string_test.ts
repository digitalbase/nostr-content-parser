import { assertObjectMatch } from "jsr:@std/assert";

import { basename } from "https://deno.land/std/path/mod.ts";
import {parseMarkdown} from "../../src/parser.ts";
import {getFilenameWithoutExtension} from "../utils.ts";

Deno.test("content test", async () => {
  const testName = getFilenameWithoutExtension(import.meta.filename ?? '');
  const dirName = basename(import.meta.dirname ?? '');
  const markDown = await Deno.readTextFile(`./tests/${dirName}/${testName}.md`);
  const json = {
        type: "root",
        children: [
          {
            type: "paragraph",
            children: [
              {
                type: "text",
                value: "I feel your frustration. Have been there. But that statement is not true and you know it.",
              }
            ],
            position: {
              start: { line: 1, column: 1, offset: 0 },
              end: { line: 1, column: 90, offset: 89 }
            }
          }
        ],
        position: {
          start: { line: 1, column: 1, offset: 0 },
          end: { line: 1, column: 90, offset: 89 }
        }
      }
  ;

  const parsedMarkdown = parseMarkdown(markDown);
  assertObjectMatch(parsedMarkdown, json);
});
