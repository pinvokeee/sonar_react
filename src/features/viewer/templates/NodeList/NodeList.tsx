import { useCallback, useEffect, useState } from 'react';
import { Box, Button, List, ListItemButton, ListItemText, Paper, styled } from "@mui/material";
import { reloadTemplateData, TemplateNode } from '../../../../loader/templateLoader';
import { useTemplates } from '../../../../hooks/contextTemplates';
import { useTemplates2 } from '../../../../hooks/useLoader';
import { FileSystemNode } from '../../../../class/fileSystem/types';
import { handleNodes } from '../../../../controller/handleNodes';

export interface INodeLIstBoxProp
{
    // targetNode? : TemplateNode | undefined,
    // selectedNode: TemplateNode | undefined,
    filter?: (type: string) => boolean,
    handleNodes: FileSystemNode[],
    // onChange? : (newValue : TemplateNode) => void,
}

export const ScrollPanel = styled("div")(({ theme }) => 
(
    {
        // overflow: "auto",
    }
));

export const NodeListBox = (prop : INodeLIstBoxProp) =>
{
    // const templatesHook = useTemplates2();

    const ns = handleNodes.selectors.useFileNodesSelector();
    const actions = handleNodes.useActions();

    const nodes = prop.handleNodes;
    const filter = prop.filter;
    const filteredNodes = filter ? nodes.filter(n => filter?.call(this, n.kind)) : nodes;

    const act = (n: FileSystemNode) =>
    {
        actions.loadFile(n).then((r) => 
        {
            // console.log(r);
        });
    }

    return (
        <div style={{ height: "100%", overflowWrap: 'anywhere', overflow: "auto", boxSizing: "border-box" }} >
            <List aria-label="secondary mailbox folder">
                {
                    filteredNodes.map(n => 
                    {
                        return <ListItemButton 
                        key={n.path}
                        sx={{ boxSizing: "border-box" }} 
                        disableRipple={true} 
                        >
                        { n.name }
                        <Button onClick={ () => act(n) }>aaa</Button>
                        </ListItemButton>
                    })
                }
            </List>
        </div>
    )
}
