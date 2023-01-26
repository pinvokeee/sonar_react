import { useCallback, useEffect, useState } from 'react';
import { Box, List, ListItemButton, ListItemText, Paper, styled } from "@mui/material";
import { FileNode } from "../../../types"
import { TemplateNode } from '../../../loader/templateLoader';

export interface INodeLIstBoxProp
{
    nodes: TemplateNode[] | undefined,
    targetNode? : TemplateNode | undefined,
    filter?: (type: string) => boolean,

    onChange? : (newValue : TemplateNode) => void,
}

export const ScrollPanel = styled("div")(({ theme }) => 
(
    {
        // overflow: "auto",
    }
));

const createTreeNode = (node: TemplateNode, onChangeEvent: any, filter?: string) =>
{
    // console.log(node);


    if (node == undefined) return <></>;
    
    const nodes = filter != undefined ? node.children?.filter(f => f.type == filter) : node.children;


    if (nodes == undefined) return <></>

    return nodes.map(node => 
    {
        return (
        <ListItemButton 
            sx={{ boxSizing: "border-box" }} 
            disableRipple={true} 
            onChange={ () => onChangeEvent(node) }>
            { node.name }
            {/* <ListItemText primaryTypographyProps={{ fontSize: "90%", }} primary={el.name} /> */}
            </ListItemButton>
        );
    });   
}

export const NodeListBox = (prop : INodeLIstBoxProp) =>
{
    const onChange = useCallback((event : any, targetNode : TemplateNode) => 
    {
        prop.onChange?.call(this, targetNode);
    }, []);

    const nodes = prop.filter != undefined ? prop.nodes?.filter(n => prop.filter?.call(this, n.type)) : prop.nodes;

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
                        selected={ n == prop.targetNode }
                        >
                        { n.name }   
                        </ListItemButton>
                    })
                }
            </List>
        </div>
    )
}
