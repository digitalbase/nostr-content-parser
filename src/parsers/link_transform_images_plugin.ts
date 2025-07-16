import { Transformer } from "https://esm.sh/unified@11";
import { Root } from "https://esm.sh/@types/mdast@4.0.4/index.js";
import { visitParents } from "https://esm.sh/unist-util-visit-parents@6.0.1/index.js";
import {Image} from "../types/nast.ts";


/**
 * Add a simpler image syntax.
 *
 * @param {Readonly<Options> | null | undefined} [options]
 *   Configuration (optional).
 * @returns
 *   Transform.
 */
export default function linkTransformImagesPlugin(): Transformer<Root> {
    const imageExtensionRegex = new RegExp(`\\.(${defaultImageExtensions.join('|')})$`)

    /**
     * Transform.
     *
     * @param {Root} tree
     *   Tree.
     * @returns {undefined}
     *   Nothing.
     */
    return function (tree) {
        // deno-lint-ignore no-explicit-any
        visitParents(tree, 'link', function (node: any, parents: any) {
            const url = node.url;

            if (
                imageExtensionRegex.test(url)
            ) {
                // let interactive = false

                /** @type {Image | Link} */
                let replacement = {
                    type: 'image',
                    url: url,
                    title: null,
                    alt: '',
                } satisfies Image;

                // Add a link if we’re not already in one.
                // if (!interactive) {
                //     replacement = {
                //         type: 'link',
                //         url: url,
                //         alt: '',
                //         title: null,
                //         //children: [replacement],
                //         // position: position(node)
                //     }
                // }

                const parent = parents[parents.length - 1]
                /** @type {Array<RootContent>} */
                const siblings = parent.children
                siblings[siblings.indexOf(node)] = replacement
            }
        })
    }
}

/**
 * Extensions recognized as images by default.
 *
 * @type {ReadonlyArray<string>}
 */
export const defaultImageExtensions = [
    'avif',
    'gif',
    'jpeg',
    'jpg',
    'png',
    'svg',
    'webp'
]