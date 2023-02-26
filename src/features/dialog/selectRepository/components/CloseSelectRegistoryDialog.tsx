import { Button } from "@mui/material"
import { dialogStates } from "../../../../controller/dialogState";
import { repository } from "../../../../controller/repository";
import { DialogNames } from "../../../../define/dialogNames";

export const CloseSelectRegistoryDialog = () =>
{
    const state = dialogStates.useCurrentState();
    const actions = repository.useActions();

    return <>
    {
        state.name == DialogNames.ReSelectRepository ? 
        <Button variant="outlined" color="error" 
        disableElevation 
        hidden={true}
        onClick={ () => actions.closeSelectionRepository() }
        >キャンセル</Button>
    :<></>
    }    
    </>
}