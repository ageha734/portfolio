export var prisma;
(function (prisma) {
    prisma.tagValues = (kind) => (model) => {
        if (!model.documentation?.length)
            return [];
        const output = [];
        const splitted = model.documentation.split("\r\n").join("\n").split("\n");
        for (const line of splitted) {
            const first = line.indexOf(`@${kind} `);
            if (first === -1)
                continue;
            output.push(line.slice(first + kind.length + 2).trim());
        }
        return output.map((str) => str.trim()).filter((str) => !!str.length);
    };
})(prisma || (prisma = {}));
