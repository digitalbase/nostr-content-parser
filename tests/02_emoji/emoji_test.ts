import { assertObjectMatch } from "jsr:@std/assert";

import { basename } from "https://deno.land/std/path/mod.ts";
import { parseMarkdown } from "../../src/parser.ts";
import { getFilenameWithoutExtension } from "../../src/utils/utils.ts";

Deno.test("emoji test", async () => {
  const testName = getFilenameWithoutExtension(import.meta.filename ?? "");
  const dirName = basename(import.meta.dirname ?? "");
  const markDown = await Deno.readTextFile(`./tests/${dirName}/${testName}.md`);
  const json = {
    type: "root",
    children: [
      {
        type: "paragraph",
        children: [
          { type: "text", value: "This is " },
          { type: "text", value: "🌚" },
        ],
        position: {
          start: { line: 1, column: 1, offset: 0 },
          end: { line: 1, column: 29, offset: 28 },
        },
      },
    ],
    position: {
      start: { line: 1, column: 1, offset: 0 },
      end: { line: 1, column: 29, offset: 28 },
    },
  };

  const parsedMarkdown = parseMarkdown(markDown);

  assertObjectMatch(parsedMarkdown, json);
});
