import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import { InputBase, Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const SearchInputBase = styled("div")(({ theme }) => (
{
    position: "relative",
    padding: 6,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    borderRadius: theme.shape.borderRadius,
    width: "100%",
    color: "inherit",
    display: "flex",
    alignItems: 'center',
    justifyContent: 'center',
}));

const InputBox = styled(InputBase)(({ theme }) => (
{
    color: "inherit",
    width: "100%",
    marginLeft: 6,
}));

const SearchIconEx = styled(SearchIcon)(({ theme }) => (
{
    marginLeft: 6,
}));

export const SearchInput = () =>
{
   return (
    <SearchInputBase>
        <SearchIconEx></SearchIconEx>
        <InputBox placeholder="検索 (Ctrl+F)"></InputBox>
    </SearchInputBase>
   );
}