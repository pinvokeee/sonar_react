import { AppBar, Toolbar, IconButton, Typography, Button, TextField, Input, OutlinedInput, Tooltip, Box, styled, InputBase, MenuItem } from "@mui/material";

import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';
import { SearchInput } from "./components/SearchInput";
import { DialogLoadingRepository } from "../dialog/loadingRepository/DialogLoadingDirectory";
import SearchIcon from '@mui/icons-material/Search';

import { ServiceSelecter } from "./components/ServiceSelecter";
import { repositoryController } from "../../controller/repositoryController";
import { fileObjectContoller_odl } from "../../controller/fileObjectContoller";
import { search } from "../../controller/search";

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
    const reposActions = repositoryController.useActions();

    // const options = topNodes.map(n => n.name);

    // const onChangeTopNodeIndex = (index : number) =>
    // {
    //   fileNodeAction.useSelectTopNode(topNodes[index]);
    // }
    const actions = fileObjectContoller_odl.useActions()

    const a = fileObjectContoller_odl.selectors.useFileHandles();
    const b = fileObjectContoller_odl.selectors.useFileNodes();

    
    const handleSelectRepos = async () =>
    {
      console.log(a, b);

      // console.log(us);
      // actions.a();

      // console.log(us);
      // const f = actions.loadFile(us.nodes[17]);

      // reposActions.selectionRepository();

      // const a = us[0];

      // if (a.children != null)
      // {
      //   // const h = (a.children[0].handle as FileSystemFileHandle);
        
      //   // a.children[0].file.binary = await (await h.getFile()).arrayBuffer();

      //   // actions.loadFile(a.children[0]).then(r =>
      //   //   {
      //   //     console.log(r, a);            
      //   //   })


      // }
      
      // const f = fileNode.useActions().loadFile(us[4]);
    }

    const searchActions = search.useActions();

    return (
        <AppBar elevation={0} sx={{ width: "100vw" }} position="static" enableColorOnDark>          
            <Toolbar variant="dense" sx={{ justifyContent: "space-between" }}>
{/* 
            <SplitButton sx={{ width: 0, flex: 1 }} 
                onChangeSelectedIndex={ (index) => fileNodeAction.useSelectTopNode(topNodes[index]) } /> */}


                {/* <Button onClick={(e) => fileNodeAction.useSelectTopNode()}>TEST</Button> */}
{/* 
            <SplitButton sx={{ width: 0, flex: 1 }} isOpen={o} selectedText="">
            {
              topNodes.map(node => 
              {
                return <MenuItem key={node.name} onClick={a}>{node.name}</MenuItem>
              })
            }
            </SplitButton> */}

            {/* sx={{ flex: "1 1 auto" }} */}

            <ServiceSelecter></ServiceSelecter>

            <SearchInput sx={{ flex: 2 }}>
              <SearchIconEx></SearchIconEx>
              <InputBox onFocus={() => searchActions.showDialog()} placeholder="キーワード検索 (Ctrl+K) / 全体検索（Ctrl+Q）" ></InputBox>
            </SearchInput>

            <ButtonCase sx={{ flex: 1 }}>
              <Tooltip title="リポジトリを再選択">
                <IconButton color="inherit" onClick={ () => handleSelectRepos() }>
                  <DriveFolderUploadIcon></DriveFolderUploadIcon>
                </IconButton>
              </Tooltip>
            </ButtonCase>

          </Toolbar>
          
        </AppBar>
    );
  }