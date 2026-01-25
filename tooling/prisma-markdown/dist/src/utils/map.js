export var map;
(function (map) {
    map.take = (dict) => (key, generator) => {
        const oldbie = dict.get(key);
        if (oldbie)
            return oldbie;
        const value = generator();
        dict.set(key, value);
        return value;
    };
})(map || (map = {}));
