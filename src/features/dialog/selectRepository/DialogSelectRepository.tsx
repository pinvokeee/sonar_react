import { Backdrop, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, List, ListItem, Stack } from "@mui/material"
import { useMemo, useState } from "react";
import { Directory } from "../../../class/fileSystem/directory"
import { FileSystemTreeNode } from "../../../class/fileSystem/types";
import { dialogController, dialogStateSelector } from "../../../controller/dialogController";
import { DialogNames } from "../../../define/names/dialogNames";
import { DialogLoadingRepository } from "../loadingRepository/DialogLoadingDirectory";
import { CloseSelectRegistoryDialog } from "./components/CloseSelectRegistoryDialog";
import { RegistNewRepository } from "./components/RegistNewRepository";
import { RepositoryList } from "./components/RepositoryList";

export const DialogSelectRepository = () =>
{
   const state = dialogController.useCurrentState();
   const isShown = state.name == DialogNames.SelectRepository || state.name == DialogNames.ReSelectRepository;

    return <>
        <Backdrop sx={{ zIndex: 1 }} open={isShown}>

            {/* <DialogLoadingRepository isOpen={loadRepository.state.isProgress}></DialogLoadingRepository> */}

            <Dialog open={isShown}>
                
                <DialogTitle sx={{ textAlign: "left" }}>リポジトリ選択</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        リポジトリとして読み込むフォルダを選択してください。<br></br>
                        権限を求められる場合は「ファイルを編集」を選択してください。
                    </DialogContentText>
                </DialogContent>

                <RepositoryList></RepositoryList>

                <DialogActions>
                    <RegistNewRepository></RegistNewRepository>
                    <CloseSelectRegistoryDialog></CloseSelectRegistoryDialog>
                </DialogActions>

            </Dialog>
        </Backdrop>
    </>
}