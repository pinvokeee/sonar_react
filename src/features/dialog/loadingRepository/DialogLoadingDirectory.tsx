import { Box, CircularProgress, Dialog, DialogContent, DialogTitle, LinearProgress, Typography } from "@mui/material"
import { dialogController } from "../../../controller/dialogController";
import { repositoryLoadingStateSelector } from "../../../controller/repositoryController";
import { DialogNames } from "../../../define/names/dialogNames";

interface Props 
{

}

export const DialogLoadingRepository = (props : Props) =>
{
    const state = dialogController.useCurrentState();
    const loadingState = repositoryLoadingStateSelector.useCurrentState();

    const getProgeres = () =>
    {
        if (loadingState.progress == null || loadingState.maximum == null) return 0;
        return loadingState.progress / loadingState.maximum * 100;
    }

    return (
        <Dialog fullWidth={true} open={state.name == DialogNames.LoadingRepository}>
            <DialogTitle id="alert-dialog-title">読み込み中 ({loadingState.progress} / {loadingState.maximum})</DialogTitle>
            <DialogContent>
                <Box>
                    {
                        loadingState.maximum == null || loadingState.maximum == 0
                            ? 
                                <Box>
                                    ファイル数計算中...
                                    <CircularProgress sx={{ flexFlow: "row" }} />
                                </Box>
                            : <LinearProgress variant="determinate" value={ getProgeres() } />
                    }
                    <Typography noWrap={true}>{ loadingState.currentNode }</Typography>
                </Box>
            </DialogContent>
        </Dialog>
    )
}