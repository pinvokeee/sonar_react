import { AppBar, Toolbar, IconButton, Typography, Button, TextField, Input, OutlinedInput, Tooltip, Box, styled } from "@mui/material";
import { useContext, useMemo, useState } from "react";

import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';
import { FileNode } from "../../types";

import { useLoadDialog } from "../../hooks/useLoadingDialog";
import SplitButton from "./components/SplitButton";
import { SearchInput } from "./components/SearchInput";
import { LoadingDirectoryDialog } from "../../components/common/dialog/loadingDirectoryDialog/LoadingDirectoryDialog";
import { DirectoryContext, HookDirectory, useDirectory } from "../../hooks/contextFile";
import { loadFromDirectoryHandle } from "../../loader";
import { HookTemplates } from "../../hooks/contextTemplates";
import { createTemplateTree } from "../../loader/templateLoader";

const Flex = styled("div")(({theme}) =>
(
  {
    display: "flex",
    maxWidth: "20%",
  }
));

const ButtonCase = styled("div")(({theme}) =>
(
  {
    display: "flex",
    justifyContent: "flex-end",
  }
));

type Prop = 
{
  dirHook: HookDirectory,
  templatesHook: HookTemplates,
  children?: React.ReactNode,
}

export const AppToolBar = (props: Prop) =>
{    
    // console.log("APPTOOLBAR");

    const hookLoadDialog = useLoadDialog();

    const topNodes = props.templatesHook.templates.filter(node => node.type == "directory");
    const topNodeTiles = topNodes.map(node => node.name);

    const onChangeTopNodeIndex = (index : number) =>
    {
      props.templatesHook.setNode1(topNodes[index]);
    }
    
    const clickSelectFolder = () =>
    {
      hookLoadDialog.showDirectoryPicker().then(directories => 
      {
        props.dirHook.setDirectories(directories);

        createTemplateTree(directories).then(templates =>
        {
          props.templatesHook.setTemplates(templates);
        })
        
      });
    }
    
    return (
        <AppBar elevation={0} position="static">
          <Toolbar sx={{ justifyContent: "space-between" }}>
            <SplitButton sx={{ width: 0, flex: 1 }} options={topNodeTiles} onChangeSelectedIndex={onChangeTopNodeIndex}></SplitButton>
            {/* sx={{ flex: "1 1 auto" }} */}

            <SearchInput  sx={{ flex: 2 }}></SearchInput>

            <ButtonCase sx={{ flex: 1 }}>
              <Tooltip title="フォルダーを選択する">
                <IconButton color="inherit" onClick={ clickSelectFolder }>
                  <DriveFolderUploadIcon></DriveFolderUploadIcon>
                </IconButton>
              </Tooltip>
            </ButtonCase>

          </Toolbar>

          <LoadingDirectoryDialog 
          isOpen={!hookLoadDialog.state.isCompleted} 
          currentFile={hookLoadDialog.state.currentFilePath}
          currentProgress={hookLoadDialog.state.progress} 
          maximumValue={hookLoadDialog.state.maximum}></LoadingDirectoryDialog>

        </AppBar>
    );
  }