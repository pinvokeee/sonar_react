import { createContext, useContext, useState } from "react";
import { TemplateNode } from "../loader/templateLoader";
import { FileNode } from "../types";

export type HookTemplates = 
{
    templates: TemplateNode[],
    setTemplates: (t: TemplateNode[]) => void, 

    node1: TemplateNode | null,
    node2: TemplateNode | null,
    node3: TemplateNode | null,

    setNode1: (t: TemplateNode | null) => void,
    setNode2: (t: TemplateNode | null) => void,
    setNode3: (t: TemplateNode | null) => void, 
}

export const useTemplates = () : HookTemplates =>
{
    const [templates, setTemplates] = useState<TemplateNode[]>([]);
    const [node1, setNode1] = useState<TemplateNode | null>(null);
    const [node2, setNode2] = useState<TemplateNode | null>(null);
    const [node3, setNode3] = useState<TemplateNode | null>(null);

    return {
        templates,
        setTemplates,
        node1, node2, node3,
        setNode1, setNode2, setNode3,
    }
}