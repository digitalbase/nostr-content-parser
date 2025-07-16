import { assertObjectMatch } from "jsr:@std/assert";

import { basename } from "https://deno.land/std/path/mod.ts";
import { parseMarkdown } from "../../src/parser.ts";
import {getFilenameWithoutExtension} from "../../src/utils/getFilenameWithoutExtension.ts";

Deno.test("content endline test", async () => {
  const testName = getFilenameWithoutExtension(import.meta.filename ?? "");
  const dirName = basename(import.meta.dirname ?? "");
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
              },
              {
                  type: "paragraph",
                  children: [
                      {
                          type: "text",
                          value: "They may do well in the bull market… but there will be extreme wreckage during the subsequent bear market.",
                      }
                  ],
              },
              {
                  type: "paragraph",
                  children: [
                      {
                          type: "text",
                          value: "Regular folks should simply stack sats and chill while the chaos unfolds. 🍿",
                      }
                  ],
              }
          ],
      }
  ;

  const parsedMarkdown = parseMarkdown(markDown);

  assertObjectMatch(parsedMarkdown, json);
});
