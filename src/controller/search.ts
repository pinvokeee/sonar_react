import { useCallback } from "react"
import { useSetRecoilState } from "recoil";
import { DialogNames } from "../define/names/dialogNames";
import { AtomDialogState } from "../define/recoil/atoms";

export const search =
{
    useActions: () =>
    {
        const setDialogState = useSetRecoilState(AtomDialogState);

        return {
            showDialog: useCallback(() =>
            {
                setDialogState( { name: DialogNames.SearchFromKeywords } );
                
            },[])
        }
    },

    selector:
    {

    }
}