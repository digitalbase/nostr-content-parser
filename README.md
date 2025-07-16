# Nostr Content Parser

Package to turn nostr Markdown into an [Abstract Syntax Tree](https://github.com/buxlabs/abstract-syntax-tree). 

https://astexplorer.net/

## Why?

Every Nostr client handles content parsing differently. 
Almost every Nostr client I tested has bugs when it comes to parsing markdown.

I created this library to scratch my own itch for [asknostr.site](https://asknostr.site).

## Supported

- [x] [Paragraphs](https://www.markdownguide.org/basic-syntax/#paragraphs-1)
- [ ] Formatting
  - [x] [Emphasis](https://www.markdownguide.org/basic-syntax/#emphasis)
  - [ ] Formatting: Italic
  - [ ] Bold
- [ ] [Headings](https://www.markdownguide.org/basic-syntax/#headings)
- [ ] [Line Breaks](https://www.markdownguide.org/basic-syntax/#line-break-best-practices)
- [ ] [BlockQuotes](https://www.markdownguide.org/basic-syntax/#blockquotes-1)
- [ ] [Lists](https://www.markdownguide.org/basic-syntax/#lists-1)
- [ ] [Code](https://www.markdownguide.org/basic-syntax/#code)
- [ ] [Horizontal Rules](https://www.markdownguide.org/basic-syntax/#horizontal-rules)
- [x] [Links](https://www.markdownguide.org/basic-syntax/#links)
  - [x] Markdown Links
  - [x] Literal Links
- [x] [Images](https://www.markdownguide.org/basic-syntax/#images-1)
    - [x] Markdown Images
    - [x] Literal Images
- [x] Hashtags
- [ ] Video/Youtube
- [ ] Nostr Entities

## Opinionated Behavior

- [x] Strip endlines from top/bottom of markdown
-

## Example


### Markdown

```markdown
Anyone making chili today? What’s your secret ingredient? #foodstr #asknostr
```

### Abstract Syntax Tree

```json
{
    type: "root",
    children: [
      {
        type: "paragraph",
        children: [
          {
            type: "text",
            value: "Anyone making chili today? What’s your secret ingredient? ",
          },
          { type: "hashtag", name: "foodstr", hashtag: "#foodstr" },
          { type: "text", value: " " },
          { type: "hashtag", name: "asknostr", hashtag: "#asknostr" },
        ],
      },
    ],
  }
```