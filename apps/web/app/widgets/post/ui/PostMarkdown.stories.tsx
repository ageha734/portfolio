import { MemoryRouter } from "react-router-dom";
import { PostMarkdown } from "./PostMarkdown";
import "~/tailwind.css";

const H1 = PostMarkdown.h1;
const H2 = PostMarkdown.h2;
const H3 = PostMarkdown.h3;
const H4 = PostMarkdown.h4;
const P = PostMarkdown.p;
const A = PostMarkdown.a;
const Ul = PostMarkdown.ul;
const Ol = PostMarkdown.ol;
const Li = PostMarkdown.li;
const Code = PostMarkdown.code;
const Pre = PostMarkdown.pre;
const BlockquoteComponent = PostMarkdown.blockquote;
const Hr = PostMarkdown.hr;
const Strong = PostMarkdown.strong;
const Img = PostMarkdown.img;
const Embed = PostMarkdown.Embed;

export default {
    title: "widgets/post/PostMarkdown",
};

export const Heading1 = () => (
    <MemoryRouter>
        <H1 id="heading-1">Heading 1</H1>
    </MemoryRouter>
);

export const Heading2 = () => (
    <MemoryRouter>
        <H2 id="heading-2">Heading 2</H2>
    </MemoryRouter>
);

export const Heading3 = () => (
    <MemoryRouter>
        <H3 id="heading-3">Heading 3</H3>
    </MemoryRouter>
);

export const Heading4 = () => (
    <MemoryRouter>
        <H4 id="heading-4">Heading 4</H4>
    </MemoryRouter>
);

export const Paragraph = () => (
    <MemoryRouter>
        <P>This is a paragraph with some text content. It demonstrates the paragraph styling used in blog posts.</P>
    </MemoryRouter>
);

export const Link = () => (
    <MemoryRouter>
        <A href="/blog">Link to Blog</A>
    </MemoryRouter>
);

export const UnorderedList = () => (
    <MemoryRouter>
        <Ul>
            <Li>First item</Li>
            <Li>Second item</Li>
            <Li>Third item</Li>
        </Ul>
    </MemoryRouter>
);

export const OrderedList = () => (
    <MemoryRouter>
        <Ol>
            <Li>First item</Li>
            <Li>Second item</Li>
            <Li>Third item</Li>
        </Ol>
    </MemoryRouter>
);

export const InlineCode = () => (
    <MemoryRouter>
        <P>
            This is a paragraph with <Code>inline code</Code> in it.
        </P>
    </MemoryRouter>
);

export const CodeBlock = () => (
    <MemoryRouter>
        <Pre>
            <Code>{`function example() {
  return "Hello, World!";
}`}</Code>
        </Pre>
    </MemoryRouter>
);

export const Blockquote = () => (
    <MemoryRouter>
        <BlockquoteComponent>
            This is a blockquote. It can contain multiple paragraphs and other content.
        </BlockquoteComponent>
    </MemoryRouter>
);

export const HorizontalRule = () => (
    <MemoryRouter>
        <div>
            <p>Content above the horizontal rule.</p>
            <Hr />
            <p>Content below the horizontal rule.</p>
        </div>
    </MemoryRouter>
);

export const StrongText = () => (
    <MemoryRouter>
        <P>
            This is a paragraph with <Strong>strong text</Strong> in it.
        </P>
    </MemoryRouter>
);

export const Image = () => (
    <MemoryRouter>
        <Img src="/images/assets/sample.jpg" alt="Sample image" width={800} height={600} />
    </MemoryRouter>
);

export const EmbedExample = () => (
    <MemoryRouter>
        <Embed src="https://www.youtube.com/embed/dQw4w9WgXcQ" />
    </MemoryRouter>
);

export const FullExample = () => (
    <MemoryRouter>
        <div className="mx-auto max-w-3xl p-4">
            <H1 id="full-example">Full Example</H1>
            <P>This is a complete example showing all markdown elements together.</P>
            <H2 id="section-1">Section 1</H2>
            <P>
                This paragraph contains a <A href="/blog">link</A> and some <Code>inline code</Code>.
            </P>
            <Ul>
                <Li>First bullet point</Li>
                <Li>Second bullet point</Li>
            </Ul>
            <BlockquoteComponent>This is a blockquote with important information.</BlockquoteComponent>
            <Hr />
            <P>
                More content after the horizontal rule with <Strong>strong text</Strong>.
            </P>
        </div>
    </MemoryRouter>
);
