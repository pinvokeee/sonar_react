import { AppBar, Toolbar, IconButton, Typography, Button, TextField, Input, OutlinedInput, Tooltip, Box, styled, InputBase, MenuItem } from "@mui/material";

import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';
import { SearchInput } from "./components/SearchInput";
import SearchIcon from '@mui/icons-material/Search';

import { ServiceSelecter } from "./components/ServiceSelecter";
import { repositoryController } from "../../controller/repositoryController";
import { fileObjectContoller_odl } from "../../controller/fileObjectContoller";
import { dialogController } from "../../controller/dialogController";

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

const AppToolBar = styled(AppBar)(({ theme }) => 
(
  {
    width: "100%",
    backgroundColor: theme.palette.common.black,
    border: "0 0 4px 0",
    borderBottom: `1px solid ${theme.palette.common.white}`,
  }
));

type Prop = 
{
  children?: React.ReactNode,
}

export const ViewerHeader = (props: Prop) =>
{    
    const reposActions = repositoryController.useActions();

    const dialogAction = dialogController.useActions();

    const handleSelectRepos = async () =>
    {

    }

    return (
        <AppToolBar elevation={0} position="static">          
            <Toolbar variant="dense" sx={{ justifyContent: "space-between" }}>

            <ServiceSelecter></ServiceSelecter>

            <SearchInput sx={{ flex: 2 }}>
              <SearchIconEx></SearchIconEx>
              <InputBox readOnly onFocus={() => dialogAction.openSearchDialog()} placeholder="キーワード検索 (Ctrl+K) / 全体検索（Ctrl+Q）" ></InputBox>
            </SearchInput>

            <ButtonCase sx={{ flex: 1 }}>
              <Tooltip title="リポジトリを再選択">
                <IconButton color="inherit" onClick={ () => handleSelectRepos() }>
                  <DriveFolderUploadIcon></DriveFolderUploadIcon>
                </IconButton>
              </Tooltip>
            </ButtonCase>

          </Toolbar>
          
        </AppToolBar>
    );
  }