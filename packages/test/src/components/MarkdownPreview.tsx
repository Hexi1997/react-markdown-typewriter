import { useEffect, useRef, useState } from "react";

import "highlight.js/styles/github-dark.css"; // 选择一个高亮样式
import Markdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";

export function MarkdownPreview() {
    const [index, setIndex] = useState(0);
    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((index) => index + 1);
        }, 20);
        return () => {
            clearInterval(interval);
        };
    }, []);
    const paragraphRef = useRef<HTMLDivElement>(null);

    return (
        <div
            ref={paragraphRef}
            style={{
                overflow: "auto",
                height: "100vh",
                width: "100vw",
                position: "fixed",
                top: `0`,
            }}
        >
            <Markdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw, rehypeHighlight]}>
                {text.slice(0, index)}
            </Markdown>
        </div>
    );
}

const text = `

# Markdown Test

Hello, this is a test of the markdown parser. Pixi'VN does not manage markdown, but you can implement a markdown parser to display text with markdown syntax.

For example in React, you can use the library [react-markdown](https://www.npmjs.com/package/react-markdown).

~~~typescript
import { useCallback, useRef } from "react";
import { MarkdownTypewriter } from "react-markdown-typewriter";
import rehypeHighlight from "rehype-highlight";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
const a = 1;
~~~

## Colored Text

<span style="color:blue">some *blue* text</span>.

<span style="color:red">some *red* text</span>.

<span style="color:green">some *green* text</span>.

## Bold Text

**This is bold text.**

## Italic Text

*This is italic text.*

## Delete Text

~~This is deleted text.~~

## Link Test

[Link to Google](https://www.google.com)

## H2 Test

### H3 Test

#### H4 Test

## Code Test

\`Hello World\`

\`\`\`js
console.log("Hello World")
\`\`\`

## List Test

- Item 1

- Item 2

- [x] Item 3

## Table Test

| Header 1 | Header 2 |
| -------- | -------- |
| Cell 1   | Cell 2   |

## Separator Test

***
Footer
`;
