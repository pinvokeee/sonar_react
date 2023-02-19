import { AppBar, Toolbar, IconButton, Typography, Button, TextField, Input, OutlinedInput, Tooltip, Box, styled, InputBase } from "@mui/material";
import { useContext, useMemo, useState } from "react";

import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';
import { FileNode } from "../../types";

import { useLoadDialog } from "../../hooks/useLoadingDialog";
import SplitButton from "../../components/elements/toolbar/SplitButton";
import { SearchInput } from "../../components/elements/toolbar/SearchInput";
import { LoadingDirectoryDialog } from "../dialog/LoadingDirectoryDialog";
import { loadFromDirectoryHandle } from "../../loader";
import { HookTemplates } from "../../hooks/contextTemplates";
import { createTemplateTree } from "../../loader/templateLoader";
import { SearchState } from "../../hooks/useSeachState";
import SearchIcon from '@mui/icons-material/Search';
import { useRecoilState, useRecoilValue } from "recoil";

import { currentDirectoryState } from "../../recoil/atoms/atomCurrentDirectory";
import { useLoader, useSelectedTemplates } from "../../hooks/useLoader";

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

const InputBox = styled(InputBase)(({ theme }) => 
(
  {
      color: "inherit",
      width: "100%",
      marginLeft: 12,
  }
));

const SearchIconEx = styled(SearchIcon)(({ theme }) => 
(
  {
    marginLeft: 12,
  }
));

type Prop = 
{
  children?: React.ReactNode,
}

export const AppHeader = (props: Prop) =>
{    
  const loader = useLoader();

    const hookLoadDialog = useLoadDialog();
    const h = useSelectedTemplates();

    const topNodes = loader.templates.filter(node => node.type == "directory");
    const topNodeTiles = topNodes.map(node => node.name);

    const onChangeTopNodeIndex = (index : number) =>
    {
      h.setNode1(topNodes[index]);

      console.log(topNodes[index]);

      // props.templatesHook.setNode1(topNodes[index]);
    }
    
    const clickSelectFolder = () =>
    {
      hookLoadDialog.showDirectoryPicker().then(directories => 
      {
        

        // setDirectory(directories);


        // props.dirHook.setDirectories(directories);

        // createTemplateTree(directories).then(templates =>
        // {
        //   props.templatesHook.setTemplates(templates);
        // })
        
      });
    }



    return (
        <AppBar elevation={0} sx={{ width: "100vw" }} position="static">          
            <Toolbar sx={{ justifyContent: "space-between" }}>

            <SplitButton sx={{ width: 0, flex: 1 }} options={topNodeTiles} onChangeSelectedIndex={onChangeTopNodeIndex}></SplitButton>
            {/* sx={{ flex: "1 1 auto" }} */}

            <SearchInput sx={{ flex: 2 }}>
              <SearchIconEx></SearchIconEx>
              <InputBox placeholder="キーワード検索 (Ctrl+K) / 全体検索（Ctrl+Q）"></InputBox>
            </SearchInput>

            <ButtonCase sx={{ flex: 1 }}>
              <Tooltip title="フォルダーを選択する">
                <IconButton color="inherit" onClick={ () => loader.pickTargetFolder() }>
                  <DriveFolderUploadIcon></DriveFolderUploadIcon>
                </IconButton>
              </Tooltip>
            </ButtonCase>

          </Toolbar>

          <LoadingDirectoryDialog 
            isOpen={loader.loadingState.isProgress}
            currentFile={loader.loadingState.file}
            currentProgress={loader.loadingState.current}
            maximumValue={loader.loadingState.maximum}
          />
          
        </AppBar>
    );
  }