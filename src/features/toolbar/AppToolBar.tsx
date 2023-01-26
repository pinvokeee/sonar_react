import styled from "@emotion/styled/types/base";
import { AppBar, Toolbar, IconButton, Typography, Button, TextField, Input, OutlinedInput, Tooltip } from "@mui/material";
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
        <AppBar position="static">
          <Toolbar>
            <SplitButton options={topNodeTiles} onChangeSelectedIndex={onChangeTopNodeIndex}></SplitButton>
            <SearchInput></SearchInput>

            <Tooltip title="フォルダーを選択する">
              <IconButton color="inherit" onClick={ clickSelectFolder }>
                <DriveFolderUploadIcon></DriveFolderUploadIcon>
              </IconButton>
            </Tooltip>
          </Toolbar>

          <LoadingDirectoryDialog 
          isOpen={!hookLoadDialog.state.isCompleted} 
          currentFile={hookLoadDialog.state.currentFilePath}
          currentProgress={hookLoadDialog.state.progress} 
          maximumValue={hookLoadDialog.state.maximum}></LoadingDirectoryDialog>

        </AppBar>
    );
  }