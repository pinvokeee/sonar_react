import { Box, Button, ButtonGroup, IconButton, Menu, MenuItem, MenuList, Paper, Popper, styled, SxProps, Theme, Typography } from "@mui/material";
import React, { useState } from "react";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { FileObject } from "../../../controller/fileObject";
import { AnyAaaaRecord } from "dns";

type Props =
{
    children?: React.ReactNode,
    sx?: SxProps<Theme>, 

    items: any[],
    selectedItem: any,
    onGetText: (item: any) => string,
    onGetKey: (item: any) => string,
    onChange: (event: React.MouseEvent<HTMLLIElement, MouseEvent>, newValue: any) => void,
}

const Flex = styled("div")(({theme}) => 
(
    {
        display: "flex",
    }
));

type SplitButtonLabelProps = 
{
    text: string,
    onClick: (event: React.MouseEvent<HTMLElement>) => void,
}

const SplitButtonLabel = (props: SplitButtonLabelProps) =>
{
    return  <Typography onClick={props.onClick}  
    overflow={"hidden"}
    textOverflow={"ellipsis"}
    whiteSpace={"nowrap"} 
    color="inherit" 
    sx={{ userSelect: "none", textAlign: "left", margin: "auto 0 auto 0", cursor: "pointer" }}
    // sx={{ userSelect: "none", textAlign: "left", padding:"6px", cursor: "pointer" }}
    >
    {props.text}
    </Typography>
}

export const SplitButton = (props : Props) =>
{
    const [anchorRef, setAnchorRef] = React.useState<HTMLElement | null>(null);

    const handleMenu = (event: React.MouseEvent<HTMLElement>) => 
    {
        // event.stopPropagation();
        setAnchorRef(event.currentTarget);
    }

    const handleClose = (e: any) => 
    {
        // e.stopPropagation();
        setAnchorRef(null);
    }

    const selectionMenu = (event: React.MouseEvent<HTMLLIElement, MouseEvent>, newItem : any) =>
    {
        handleClose({});
        props.onChange(event, newItem);
    }

    return (
        <Flex sx={props.sx}>

            <SplitButtonLabel text={props.onGetText(props.selectedItem)} onClick={handleMenu}></SplitButtonLabel>
            <IconButton onClick={handleMenu} color="inherit">                
                <ArrowDropDownIcon color="inherit" />
            </IconButton>

            <Menu
                id="menu-appbar"
                anchorEl={anchorRef}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                keepMounted transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                open={Boolean(anchorRef)}                 
                onClose={handleClose} >
                    {
                        props.items.map((item, index) =>(
                        <MenuItem key={props.onGetKey(item)} onClick={(event) => selectionMenu(event, item) }>{props.onGetText(item)}</MenuItem>))
                    }
            </Menu>
        </Flex>
    )
}

export default SplitButton;