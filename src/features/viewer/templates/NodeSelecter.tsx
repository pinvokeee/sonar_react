import { useCallback, useEffect, useState } from 'react';
import { Accordion, AccordionSummary, Box, Button, List, ListItemButton, ListItemText, Paper, Stack, styled } from "@mui/material";
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

export const NodeSelecter = (props : INodeLIstBoxProp) =>
{
    const ns = NodeHook.selectors.useFileNodesSelector();
    const actions = NodeHook.useActions();

    const nodes = props.nodes;
    const handles = props.handles;
    const filter = props.filter;

    const filteredNodes = filter ? nodes.filter((value) => filter?.call(this, handles.get(value.path)?.kind as string)) : nodes;
    
    const act = (n: string) =>
    {
        const handle = ns.get(n);

        if (handle == undefined) return;

        actions.loadFile(handle).then((r) => 
        {
            console.log(r);
        });
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
                        <Button sx={{ marginLeft: "auto", }} onClick={ () => act(value.path) }>{helper.getFileType(handles, value.path)}</Button>
{/* 
                        <Stack>
                            <Box>
                                { helper.getText(handles, value.path) }
                               <Button sx={{ marginLeft: "auto", }} onClick={ () => act(value.path) }>R</Button>
                            </Box>
                            <Button >{ helper.getFileType(handles, value.path) } </Button>
                        </Stack> */}

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
    },

    getFileType: (handles: Map<string, FileSystemHandleData>, path: string) => 
    {
        const item = handles.get(path);

        if (item?.kind == 'directory') return "フォルダ";
        if (item?.kind == "file") return `${item.file?.extension.toUpperCase()}`;
    }
}