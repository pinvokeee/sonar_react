import { Box, List, ListItemButton, ListItemText, Paper, styled } from "@mui/material";
import { ITemplateNode } from "../../../types"

export interface INodeLIstBoxProp
{
    targetNode : ITemplateNode,
    onChange? : (newValue : ITemplateNode) => void,
}


export const ScrollPanel = styled("div")(({ theme }) => 
(
    {
        overflow: "auto",
    }
));


export const NodeListBox = (prop : INodeLIstBoxProp) =>
{ 
    const onChange = (event : any, targetNode : ITemplateNode) =>
    {
        prop.onChange?.call(this, targetNode);
    }

    return (
        <ScrollPanel>
            <List component="nav" aria-label="secondary mailbox folder">
                {
                    prop.targetNode != null ? prop.targetNode.children.map(el =>
                    {
                        return (                        
                            <ListItemButton disableRipple={true} onChange={ (event) => onChange(event, el) }>
                                <ListItemText primaryTypographyProps={{ fontSize: "90%", }} primary={el.name} />
                            </ListItemButton>
                        )
                    }) : <></>
                }
            </List>
        </ScrollPanel>

    )
}