import styled from "@emotion/styled/types/base";
import { AppBar, Toolbar, IconButton, Typography, Button, TextField, Input, OutlinedInput, Tooltip } from "@mui/material";
import { useContext, useState } from "react";

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

    const onChangeTopNodeIndex = (index : number) =>
    {

    }
    
    const clickSelectFolder = () =>
    {
      hookLoadDialog.showDirectoryPicker().then(directories => 
      {
        props.dirHook.setDirectories(directories);

        createTemplateTree(directories).then(templates =>
        {
          props.templatesHook.setTemplates(templates);

          console.log(templates);
        })
        
      });
    }

    const getTopNodeTitles = () : string[] =>
    {
      return props.dirHook.directories.filter(d => d.kind == "directory").map(d => d.name);
    }
    
    return (
        <AppBar position="static">
          <Toolbar>
            <SplitButton options={getTopNodeTitles()} onChangeSelectedIndex={onChangeTopNodeIndex}></SplitButton>
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