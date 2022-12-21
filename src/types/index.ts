export interface ITemplateNode
{
    name: string;
    nodeType?: string;
    parent : ITemplateNode | null;
}

export interface ITemplateDirectoryNode extends ITemplateNode
{
    children?: ITemplateNode[];
}

export interface ITemplateContentNode extends ITemplateNode
{
    content : string;
}
