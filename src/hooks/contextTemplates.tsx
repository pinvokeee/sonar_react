import { createContext, useContext, useState } from "react";
import { TemplateNode } from "../loader/templateLoader";
import { FileNode } from "../types";

export type HookTemplates = 
{
    templates: TemplateNode[],
    setTemplates: (t: TemplateNode[]) => void, 
}

export const useTemplates = () : HookTemplates =>
{
    const [templates, setTemplates] = useState<TemplateNode[]>([]);

    return {
        templates,
        setTemplates,
    }
}