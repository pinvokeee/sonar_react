import { useCallback, useEffect, useState } from 'react';
import { Box, Button, List, ListItemButton, ListItemText, Paper, styled } from "@mui/material";
import { reloadTemplateData, TemplateNode } from '../../../../loader/templateLoader';
import { useTemplates } from '../../../../hooks/contextTemplates';
import { useTemplates2 } from '../../../../hooks/useLoader';

export interface INodeLIstBoxProp
{
    targetNode? : TemplateNode | undefined,
    selectedNode: TemplateNode | undefined,
    filter?: (type: string) => boolean,
    onChange? : (newValue : TemplateNode) => void,
}

export const ScrollPanel = styled("div")(({ theme }) => 
(
    {
        // overflow: "auto",
    }
));

export const NodeListBox = (prop : INodeLIstBoxProp) =>
{
    const templatesHook = useTemplates2();

    const filter = prop.filter;
    const node = prop.targetNode;
    const children = node?.children;

    const nodes = filter ? children?.filter(n => filter?.call(this, n.type)) : children;

    const onChange = useCallback((event : any, targetNode : TemplateNode) => 
    {
        prop.onChange?.call(this, targetNode);
        
    }, []);

    return (
        <div style={{ height: "100%", overflowWrap: 'anywhere', overflow: "auto", boxSizing: "border-box" }} >
            <List aria-label="secondary mailbox folder">
                {
                    nodes?.map(n => 
                    {
                        return <ListItemButton 
                        key={n.fullName}
                        sx={{ boxSizing: "border-box" }} 
                        disableRipple={true} 
                        onClick={(e) => onChange(e, n)}
                        selected={ n == prop.selectedNode }
                        >
                        { n.name }
                        <Button onClick={ () => templatesHook.reload(n) }>aaa</Button>
                        </ListItemButton>
                    })
                }
            </List>
        </div>
    )
}
