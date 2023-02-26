export const generateUuid = () =>
{
    // https://github.com/GoogleChrome/chrome-platform-analytics/blob/master/src/internal/identifier.js
    // const FORMAT: string = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx";
    let chars = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".split("");
    for (let i = 0, len = chars.length; i < len; i++) {
        switch (chars[i]) {
            case "x":
                chars[i] = Math.floor(Math.random() * 16).toString(16);
                break;
            case "y":
                chars[i] = (Math.floor(Math.random() * 4) + 8).toString(16);
                break;
        }
    }
    return chars.join("");
}

export const MapExt = 
{
    find: <KT, OT>(mapObject: Map<KT, OT>, matched: (item: OT) => boolean) =>
    {
        const item = Array.from(mapObject).find(([key, value]) => matched(value));
        return item ? item[1] : undefined;
    },

    filter: <KT, OT>(mapObject: Map<KT, OT>, matched: (item: OT) => boolean) =>
    {
        const temp = new Map<KT, OT>();

        mapObject.forEach((value, key) => 
        {
            if (matched(value)) temp.set(key, value);
        });

        return temp;
    }
}