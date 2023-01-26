import { useCallback } from 'react';
import { Box, List, ListItemButton, ListItemText, Paper, styled } from "@mui/material";
import { FileNode } from "../../../types"
import { TemplateNode } from '../../../loader/templateLoader';

export interface INodeLIstBoxProp
{
    nodes: TemplateNode[],
    targetNode? : TemplateNode | null,
    filter?: string,

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


    if (node == null) return <></>;
    
    const nodes = filter != null ? node.children?.filter(f => f.type == filter) : node.children;


    if (nodes == null) return <></>

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
    const onChange = useCallback((event : any, targetNode : TemplateNode) => prop.onChange?.call(this, targetNode), []);
    
    // console.log(prop);

    return (
        // <ScrollPanel>
        <div style={{ overflow: "auto", boxSizing: "border-box" }} >
            <List sx={{ overflow: "auto", boxSizing: "border-box" }} aria-label="secondary mailbox folder">
                {
                    prop.nodes.map(n => 
                    {
                        return <ListItemButton 
                        key={n.name}
                        sx={{ boxSizing: "border-box" }} 
                        disableRipple={true} 
                        onClick={(e) => prop.onChange?.call(this, n)}
                        >
                        { n.name }   
                        </ListItemButton>
                    })

                    // prop.targetNode != null ? createTreeNode(prop.targetNode, onChange, prop.filter) : <></>
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
            </List>
            </div>
        // </ScrollPanel>

    )
}
