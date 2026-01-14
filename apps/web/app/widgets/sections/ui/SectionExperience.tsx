import { useState } from "react";
import { experience as data } from "~/shared/data/resume";
import { SectionExperienceDetail } from "./SectionExperienceDetail";

export const SectionExperience = () => {
	const minValue = 4;
	const [shown, setShown] = useState(minValue);

	const experience = data.slice(0, shown);

	const onToggleExp = () => {
		setShown(shown === minValue ? data.length : minValue);
	};

	return (
		<section>
			<div>
				<h2 className="py-8 text-lg md:text-xl print:py-4">Experience</h2>
				<div className="mb-8 border-color-border border-t border-solid print:hidden" />
			</div>

			<div className="mb-10 flex flex-col gap-10">
				{experience.map((exp) => (
					<SectionExperienceDetail
						experience={exp}
						key={`${exp.company}/${exp.title}`}
					/>
				))}
			</div>
			<div className="print:hidden">
				<button
					type="button"
					className="ui-btn custom-bg-gradient m-10 mx-auto block rounded-2xl border border-color-border bg-color-background-light px-4 py-2 font-font-sans-serif text-white text-xs"
					onClick={onToggleExp}
				>
					{shown === minValue ? "Show more" : "Show less"}
				</button>
			</div>
		</section>
	);
};
