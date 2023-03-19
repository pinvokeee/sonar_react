import { useCallback, useEffect, useState } from 'react';
import { Accordion, AccordionSummary, Box, Button, List, ListItemButton, ListItemText, Paper, Stack, styled } from "@mui/material";
import { FileSystemObject } from "../../../class/fileSystem/FileSystemObject";
import { fileObjectContoller, fileObjectContoller_odl } from '../../../controller/fileObjectContoller';
import { NodeSelecterItem } from './NodeSelecterItem';
import { FileSystemObjectMap } from '../../../class/fileSystem/FileSystemObjectMap';

export interface INodeLIstBoxProp
{
    handles: FileSystemObjectMap | undefined,
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
    }
));

export const NodeSelecter = (props : INodeLIstBoxProp) => {

    const ns = fileObjectContoller.useGetFileSysObjMap();
    const actions = fileObjectContoller.useActions();
    const handles = props.handles;

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
        handles.forEach((obj) =>  {

            const isSelected = props.selection ? props.selection == obj.getStringPath() : false;
            
            nodeItems.push(<NodeSelecterItem isSelected={isSelected}
                 fileSysObjMap={handles} 
                 targetFileSysObj={obj} 
                 onChange={props.onChange} 
                 onClickAction={act}></NodeSelecterItem>)
        });    
    }

    return (
        <div style={{ height: "100%", overflowWrap: 'anywhere', overflow: "auto", boxSizing: "border-box" }} >
        {
            nodeItems.length > 0 ?            
            <List aria-label="secondary mailbox folder">{nodeItems}</List> :
            <Placeholder>{props.placeHolder}</Placeholder>
        }
        </div>
    )
}
