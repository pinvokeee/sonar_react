import styled from "@emotion/styled/types/base";
import { AppBar, Toolbar, IconButton, Typography, Button, TextField, Input, OutlinedInput, Tooltip } from "@mui/material";
import { useContext, useState } from "react";
import { templatesNodeContext, } from "../../context/contextTemplates";

import { LoaderTemplates } from "../../loader/LoaderTemplates";
import { LoadingDialog } from "../../components/LoadingDialog/LoadingDialog";
import { SplitButton } from "../../components/SplitButton/SplitButton";
import { SearchInput } from "../../components/SearchInput/SearchInput";

import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';

export const AppToolBar = () =>
{
    const tempContext = useContext(templatesNodeContext);
    const templateLoader = new LoaderTemplates();

    const [isLoading, setLoadingState] = useState<boolean>(false);

    const [stateCurrentFile, setStateCurrentFile] = useState<string>("");

    const onProgress = (file : string) =>
    {
        setStateCurrentFile(file);
    }

    const onChangeTopNodeIndex = (index : number) =>
    {
        const aa = getTopNodes();
        if (aa == null) return ;
        console.log(index, aa[index]);
    }

    const a = () =>
    {
      const handle = window.showDirectoryPicker().then(h => 
      {
          setLoadingState(true);

          templateLoader?.loadFromDirectoryHandle(h, onProgress).then(resultTopNode => 
          {
            // console.log(r);
            // console.log(r.children?.length);

            tempContext.setValue(resultTopNode);
            setLoadingState(false);
          });
      });
    }

    const getTopNodes = () =>
    {
      if (tempContext.current?.children == null) return [];      
      return tempContext.current.children.filter(n => n.nodeType=="directory").map(n => n.name);
    }
    
    return (
        <AppBar position="sticky">
          <Toolbar>
            <SplitButton options={getTopNodes()} onChangeSelectedIndex={onChangeTopNodeIndex}></SplitButton>

            {/* <OutlinedInput  placeholder="検索(Ctrl+F)"/> */}

            <SearchInput></SearchInput>

            <Tooltip title="フォルダーを選択する">
              <IconButton color="inherit" onClick={a}>
                <DriveFolderUploadIcon></DriveFolderUploadIcon>
              </IconButton>
            </Tooltip>
            {/* <Button sx={{ marginLeft: "auto" }} color="inherit" onClick={a}>フォルダー選択</Button> */}
          </Toolbar>

          <LoadingDialog isOpen={isLoading} currentFile={stateCurrentFile}></LoadingDialog>

        </AppBar>
    );
  }