import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import classnames from "classnames";
export const Tags = (props) => {
    const { className, classNameTag, heading, tags } = props;
    return (_jsxs("div", { className: className, children: [heading && _jsx("h2", { className: "mb-8 text-2xl", children: heading }), _jsx("div", { className: "flex flex-wrap gap-2", children: tags.map((tag) => (_jsx("div", { className: classnames(classNameTag), children: tag }, tag))) })] }));
};
