import { useSetRecoilState } from "recoil"
import { AtomDialogState } from "../define/recoil/atoms"

export const searchDialog = 
{
    useActions: () =>
    {
        const setDialogState = useSetRecoilState(AtomDialogState);

        return {

            

            closeDialog: () =>
            {
                setDialogState({name: ""});
            },
        }
    }
}