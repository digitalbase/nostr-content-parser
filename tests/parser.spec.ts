import fs from 'fs';
import path from 'path';
import { parseMarkdown } from '../src/parser'; // Import your parser here

// File paths
const testsDir = path.join(__dirname);

describe('Markdown Parser Tests', () => {
    // Loop through all `.md` files dynamically
    const testFiles = fs.readdirSync(testsDir).filter(file => file.endsWith('.md'));

    testFiles.forEach(markdownFile => {
        const testName = markdownFile.replace('.md', ''); // Extract test name (e.g., test1)
        const markdownPath = path.join(testsDir, markdownFile);
        const jsonPath = path.join(testsDir, `${testName}.json`);

        it(`should parse ${markdownFile} correctly`, () => {
            // Read the markdown and JSON files
            const markdownContent = fs.readFileSync(markdownPath, 'utf-8');
            const expectedOutput = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));

            // Call your parser function (add mocks if necessary)
            const actualOutput = parseMarkdown(markdownContent);

            // Compare actual vs expected output
            expect(actualOutput).toEqual(expectedOutput);
        });
    });
});