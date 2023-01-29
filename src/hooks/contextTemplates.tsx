import { createContext, useContext, useReducer, useState } from "react";
import { TemplateNode } from "../loader/templateLoader";
import { FileNode } from "../types";

export type HookTemplates = 
{
    templates: TemplateNode[],
    setTemplates: (t: TemplateNode[]) => void, 

    node1: TemplateNode | undefined,
    node2: TemplateNode | undefined,
    node3: TemplateNode | undefined,
    selectedTemplate: TemplateNode | undefined,

    setNode1: (t: TemplateNode | undefined) => void,
    setNode2: (t: TemplateNode | undefined) => void,
    setNode3: (t: TemplateNode | undefined) => void, 
    setSelectedTemplate: (t: TemplateNode | undefined) => void, 

    selectionNodes: TemplateNode[],
    setNode: (t: TemplateNode[], index: number) => void, 
}

type SelectionNode = 
{
    node1: TemplateNode | undefined,
    node2: TemplateNode | undefined,
    node3: TemplateNode | undefined,
    node4: TemplateNode | undefined,
}

export const useTemplates = () : HookTemplates =>
{
    const [templates, setTemplates] = useState<TemplateNode[]>([]);
    const [node1, _setNode1] = useState<TemplateNode | undefined>(undefined);
    const [node2, _setNode2] = useState<TemplateNode | undefined>(undefined);
    const [node3, _setNode3] = useState<TemplateNode | undefined>(undefined);

    const [selectionNodes, setSelectionNode] = useState<TemplateNode[]>([]);

    const [selectedTemplate, setSelectedTemplate] = useState<TemplateNode | undefined>(undefined);

    const setNode = (selection: TemplateNode[], index: number) =>
    {
        
    }

    const setNode1 = (node: TemplateNode | undefined) =>
    {    
        // if (node == node1) return ;

        console.log(this);

        _setNode1(node);
        // _setNode2(undefined);
        // _setNode3(undefined);
        // setSelectedTemplate(undefined);
    }

    const setNode2 = (node: TemplateNode | undefined) =>
    {
        if (node == node2) return ;

        _setNode2(node);
        _setNode3(undefined);
        setSelectedTemplate(undefined);
    }

    const setNode3 = (node: TemplateNode | undefined) =>
    {
        console.log("AA");
        if (node == node3) return ;

        _setNode3(node);
        setSelectedTemplate(undefined);
    }

    return {
        templates,
        setTemplates,
        node1, node2, node3, selectedTemplate,
        setNode1, setNode2, setNode3, setSelectedTemplate,
        selectionNodes, setNode,
    }
}