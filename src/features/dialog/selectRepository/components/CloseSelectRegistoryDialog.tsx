import { Button } from "@mui/material"
import { dialogController } from "../../../../controller/dialogController";
import { repositoryController } from "../../../../controller/repositoryController";
import { DialogNames } from "../../../../define/names/dialogNames";

export const CloseSelectRegistoryDialog = () =>
{
    const state = dialogController.useCurrentState();
    const actions = repositoryController.useActions();

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