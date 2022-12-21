import styled from "@emotion/styled/types/base";
import { AppBar, Toolbar, IconButton, Typography, Button, TextField, Input, OutlinedInput, Tooltip } from "@mui/material";
import { useContext, useState } from "react";
import { templatesNodeContext, } from "../../context/contextTemplates";

import { LoaderTemplates } from "../../loader/LoaderTemplates";
import { LoadingDialog } from "../../components/LoadingDialog/LoadingDialog";
import { SplitButton } from "../../components/SplitButton/SplitButton";
import { SearchInput } from "../../components/SearchInput/SearchInput";

import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';
import { ITemplateContentNode, ITemplateDirectoryNode } from "../../types";

import { useLoadDialog } from "../../hooks/useLoadingDialog";

export const AppToolBar = () =>
{    
    const tempContext = useContext(templatesNodeContext);
    const hookLoadDialog = useLoadDialog();

    const [topNodes, setTopNodes] = useState<ITemplateDirectoryNode[]>([]);

    const onChangeTopNodeIndex = (index : number) =>
    {
      // setTopNodes(tempContext.current);
      // if (tempContext.current?.children == null) return;
      // const a = createChildNodes(tempContext.current);
      // console.log(a);
      // setTopNodes(a);

        // const aa = getTopNodes();
        // if (aa == null) return ;
        // console.log(index, aa[index]);

        // topNodes[1].name = "ABBC";
        // setTopNodes( topNodes.map((n, index) => index == 1 ? {...n, name: "AABBC"} : n) );
    }

    // const t = () =>
    // {
    //   if (tempContext.current?.children == null) return;
    //   tempContext.current.children[4].name = "TEST";

    //   console.log(tempContext.current);

    //   tempContext.setValue(tempContext.current);
    // }

    const clickSelectFolder = () =>
    {
      hookLoadDialog.showDirectoryPicker().then(resultNode =>
      {
        console.log(resultNode);
        tempContext.setValue(resultNode);
        setTopNodes(createChildNodes(resultNode));

        console.log(JSON.stringify(resultNode));
      });
    }

    const createChildNodes = (topNode : ITemplateDirectoryNode) : ITemplateDirectoryNode[] =>
    {
      if (topNode.children == null) return [];      
      return topNode.children.filter(n => n.nodeType == "directory");
    }

    const getTopNodeTitles = () : string[] =>
    {
      return topNodes.map(n => n.name);
    }
    
    return (
        <AppBar position="sticky">
          <Toolbar>
            <SplitButton options={getTopNodeTitles()} onChangeSelectedIndex={onChangeTopNodeIndex}></SplitButton>
            {/* <OutlinedInput  placeholder="検索(Ctrl+F)"/> */}
            <SearchInput></SearchInput>

            <Tooltip title="フォルダーを選択する">
              <IconButton color="inherit" onClick={ clickSelectFolder }>
                <DriveFolderUploadIcon></DriveFolderUploadIcon>
              </IconButton>
            </Tooltip>
            {/* <Button sx={{ marginLeft: "auto" }} color="inherit" onClick={a}>フォルダー選択</Button> */}
          </Toolbar>

          <LoadingDialog 
          isOpen={!hookLoadDialog.progress.isComplete} 
          currentFile={hookLoadDialog.progress.currentFile}
          currentProgress={hookLoadDialog.progress.currentValue} 
          maximumValue={hookLoadDialog.progress.maximumValue}></LoadingDialog>

        </AppBar>
    );
  }