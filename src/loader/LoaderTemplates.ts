import { ITemplateContentNode, ITemplateDirectoryNode, ITemplateNode } from "../types";

export class LoaderTemplates
{
    constructor()
    {
    }
    
    private createDirectoryNode(name : string) : ITemplateDirectoryNode
    {
        return {
            name : name,
            nodeType: "directory",
            children: [],
            parent : null,
        };
    } 

    private createContentNode(name : string) : ITemplateContentNode
    {
        return {
            name : name,
            nodeType: "content",
            content: "",
            parent : null,
        };
    } 

    /**
     * 渡されたディレクトリハンドルから読み込んだノードツリーを返す
     * @param handle 
     * @returns 
     */
    async loadFromDirectoryHandle(handle : FileSystemDirectoryHandle, onProgress? : (currentFile : string)  => void)
    {
        const topNode : ITemplateDirectoryNode = this.createDirectoryNode("top");

        return new Promise(async (resolve : (resultNode : ITemplateDirectoryNode) => void, reject) =>
        {
            await this.callLoadFromDirectoryHandle(handle, topNode, onProgress);
            resolve(topNode as ITemplateDirectoryNode);
        });
    }

    /**
     * loadFromDirectoryHandleの再帰関数（何をしているかわかりやすくするために分割）
     * @param handle 
     * @param parentNode 
     */
    async callLoadFromDirectoryHandle(handle : FileSystemDirectoryHandle, parentNode : ITemplateDirectoryNode, onProgress? : (currentFile : string) => void)
    {
        for await (const [name, value] of handle.entries())
        {
            if (value.kind == "directory")
            {
                if (onProgress != null) onProgress(value.name);

                const newNode : ITemplateDirectoryNode = this.createDirectoryNode(name);       
                newNode.parent = parentNode;
                parentNode.children?.push(newNode);

                await this.callLoadFromDirectoryHandle(value, newNode, onProgress);
            }
            else if (value.kind == "file")
            {
                const file = await value.getFile();
                if (onProgress != null) onProgress(file.name);

                const newNode : ITemplateContentNode = this.createContentNode(name);
                newNode.parent = parentNode;
                // newNode.content = await (file).text();
                // newNode.content = (file).name;

                parentNode.children?.push(newNode);
            }
        }
    }
}