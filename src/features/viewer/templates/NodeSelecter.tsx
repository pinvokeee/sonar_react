import { useCallback, useEffect, useState } from 'react';
import { Accordion, AccordionSummary, Box, Button, List, ListItemButton, ListItemText, Paper, Stack, styled } from "@mui/material";
import { FileSystemObject } from "../../../class/fileSystem/FileSystemObject";
import { fileObjectContoller_odl } from '../../../controller/fileObjectContoller';
import { NodeSelecterItem } from './NodeSelecterItem';
import { FileSystemObjectMap } from '../../../class/fileSystem/FileSystemObjectMap';

export interface INodeLIstBoxProp
{
    handles: FileSystemObjectMap | undefined,
    current: FileSystemObject | undefined,
    placeHolder?: string,
    // filter?: (obj: FileSystemObjectMap) => boolean,
    onChange? : (selectedNode: FileSystemObject) => void,
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
        color: 'lightgray',
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

export const NodeSelecter = (props : INodeLIstBoxProp) =>
{
    // const ns = fileObjectContoller_odl.selectors.useFileNodesSelector();
    // const actions = fileObjectContoller_odl.useActions();

    const handles = props.handles;
    // const filter = props.filter;

    // const filteredNodes = filter ? nodes.filter((value) => filter?.call(this, handles.get(value.path)?.kind as string)) : nodes;
    
    const act = (obj: FileSystemObject) =>
    {
        // const handle = ns.get(n);
        // if (handle == undefined) return;

        // actions.load(handle).then(r => 
        // {
        //     console.log(r);
        // });
    }

    const nodeItems: JSX.Element[] = [];

    if (handles != undefined) {
        handles.forEach((obj) =>  {
            nodeItems.push(<NodeSelecterItem fileSysObjMap={handles} targetFileSysObj={obj} onChange={props.onChange} onClickAction={act}></NodeSelecterItem>)
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
