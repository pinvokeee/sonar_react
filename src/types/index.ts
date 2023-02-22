import { TemplateNode } from "../loader/templateLoader"


export type LoadingState = 
{
    isProgress: boolean,
    maximum: number,
    current: number,
    file: string,
}

export type SelectedTemplates = 
{
    node1: TemplateNode | undefined,
    node2: TemplateNode | undefined,
    node3: TemplateNode | undefined,
    contentNode: TemplateNode | undefined,
}