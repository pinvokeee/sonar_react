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
        // overflow: "auto",
    }
));


export const NodeListBox = (prop : INodeLIstBoxProp) =>
{ 
    const onChange = (event : any, targetNode : ITemplateNode) =>
    {
        prop.onChange?.call(this, targetNode);
    }


    return (
        // <ScrollPanel>
        <div style={{ overflow: "auto", boxSizing: "border-box" }} >
            {/* <List sx={{ overflow: "auto", boxSizing: "border-box" }} aria-label="secondary mailbox folder"> */}
                {
                    prop.targetNode != null ? prop.targetNode.children.map(el =>
                    {
                        return (                        
                            // <div style>
                                // {el.name}
                            // </div>
                            <ListItemButton sx={{ boxSizing: "border-box" }} disableRipple={true} onChange={ (event) => onChange(event, el) }>
                                { el.name }
                                {/* <ListItemText primaryTypographyProps={{ fontSize: "90%", }} primary={el.name} /> */}
                            </ListItemButton>
                        )
                    }) : <></>
                }
            {/* </List> */}
            </div>
        // </ScrollPanel>

    )
}