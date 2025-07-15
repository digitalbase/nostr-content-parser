import { assertEquals } from "jsr:@std/assert";

import { basename, extname } from "https://deno.land/std/path/mod.ts";
import {parseMarkdown} from "../src/parser.ts";

function getFilenameWithoutExtension(): string | undefined {
  if (!import.meta.filename) {
    return;
  }

  // Get the basename of the file (e.g., "01_content_test.ts")
  const baseName = basename(import.meta.filename);

  // Remove the extension from the basename (e.g., "01_content_test")
  const withoutExtension = baseName.replace(extname(baseName), "");

  // Remove the "_test" suffix (if it exists)
  return withoutExtension.replace(/_test$/, "");
}

Deno.test("content test", async () => {
  const testName = getFilenameWithoutExtension();
  const markDown = await Deno.readTextFile(`./tests/${testName}.md`);
  const jsonRaw = await Deno.readTextFile(`./tests/${testName}.json`);
  const json = JSON.parse(jsonRaw);

  const parsedMarkdown = parseMarkdown(markDown);
  assertEquals(
    parsedMarkdown,
    json,
  )

  console.log(testName);
  console.log(markDown);
  console.log(json);
});
