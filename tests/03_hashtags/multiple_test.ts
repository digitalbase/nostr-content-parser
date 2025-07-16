import { assertObjectMatch } from "jsr:@std/assert";

import { basename } from "https://deno.land/std/path/mod.ts";
import { parseMarkdown } from "../../src/parser.ts";
import { getFilenameWithoutExtension } from "../../src/utils/utils.ts";

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
            value: "Anyone making chili today? What’s your secret ingredient? ",
          },
          { type: "hashtag", name: "foodstr", hashtag: "#foodstr" },
          { type: "text", value: " " },
          { type: "hashtag", name: "asknostr", hashtag: "#asknostr" },
        ],
        position: {
          start: { line: 1, column: 1, offset: 0 },
          end: { line: 1, column: 77, offset: 76 },
        },
      },
    ],
    position: {
      start: { line: 1, column: 1, offset: 0 },
      end: { line: 2, column: 1, offset: 77 },
    },
  };

  const parsedMarkdown = parseMarkdown(markDown);

  assertObjectMatch(parsedMarkdown, json);
});
