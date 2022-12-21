import { useState } from "react";
import { LoaderTemplates } from "../loader/LoaderTemplates";

export const useLoadDialog = () =>
{
    const [stateCurrentFile, setStateCurrentFile] = useState<string>("");
    const [stateCurrentProgress, setStateCurrentProgress] = useState<number>(0);
    const [stateMaxProgress, setStateMaxProgress] = useState<number>(0);
    const [stateIsLoading, setLoadingState] = useState<boolean>(false);

    const templateLoader = new LoaderTemplates();

    let count = 0;

    const onProgress = (file : string) =>
    {
      count++;
      setStateCurrentFile(file);
      setStateCurrentProgress(count);
    }

    const onGotMaxProgress = (count : number) =>
    {
      setStateMaxProgress(count);
    }

    const showDirectoryPicker = () =>
    {
        return new Promise((resolve : (resultTopNode : any) => void, reject) =>
        {
            const handle = window.showDirectoryPicker().then(h => 
            {
                setStateCurrentProgress(0);
                setStateCurrentProgress(0);
                setLoadingState(true);

                templateLoader?.loadFromDirectoryHandle(h, onProgress, onGotMaxProgress).then(resultTopNode => 
                {
                    setLoadingState(false);
                    resolve(resultTopNode);
                });
            });
        });
    }

    return {
        showDirectoryPicker : showDirectoryPicker,
        progress:
        {
            isComplete : !stateIsLoading,
            currentFile : stateCurrentFile,
            currentValue: stateCurrentProgress,
            maximumValue : stateMaxProgress,
        },
    }

}