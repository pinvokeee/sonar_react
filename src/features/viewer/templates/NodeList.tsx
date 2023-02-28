import { useCallback, useEffect, useState } from 'react';
import { Box, Button, List, ListItemButton, ListItemText, Paper, styled } from "@mui/material";
import { FileSystemHandleData, FileSystemNode } from '../../../class/fileSystem/types';
import { NodeHook } from '../../../controller/node';

export interface INodeLIstBoxProp
{
    handles: Map<string, FileSystemHandleData>,
    nodes: FileSystemNode[],
    filter?: (type: string) => boolean,
    onChange? : (selectedNode: FileSystemNode) => void,
}

export const ScrollPanel = styled("div")(({ theme }) => 
(
    {
        // overflow: "auto",
    }
));

export const NodeListBox = (props : INodeLIstBoxProp) =>
{
    // const templatesHook = useTemplates2();

    const ns = NodeHook.selectors.useFileNodesSelector();
    const actions = NodeHook.useActions();

    const nodes = props.nodes;
    const handles = props.handles;
    const filter = props.filter;

    const filteredNodes = filter ? nodes.filter((value) => filter?.call(this, handles.get(value.path)?.kind as string)) : nodes;
    
    const act = (n: string) =>
    {
        // actions.loadFile(n).then((r) => 
        // {
        //     // console.log(r);
        // });
    }

    return (
        <div style={{ height: "100%", overflowWrap: 'anywhere', overflow: "auto", boxSizing: "border-box" }} >
            <List aria-label="secondary mailbox folder">
                {
                    filteredNodes.map((value) => 
                    {
                        return <ListItemButton 
                        key={value.path}
                        sx={{ boxSizing: "border-box" }} 
                        disableRipple={true} 
                        onClick={() => props.onChange?.call(this, value)}
                        >
                        { helper.getText(handles, value.path) }
                        <Button sx={{ marginLeft: "auto", }} onClick={ () => act(value.path) }>R</Button>
                        </ListItemButton>
                    })
                }
            </List>
        </div>
    )
}

const helper = 
{
    getText: (handles: Map<string, FileSystemHandleData>, path: string) => 
    {
        const item = handles.get(path);
        if (item == undefined) return "";
        if (item.kind == 'directory') return item.name;
        if (item.kind == 'file') return item.file?.name;
    }
}