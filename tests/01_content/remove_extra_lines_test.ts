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
                          value: "Idk too much about this but I did do a quick deep dive before getting into it, I’m on like day 4 of downloading btc core."
                      }
                  ]
              },
              {
                  type: "paragraph",
                  children: [
                      {
                          type: "text",
                          value: "I’m using an old MacBook that I had laying around with a 2Tb ssd. I wanted to keep costs down and when the things fried I’ll just chuck it and get something else."
                      }
                  ]
              },
              {
                  type: "paragraph",
                  children: [
                      {
                          type: "text",
                          value: "I saw a lot of recommendations for using mini pcs, and that’s exactly what I’ll do once my laptop dies. You can get them for cheap used, newer models have better power efficiency and way more computational power for. You’ll always have a back up PC too if worst comes to worst."
                      }
                  ]
              },
              {
                  type: "paragraph",
                  children: [
                      {
                          type: "text",
                          value: "Dell OptiPlex seems to be the most popular"
                      }
                  ]
              }
          ]
      }
  ;

  const parsedMarkdown = parseMarkdown(markDown);

  assertObjectMatch(parsedMarkdown, json);
});
