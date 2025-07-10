import { unified } from 'unified';
import remarkParse from 'remark-parse';

export function parseMarkdown(markdown: string): any {
    const processor = unified().use(remarkParse);
    const tree = processor.parse(markdown);
    return tree;
}