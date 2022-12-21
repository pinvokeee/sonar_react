import { Accordion, AccordionSummary } from "@mui/material";
import { useContext, useState } from "react";
import { templatesNodeContext } from "../../context/contextTemplates";

const getFirstNode = (node : any) : any | null =>
{
    if (node?.children == null) return null;
    return node.children[0];
}

export const TemplateSelecter = () =>
{
    const context = useContext(templatesNodeContext);
    const targetNode = context?.current as any;
    const firstNode : any | null = getFirstNode(targetNode);

    return (
        <div>
            {
                targetNode?.children?.map((n : any) => 
                {
                    return (
                        <Accordion defaultExpanded={true}>
                        <AccordionSummary>{n?.name}</AccordionSummary>
                        </Accordion>
                    );
                })
            }

        </div>
    );
}