export interface ITemplateNode
{
    name: string;
    nodeType: "directory" | "content";
    parent : ITemplateNode | null;
    children: ITemplateNode[];
    content : string | null;
}

// export interface ITemplateDirectoryNode extends ITemplateNode
// {
//     children: ITemplateNode[];
// }

// export interface ITemplateContentNode extends ITemplateNode
// {

// }
