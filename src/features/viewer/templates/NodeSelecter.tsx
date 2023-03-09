import { useCallback, useEffect, useState } from 'react';
import { Accordion, AccordionSummary, Box, Button, List, ListItemButton, ListItemText, Paper, Stack, styled } from "@mui/material";
import { FileSystemTreeNode } from '../../../class/fileSystem/types';
import { FileSystemObject } from "../../../class/fileSystem/fileSystemObject";
import { FileObject } from '../../../controller/fileObject';
import { NodeSelecterItem } from './NodeSelecterItem';

export interface INodeLIstBoxProp
{
    handles: Map<string, FileSystemObject>,
    nodes: FileSystemTreeNode[],
    placeHolder?: string,
    filter?: (type: string) => boolean,
    onChange? : (selectedNode: FileSystemTreeNode) => void,
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
    const ns = FileObject.selectors.useFileNodesSelector();
    const actions = FileObject.useActions();

    const nodes = props.nodes;
    const handles = props.handles;
    const filter = props.filter;

    const filteredNodes = filter ? nodes.filter((value) => filter?.call(this, handles.get(value.path)?.kind as string)) : nodes;
    
    const act = (n: string) =>
    {
        const handle = ns.get(n);

        if (handle == undefined) return;

        console.log(n);

        // actions.load(handle).then((r) => 
        // {
        //     console.log(r);
        // });

        // console.log("AAA");
    }

    return (
        <div style={{ height: "100%", overflowWrap: 'anywhere', overflow: "auto", boxSizing: "border-box" }} >
        {
            filteredNodes.length > 0 ?
            
            <List aria-label="secondary mailbox folder">
            {
                filteredNodes.map((node) => <NodeSelecterItem objects={handles} targetNode={node} onChange={props.onChange} onClickAction={act}></NodeSelecterItem>)
            }

            </List> :
            <Placeholder>{props.placeHolder}</Placeholder>
        }
        </div>
    )
}
