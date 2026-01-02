import { SocialLink } from "./SocialLink";
import "~/styles/index.css";

export default {
    title: "shared/ui/SocialLink",
};

const githubData = {
    icon: "https://cdn.simpleicons.org/github",
    title: "GitHub",
    url: "https://github.com",
};

const twitterData = {
    icon: "https://cdn.simpleicons.org/x",
    title: "Twitter",
    url: "https://twitter.com",
};

const linkedinData = {
    icon: "https://cdn.simpleicons.org/linkedin",
    title: "LinkedIn",
    url: "https://linkedin.com",
};

export const GitHub = () => <SocialLink data={githubData} />;

export const Twitter = () => <SocialLink data={twitterData} />;

export const LinkedIn = () => <SocialLink data={linkedinData} />;

export const AllSocialLinks = () => (
    <div className="flex flex-col gap-4">
        <SocialLink data={githubData} />
        <SocialLink data={twitterData} />
        <SocialLink data={linkedinData} />
    </div>
);
