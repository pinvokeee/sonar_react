import { Button, ButtonGroup, IconButton, Menu, MenuItem, MenuList, Paper, Popper, Typography } from "@mui/material";
import React, { useState } from "react";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

interface SplitButtonProps
{
    options : string[],
    onChangeSelectedIndex? : (selectedIndex : number) => void,
}

export const SplitButton = (props : SplitButtonProps) =>
{
    const [anchorRef, setAnchorRef] = React.useState<HTMLElement | null>(null);
    const [selectedIndex, setSelectedIndex] = useState<number>(0);

    const handleMenu = (event: React.MouseEvent<HTMLElement>) => setAnchorRef(event.currentTarget)
    const handleClose = () => setAnchorRef(null);

    const selectionMenu = (newIndex : number) =>
    {
        setSelectedIndex(newIndex);
        handleClose();

        props.onChangeSelectedIndex?.call(this, newIndex);
    }

    return (
        <React.Fragment>
            {/* <ButtonGroup color="inherit">
                <Button color="inherit" sx={{ width: 250, textTransform : "none" }}>{props.options[selectedIndex]}</Button>
                <Button size="small" onClick={handleMenu}>
                    <ArrowDropDownIcon color="inherit" />
                </Button>
            </ButtonGroup> */}
            
            <Typography onClick={handleMenu} color="inherit" sx={{ cursor: "pointer" }}>{props.options[selectedIndex]}</Typography>    
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
                        props.options.map((name, index) =>(
                        <MenuItem 
                        key={name} 
                        selected={index == selectedIndex} 
                        onClick={(event) => selectionMenu(index) }>{name}</MenuItem>))
                    }
            </Menu>

        </React.Fragment>
    )
}

export default SplitButton;