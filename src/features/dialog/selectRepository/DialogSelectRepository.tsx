import { Backdrop, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, List, ListItem, Stack } from "@mui/material"
import { useMemo, useState } from "react";
import { Directory } from "../../../class/fileSystem/directory"
import { FileSystemNode } from "../../../class/fileSystem/types";
import { dialogStates, dialogStateSelector } from "../../../controller/dialogState";
import { repositoryActions } from "../../../controller/repository";
import { DialogNames } from "../../../define/dialogNames";
import { useLoadRepository as useLoadRepository } from "../../../hooks/useLoadRepository";
import { DialogLoadingRepository } from "../loadingRepository/DialogLoadingDirectory";
import { RegistNewRepository } from "./components/RegistNewRepository";
import { RepositoryList } from "./components/RepositoryList";

export const DialogSelectRepository = () =>
{
   const state = dialogStates.useCurrentState();

    return <>
        <Backdrop sx={{ zIndex: 1 }} open={state.name == DialogNames.SelectRepository}>

            {/* <DialogLoadingRepository isOpen={loadRepository.state.isProgress}></DialogLoadingRepository> */}

            <Dialog open={state.name == DialogNames.SelectRepository}>
                
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
                </DialogActions>

            </Dialog>
        </Backdrop>
    </>
}