import { useCallback } from "react";
import { selector, selectorFamily, useRecoilCallback, useRecoilValue, useSetRecoilState } from "recoil";
import { DialogNames } from "../define/names/dialogNames";
import { AtomDialogState } from "../define/recoil/atoms";
import { selectorKeys } from "../define/recoil/keys";
import { DialogState } from "../features/dialog/types";

export const dialogStateSelector = 
{
    select: selector<DialogState>({
        key: selectorKeys.SEL_DIALOG_STATE,
        get: ({get}) => get(AtomDialogState)
    }),
}

export const dialogController = 
{
    useActions: () =>
    {        
        return {

            open: useRecoilCallback(({ snapshot, set }) => async (name: string) =>
            {
                set(AtomDialogState, { name } );
            }, []),

            openSearchDialog: useRecoilCallback(({ snapshot, set }) => async () =>
            {
                set(AtomDialogState, { name: DialogNames.SearchFromKeywords } );
            }, []),


            close: useRecoilCallback(({ snapshot, set }) => async () =>
            {
                set(AtomDialogState, { name: "" } );

            }, []),
        }
    },

    useCurrentState: () => useRecoilValue(dialogStateSelector.select),
}