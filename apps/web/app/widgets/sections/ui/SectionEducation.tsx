export const SectionEducation = () => {
    return (
        <section>
            <div>
                <h2 className="py-8 text-lg md:text-xl print:py-4">Education</h2>
                <div className="mb-8 border-color-border border-t border-solid print:hidden" />
            </div>

            <h3>San Francisco State University</h3>
            <h4 className="font-normal">
                Industrial Design <em className="text-color-copy-light text-sm">(incomplete)</em>
            </h4>

            <div className="mt-8">
                <p className="text-sm">
                    A late change of major from <b>Mechanical Engineering</b> to <b>Industrial Design</b> and the lack
                    of available courses I freelanced and went part-time over the course of several years doing
                    graphic/web design, and web development.
                </p>
            </div>

            <ul className="my-4 ml-4 list-disc font-light text-sm">
                <li className="my-1">Industrial Designers Society of America 2004 - 2007</li>
                <li className="my-1">Teaching Assistant: Automated Manufacturing Sys.</li>
                <li className="my-1">Teaching Assistant: Metals Manufacturing</li>
                <li className="my-1">Teaching Assistant: Drafting &amp; Sketching for Design</li>
            </ul>
        </section>
    );
};
