import { selector, selectorFamily, useRecoilValue } from "recoil";
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

export const dialogStates = 
{
    useCurrentState: () => useRecoilValue(dialogStateSelector.select),
}