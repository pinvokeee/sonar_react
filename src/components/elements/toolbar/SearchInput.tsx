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

type Props = 
{
    children: React.ReactNode,
    sx?: SxProps<Theme>, 
}

export const SearchInput = (prop: Props) =>
{
   return (
    <SearchInputBase sx={prop.sx}>
        {prop.children}
    </SearchInputBase>
   );
}