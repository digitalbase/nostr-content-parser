import { build, emptyDir } from "@deno/dnt";

await emptyDir("./npm");

await build({
    test: false,
    typeCheck: false,
    entryPoints: ["./src/parser.ts"],
    outDir: "./npm",
    shims: {
        // see JS docs for overview and more options
        deno: true,
    },
    package: {
        // package.json properties
        name: "nostr-content-parser",
        version: Deno.args[0],
        description: "Your package.",
        license: "MIT",
        repository: {
            type: "git",
            url: "git+https://github.com/digitalbase/nostr-content-parser.git",
        },
        bugs: {
            url: "https://github.com/digitalbase/nostr-content-parser/issues",
        },
    },
    postBuild() {
        // steps to run after building and before running the tests
        Deno.copyFileSync("LICENSE", "npm/LICENSE");
        Deno.copyFileSync("README.md", "npm/README.md");
    },
});