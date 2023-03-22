import { useCallback, useEffect, useState } from 'react';
import { Accordion, AccordionSummary, Box, Button, List, ListItemButton, ListItemText, Paper, Stack, styled } from "@mui/material";
import { FileSystemObject } from "../../../class/fileSystem/FileSystemObject";
import { fileObjectContoller, fileObjectContoller_odl } from '../../../controller/fileObjectContoller';
import { ExplorerItem } from './ExplorerItem';
import { FileSystemObjectMap } from '../../../class/fileSystem/FileSystemObjectMap';

export interface ExplorerProps
{
    pathes: string[] | undefined,
    current: FileSystemObject | undefined,
    placeHolder?: string,
    onChange? : (selectedNode: FileSystemObject) => void,
    selection?: string,
}

export const ScrollPanel = styled("div")(({ theme }) => 
(
    {
        // overflow: "auto",
    }
));

const Placeholder = styled("div")(({ theme }) =>
(
    {
        color: theme.palette.text.disabled,
        fontWeight: "bold",
        fontSize: "20pt",
        height: "100%",
        width: "100%",
        display: "flex",
        alignItems: 'center',
        textAlign: "center",
        justifyContent: "center",
        userSelect: "none",
        backgroundColor: "inherit",
    }
));

const ObjectList = styled(List)(({ theme }) =>
(
    {
        // backgroundColor: theme.palette.primary.light,
        // backgroundColor: "inherit",
    }
));

export const Explorer = (props : ExplorerProps) => {

    const ns = fileObjectContoller.useGetFileSysObjMap();
    const actions = fileObjectContoller.useActions();
    const handles = props.pathes;

    const act = (obj: FileSystemObject) =>
    {
        const handle = ns.get(obj.getStringPath());
        // if (handle == undefined) return;

        handle?.load().then(h => {
            actions.assign(new FileSystemObjectMap(ns));
        });
    }

    const nodeItems: JSX.Element[] = [];

    if (handles != undefined) {
        handles.forEach((path) =>  {

            const obj = ns.get(path) as FileSystemObject;
            const isSelected = props.selection ? props.selection == obj.getStringPath() : false;
            
            nodeItems.push(<ExplorerItem isSelected={isSelected}
                 fileSysObjMap={ns} 
                 targetFileSysObj={obj} 
                 onChange={props.onChange} 
                 onClickAction={act}></ExplorerItem>)
        });    
    }

    return (
        <div style={{ height: "100%", overflowWrap: 'anywhere', overflow: "auto", boxSizing: "border-box" }} >
        {
            nodeItems.length > 0 ?            
            <ObjectList aria-label="secondary mailbox folder">{nodeItems}</ObjectList> :
            <Placeholder>{props.placeHolder}</Placeholder>
        }
        </div>
    )
}
