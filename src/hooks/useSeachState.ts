import { useState } from "react";

export type SearchState =
{
    visible: boolean,
    keyword: string,

    setVisible: (state: boolean) => void,
    setKeyword: (keyword: string) => void,    
}

export const useSearchState = () : SearchState =>
{
    const [visible, setVisible] = useState<boolean>(false);
    const [keyword, setKeyword] = useState<string>("");
    
    return {
        visible, setVisible,
        keyword, setKeyword,
    }
}