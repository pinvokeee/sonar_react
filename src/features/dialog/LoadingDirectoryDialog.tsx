import { Box, CircularProgress, Dialog, DialogContent, DialogTitle, LinearProgress, Typography } from "@mui/material"

interface Props 
{
    isOpen : boolean,
    currentFile? : string,
    maximumValue? : number,
    currentProgress? : number,
}

export const LoadingDirectoryDialog = (props : Props) =>
{
    const getProgeres = () =>
    {
        if (props.currentProgress == null || props.maximumValue == null) return 0;
        return props.currentProgress / props.maximumValue * 100;
    }

    return (
        <Dialog fullWidth={true} open={props.isOpen}>
            <DialogTitle id="alert-dialog-title">読み込み中 ({props.currentProgress} / {props.maximumValue})</DialogTitle>
            <DialogContent>
                <Box>
                    {
                        props.maximumValue == null || props.maximumValue == 0
                            ? 
                                <Box>
                                    ファイル数計算中...
                                    <CircularProgress sx={{ flexFlow: "row" }} />
                                </Box>
                            : <LinearProgress variant="determinate" value={ getProgeres() } />
                    }
                    <Typography noWrap={true}>{ props?.currentFile }</Typography>
                </Box>
            </DialogContent>
        </Dialog>
    )
}