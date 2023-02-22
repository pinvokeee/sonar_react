import { useCallback, useEffect, useReducer, useState } from "react";
import { getEntriesCountFromDirectoryHandle, loadFromDirectoryHandle } from "../loader";
type State = 
{
  currentFilePath: string,
  progress: number,
  maximum: number,
  isCompleted: boolean,
}

const resetState = () : State => 
{
  return { 
      currentFilePath: "",
      isCompleted: true,
      progress: 0,
      maximum: 0,
   }
}

export const useLoadDialog = () =>
{
    const [state, setState] = useState<State>(resetState());

    const onProgress = useCallback((file: string) =>
    {
      setState({ ...state, currentFilePath: file, progress: state.progress++, 
        isCompleted: (state.progress >= state.maximum) });
    }, []);

    const showDirectoryPicker = useCallback(async () =>
    {
      setState(resetState());

      const handle = await window.showDirectoryPicker();
      const max = await getEntriesCountFromDirectoryHandle(handle);
      state.maximum = max;

      return await loadFromDirectoryHandle(handle, onProgress);
      
    }, []);

    return {
      showDirectoryPicker,
      state,
    }
}