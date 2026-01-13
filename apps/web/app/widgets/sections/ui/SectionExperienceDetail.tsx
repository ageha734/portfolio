import { getTimeWorked } from "../lib/date-time";
import type { SectionExperienceDetailProps } from "../model/types";

export const SectionExperienceDetail = (props: SectionExperienceDetailProps) => {
    const { experience } = props;
    const { company, companyUrl, date, dateRange, description, highlights, image, title } = experience;

    const start = dateRange ? dateRange[0] : new Date();
    const stop = dateRange?.[1] ?? new Date();
    const _length = getTimeWorked(start, stop);

    console.log(`Worked at ${company} for`, _length);

    return (
        <div className="flex flex-col gap-10 md:flex-row" key={title}>
            <div className="flex flex-col gap-2 text-base md:basis-[160px] print:basis-8">
                <div className="flex">
                    <h3 className="flex items-center gap-2 font-bold">
                        <a
                            className="underline-offset-4 hover:underline print:text-color-copy-dark"
                            dangerouslySetInnerHTML={{ __html: company }}
                            href={companyUrl}
                            rel="noreferrer"
                            target="_blank"
                        />
                        {experience.contract && (
                            <small className="font-normal text-gray-700 text-xs italic">(contract)</small>
                        )}
                        {image && (
                            <img
                                alt={`${company} favicon`}
                                className="h-4 w-4"
                                height="auto"
                                loading="eager"
                                src={image}
                                width="auto"
                            />
                        )}
                    </h3>
                </div>
                <h3 className="uppercase- font-medium text-xs">
                    <div className="uppercase">{title}</div>
                    <div className="text-color-copy-light">{date}</div>
                </h3>
            </div>

            <div className="flex-1 text-sm leading-4">
                <div dangerouslySetInnerHTML={{ __html: description }} />
                <ul className="my-4 ml-4 list-disc font-light text-color-copy text-sm">
                    {highlights.map((highlight, index) => (
                        <li
                            className="my-1"
                            dangerouslySetInnerHTML={{ __html: highlight }}
                            key={`${highlight}-${index}`}
                        />
                    ))}
                </ul>
            </div>
        </div>
    );
};
