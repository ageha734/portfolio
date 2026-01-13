import { Link } from "@remix-run/react";
import type { PortfolioPreviewProps } from "../model/types";

/**
 * @name PortfolioPreview
 * @description Unfortunately I don't have a ton of great imagery to work with
 * for all of these past projects so I need to try and focus on the content 🤔
 */
export const PortfolioPreview = (props: PortfolioPreviewProps) => {
    const { current = false, data } = props;

    const date = new Date(data.date);

    const _renderImage = () => (
        <div className="w-full">
            <img
                alt=""
                className="w-full border transition-all hover:rotate-3 hover:scale-110"
                height="auto"
                src={Array.isArray(data.images) && data.images[0] ? data.images[0].url : ""}
                width="auto"
            />
        </div>
    );

    return (
        <Link className="work-preview text-color-copy" prefetch="intent" to={`/portfolio/${data.slug}`}>
            <h3 className="m-0 font-bold font-font-serif text-xl">{data.title}</h3>
            <div className="mt-1 mb-6 flex items-baseline gap-2 font-medium text-color-copy-dark">
                {!current && <span>{new Date(date).getFullYear()}</span>}
                {!current && <span className="font-light">|</span>}
                <span>{data.company}</span>
            </div>

            <p>{data.overview}</p>
        </Link>
    );
};
