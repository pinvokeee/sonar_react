import { useState } from "react";

/**
 * コンテキストの継承元
 */
export interface IContextEnviroment<T>
{
    current : T | null,
    setValue : (n : T) => void;
}

/**
 * コンテキストのデフォルト値を生成するメソッド
 * @returns 
 */
export const CreateDefaultContextEnviroment = <T>(defaultValue? : T) : IContextEnviroment<T> =>
{
    return {
        current : defaultValue ? defaultValue : null,
        setValue : () => {}
    }
}

/**
 * 指定した型からコンテキスト環境を生成するメソッド
 * @returns 
 */
export const CreateContextEnviroment = <T>(defaultValue? : T) : IContextEnviroment<T> => 
{
    const [current, setValue] = useState<T | null>(defaultValue ? defaultValue : null);

    return {
        current, setValue,
    }
}

