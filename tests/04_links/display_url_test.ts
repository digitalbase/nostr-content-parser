import { assertObjectMatch } from "jsr:@std/assert";

import { basename } from "https://deno.land/std/path/mod.ts";
import { parseMarkdown } from "../../src/parser.ts";
import {getFilenameWithoutExtension} from "../../src/utils/getFilenameWithoutExtension.ts";

Deno.test("clean up the display url", async () => {
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
            value: "I’ve used this recipe and added two teaspoons of smoked paprika."
          }
        ]
      },
      {
        type: "paragraph",
        children: [
          {
            type: "link",
            display_value: 'thepioneerwoman.com/food-cooking/recipes/a38665019/instant-pot-chili-recipe',
            value: "https://www.thepioneerwoman.com/food-cooking/recipes/a38665019/instant-pot-chili-recipe/",
            href: "https://www.thepioneerwoman.com/food-cooking/recipes/a38665019/instant-pot-chili-recipe/"
          }
        ]
      },
      {
        type: "paragraph",
        children: [ { type: "text", value: "The smoked paprika makes it." } ]
      }
    ]
  };

  const parsedMarkdown = parseMarkdown(markDown);

  assertObjectMatch(parsedMarkdown, json);
});
