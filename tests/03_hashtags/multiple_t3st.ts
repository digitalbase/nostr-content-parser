import { assertObjectMatch } from "jsr:@std/assert";

import { basename } from "https://deno.land/std/path/mod.ts";
import {parseMarkdown} from "../../src/parser.ts";
import {getFilenameWithoutExtension} from "../utils.ts";

Deno.test("content endline test", async () => {
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
                          value: "Nauseating levels of Saylor-imitating Bitcoin treasury companies at this point.",
                      }
                  ],
                  position: {
                      start: { line: 1, column: 1, offset: 0 },
                      end: { line: 1, column: 81, offset: 80 }
                  }
              },
              {
                  type: "paragraph",
                  children: [
                      {
                          type: "text",
                          value: "They may do well in the bull market… but there will be extreme wreckage during the subsequent bear market.",
                      }
                  ],
                  position: {
                      start: { line: 3, column: 1, offset: 82 },
                      end: { line: 3, column: 108, offset: 189 }
                  }
              },
              {
                  type: "paragraph",
                  children: [
                      {
                          type: "text",
                          value: "Regular folks should simply stack sats and chill while the chaos unfolds. 🍿",
                      }
                  ],
                  position: {
                      start: { line: 5, column: 1, offset: 191 },
                      end: { line: 5, column: 77, offset: 267 }
                  }
              }
          ],
          position: {
              start: { line: 1, column: 1, offset: 0 },
              end: { line: 5, column: 77, offset: 267 }
          }
      }
  ;

  const parsedMarkdown = parseMarkdown(markDown);

  console.log(markDown);

  // assertObjectMatch(parsedMarkdown, json);
});
