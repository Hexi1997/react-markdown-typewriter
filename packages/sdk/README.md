# React Markdown Typewriter

This library provides a new component, `MarkdownTypewriter`, that combines the Markdown component of [react-markdown](https://www.npmjs.com/package/react-markdown) with the animation of typewriter. The animation was created entirely with [motion](https://www.npmjs.com/package/motion).

Live demo: <https://codesandbox.io/p/sandbox/react-markdown-typewriter-rgjf6t>

## Why?

This library was born during the development of my game engine [pixi-vn](https://www.npmjs.com/package/@drincs/pixi-vn). I needed a component that would display the current dialogue of a character with the "Typewriter" effect and I also wanted to give the developer the possibility to use Markdown to add style to the text.

For this reason I created this component that I later decided to make available on npm.

## Install

This package is ESM only. In Node.js (version 12.20+, 14.14+, or 16.0+), install with npm:

```bash
npm install react-markdown react-markdown-typewriter
```

## Use

The component accepts all the props of the `react-markdown` component and adds some additional props to manage the typewriter effect.

This is a very simple example of how to use the component:

```tsx
import MarkdownTypewriter from "../components/Typewriter";

export default function NarrationScreen() {
    return (
        <div>
            <MarkdownTypewriter>Hello World</MarkdownTypewriter>
        </div>
    );
}
```

This is a more complex example:

```tsx
import { useRef } from "react";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import MarkdownTypewriter from "../components/Typewriter";

export default function NarrationScreen() {
    const paragraphRef = useRef<HTMLDivElement>(null);
    const scrollToEnd = useCallback((ref: { current: HTMLSpanElement | null }) => {
        if (paragraphRef.current && ref.current) {
            let scrollTop = ref.current.offsetTop - paragraphRef.current.clientHeight / 2;
            paragraphRef.current.scrollTo({
                top: scrollTop,
                behavior: "auto",
            });
        }
    }, []);
    return (
        <div ref={paragraphRef}>
            <MarkdownTypewriter
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeRaw]}
                delay={20}
                motionProps={{
                    onAnimationComplete: () => {
                        console.log("Typewriter finished");
                    },
                    characterVariants: {
                        hidden: { opacity: 0 },
                        visible: { opacity: 1, transition: { opacity: { duration: 0 } } },
                    },
                    onCharacterAnimationComplete: scrollToEnd,
                }}
            >
                Hello World
            </MarkdownTypewriter>
        </div>
    );
}
```

## API

### props

In addition to the `react-markdown` component props, the component accepts the following props:

* `delay`: The delay in milliseconds between the appearance of one letter and the next. Default: `10`. (Optional)
* `motionProps` (Optional):
  * The props to pass to the [motion span](https://motion.dev/docs/react-motion-component).
  * `characterVariants`: The motion variants for each individual letter. Default: `{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { opacity: { duration: 0 } } } }` (Optional).
  * `onCharacterAnimationComplete`: A callback that is called when the animation of a letter is complete. The callback is called with the reference to the letter. (Optional)
