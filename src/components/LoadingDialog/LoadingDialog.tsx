import { Box, CircularProgress, Dialog, DialogContent, DialogTitle, Typography } from "@mui/material"

export interface LoadingDialogProps 
{
    isOpen : boolean,
    currentFile? : string,
}

export const LoadingDialog = (props : LoadingDialogProps) =>
{
    return (
        <Dialog open={props.isOpen}>
            <DialogTitle id="alert-dialog-title">読み込み中</DialogTitle>
            <DialogContent>
                <Box sx={{ display: 'flex', minWidth: 400 }}>
                    <CircularProgress sx={{ flexFlow: "row" }} />
                    <Typography flexWrap={"wrap"}>{ props?.currentFile }</Typography>
                </Box>
            </DialogContent>
        </Dialog>
    )
}