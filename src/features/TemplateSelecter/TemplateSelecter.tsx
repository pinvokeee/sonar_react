import { Accordion, AccordionSummary } from "@mui/material";
import { useContext, useState } from "react";
import { templatesNodeContext } from "../../context/contextTemplates";
import { ITemplateDirectoryNode, ITemplateNode } from "../../types";

const getFirstNode = (node : ITemplateDirectoryNode) : ITemplateDirectoryNode | null =>
{
    if (node?.children == null) return null;
    return node.children[0];
}

export const TemplateSelecter = () =>
{
    const context = useContext(templatesNodeContext);
    const targetNode = context?.current as ITemplateDirectoryNode;
    const firstNode : ITemplateDirectoryNode | null = getFirstNode(targetNode);

    return (
        <div>
            {
                targetNode?.children?.map(n => 
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