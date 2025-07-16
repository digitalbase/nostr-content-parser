import { assertObjectMatch } from "jsr:@std/assert";

import { basename } from "https://deno.land/std/path/mod.ts";
import { parseMarkdown } from "../../src/parser.ts";
import {getFilenameWithoutExtension} from "../../src/utils/getFilenameWithoutExtension.ts";

Deno.test("content brackets test", async () => {
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
                          value: "I like\nLenovo or Hp mini PCs (ebay $25) Bare with power adapter"
                      }
                  ]
              },
              {
                  type: "paragraph",
                  children: [ { type: "text", value: "7500T cpu (ebay $30)" } ]
              },
              {
                  type: "paragraph",
                  children: [
                      {
                          type: "text",
                          value: "16GB ddr4 dual channel 2x8gb ram (new $25)"
                      }
                  ]
              },
              {
                  type: "paragraph",
                  children: [ { type: "text", value: "2TB Sata SSD (new $80-$100)" } ]
              },
              {
                  type: "paragraph",
                  children: [
                      {
                          type: "text",
                          value: "Total $160-$180\n" +
                              "Powerful x86 with huge RAM and 2TB storage enough for another decade of full archival."
                      }
                  ]
              }
          ]
      }
  ;

  const parsedMarkdown = parseMarkdown(markDown);

  assertObjectMatch(parsedMarkdown, json);
});
