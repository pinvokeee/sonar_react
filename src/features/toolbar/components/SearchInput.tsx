import * as React from 'react';
import { styled, alpha, SxProps, Theme } from '@mui/material/styles';
import { InputBase, Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const SearchInputBase = styled("div")(({ theme }) => (
{
    position: "relative",
    padding: 6,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    borderRadius: theme.shape.borderRadius,
    width: "600px",
    color: "inherit",
    display: "flex",
    alignItems: 'center',
    textAlign: "left",
    justifyContent: 'left',
    
}));

const InputBox = styled(InputBase)(({ theme }) => (
{
    color: "inherit",
    width: "100%",
    marginLeft: 12,
}));

const SearchIconEx = styled(SearchIcon)(({ theme }) => (
{
    marginLeft: 12,
}));

type Props = 
{
    sx?: SxProps<Theme>, 
}

export const SearchInput = (prop: Props) =>
{
   return (
    <SearchInputBase sx={prop.sx}>
        <SearchIconEx></SearchIconEx>
        <InputBox placeholder="キーワード検索 (Ctrl+K) / 全体検索（Ctrl+Q）"></InputBox>
    </SearchInputBase>
   );
}