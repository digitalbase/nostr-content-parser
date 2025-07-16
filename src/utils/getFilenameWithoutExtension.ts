import { basename, extname } from "https://deno.land/std/path/mod.ts";
export function getFilenameWithoutExtension(filename: string): string {
  // Get the basename of the file (e.g., "01_content_test.ts")
  const baseName = basename(filename);

  // Remove the extension from the basename (e.g., "01_content_test")
  const withoutExtension = baseName.replace(extname(baseName), "");

  // Remove the "_test" suffix (if it exists)
  return withoutExtension.replace(/_test$/, "");
}
