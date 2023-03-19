type ParsedTextBlock =
{
    text: string,
    type: "other" | "matched",
}

export class TextParser
{
    /**
     * キーワードを含むテキストを解析する
     * @param src 
     * @param keyword 
     * @returns 
     */
    static parseMatchedText(src: string, keyword: string): ParsedTextBlock[] {
    
        if (keyword.length == 0) return [{ text: src, type: "other" }];

        const parsed: ParsedTextBlock[] = [];

        let index = src.indexOf(keyword);
        let start = 0;

        while (index > -1)
        {
            if (index > 0) parsed.push({ text: src.slice(start, index), type: "other" });

            let length = index + keyword.length;
            let dupe = src.indexOf(keyword, length);

            while (dupe == length)
            {
                length += keyword.length;
                dupe = src.indexOf(keyword, length);
            }

            parsed.push({ text:src.slice(index, length) , type: "matched" });

            start = length;
            index = src.indexOf(keyword, length);
        }

        if (start != index) parsed.push({ text: src.slice(start, src.length), type: "other" });

        return parsed;
    }
}