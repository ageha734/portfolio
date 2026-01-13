import { Wysiwyg } from "./Wysiwyg";
import "~/tailwind.css";

export default {
    title: "components/Wysiwyg",
    component: Wysiwyg,
};

export const Default = () => <Wysiwyg content="<p>This is a simple paragraph.</p>" />;

export const WithHeading = () => <Wysiwyg content="<h1>Heading 1</h1><p>This is a paragraph with a heading.</p>" />;

export const WithCode = () => (
    <Wysiwyg content='<pre class="line-numbers language-js"><code>const hello = "world";</code></pre>' />
);

export const ComplexContent = () => (
    <Wysiwyg
        content={`
            <h1>Title</h1>
            <p>This is a paragraph with <strong>bold</strong> and <em>italic</em> text.</p>
            <ul>
                <li>Item 1</li>
                <li>Item 2</li>
                <li>Item 3</li>
            </ul>
        `}
    />
);
