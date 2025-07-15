import { assert, assertObjectMatch } from "jsr:@std/assert";

import { basename, extname } from "https://deno.land/std/path/mod.ts";
import {parseMarkdown} from "../../src/parser.ts";



function getFilenameWithoutExtension(): string | undefined {
  if (!import.meta.filename || !import.meta.dirname) {
    return;
  }

  // Get the basename of the file (e.g., "01_content_test.ts")
  const baseName = basename(import.meta.filename);
  const dirName = basename(import.meta.dirname);

  // Remove the extension from the basename (e.g., "01_content_test")
  const withoutExtension = baseName.replace(extname(baseName), "");

  // Remove the "_test" suffix (if it exists)
  return withoutExtension.replace(/_test$/, "");
}

Deno.test("content test", async () => {
  const testName = getFilenameWithoutExtension();
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
  console.log(parsedMarkdown);

  assertObjectMatch(parsedMarkdown, json);


  console.log(json);
});
