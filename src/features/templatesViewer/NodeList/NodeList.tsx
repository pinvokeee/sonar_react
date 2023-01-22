import { useCallback } from 'react';
import { Box, List, ListItemButton, ListItemText, Paper, styled } from "@mui/material";
import { FileNode } from "../../../types"

export interface INodeLIstBoxProp
{
    targetNode : FileNode,
    filter?: string,

    onChange? : (newValue : FileNode) => void,
}

export const ScrollPanel = styled("div")(({ theme }) => 
(
    {
        // overflow: "auto",
    }
));

const createTreeNode = (node: FileNode, onChangeEvent: any, filter?: string) =>
{
    // console.log(node);


    if (node == null) return <></>;
    
    const nodes = filter != null ? node.children?.filter(f => f.kind == filter) : node.children;


    if (nodes == null) return <></>

    return nodes.map(node => 
    {
        return (
        <ListItemButton 
            sx={{ boxSizing: "border-box" }} 
            disableRipple={true} 
            onChange={ () => onChangeEvent(node) }>
            {/* { el.name } */}
            {/* <ListItemText primaryTypographyProps={{ fontSize: "90%", }} primary={el.name} /> */}
            </ListItemButton>
        );
    });   
}

export const NodeListBox = (prop : INodeLIstBoxProp) =>
{ 
    const onChange = useCallback((event : any, targetNode : FileNode) => prop.onChange?.call(this, targetNode), []);
    
    // console.log(prop);

    return (
        // <ScrollPanel>
        <div style={{ overflow: "auto", boxSizing: "border-box" }} >
            {/* <List sx={{ overflow: "auto", boxSizing: "border-box" }} aria-label="secondary mailbox folder"> */}
                {
                    createTreeNode(prop.targetNode, onChange, prop.filter)
                    // prop.targetNode != null ? prop.targetNode.children?.map(el =>
                    // {
                    //     return (                        
                    //         // <div style>
                    //             // {el.name}
                    //         // </div>
                    //         <ListItemButton sx={{ boxSizing: "border-box" }} disableRipple={true} onChange={ (event) => onChange(event, el) }>
                    //             { el.name }
                    //             {/* <ListItemText primaryTypographyProps={{ fontSize: "90%", }} primary={el.name} /> */}
                    //         </ListItemButton>
                    //     )
                    // }) : <></>
                }
            {/* </List> */}
            </div>
        // </ScrollPanel>

    )
}
