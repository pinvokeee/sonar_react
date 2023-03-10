import { ITemplateNode } from "../types";

export class LoaderTemplates
{
    constructor()
    {
    }
    
    private createDirectoryNode(name : string) : ITemplateNode
    {
        return {
            name : name,
            nodeType: "directory",
            children: [],
            content: null,
            parent : null,
        };
    } 

    private createContentNode(name : string) : ITemplateNode
    {
        return {
            name : name,
            nodeType: "content",
            children: [],
            content: "",
            parent : null,
        };
    }

    /**
     * 子ノードを再帰で走査して親ノードを割り当てる
     * @param node 対象の親ノード
     */
    rootingParentNode = (node : ITemplateNode) =>
    {
        if (node.children == null) return ;

        for (const n of node.children)
        {
            n.parent = node;
            if (n.nodeType == "directory") this.rootingParentNode(n);
        }
    }

    /**
     * 渡されたディレクトリハンドルから読み込んだノードツリーを返す
     * @param handle 
     * @returns 
     */
    async loadFromDirectoryHandle(
        handle : FileSystemDirectoryHandle, 
        onProgress? : (currentFile : string)  => void, 
        onGotMaxCount? : (count : number) => void)
    {
        const topNode : ITemplateNode = this.createDirectoryNode("top");

        this.getEntriesCountFromDirectoryHandle(handle).then(c => onGotMaxCount?.call(this, c));

        return new Promise(async (resolve : (resultNode : ITemplateNode) => void, reject) =>
        {
            // const templatesFolderHandle = await handle.getDirectoryHandle("テンプレート");

            await this.callLoadFromDirectoryHandle(handle, topNode, "", onProgress);
            this.rootingParentNode(topNode);

            resolve(topNode as ITemplateNode);
        });
    }

    /**
     * loadFromDirectoryHandleの再帰関数（何をしているかわかりやすくするために分割）
     * @param handle 
     * @param parentNode 
     */
    async callLoadFromDirectoryHandle(
        handle : FileSystemDirectoryHandle, 
        parentNode : ITemplateNode, 
        currentPath? : string, 
        onProgress? : (currentFile : string) => void)
    {
        let ccount = 0;

        for await (const [name, value] of handle.entries())
        {
            if (value.kind == "directory")
            {
                const newNode : ITemplateNode = this.createDirectoryNode(name);       
                newNode.parent = parentNode;
                parentNode.children?.push(newNode);

                await this.callLoadFromDirectoryHandle(value, newNode, currentPath + "/" + name, onProgress);
            }
            else if (value.kind == "file")
            {
                const file = await value.getFile();

                onProgress?.call(this, currentPath + "/" + file.name);

                const newNode : ITemplateNode = this.createContentNode(name);
                newNode.parent = parentNode;
                newNode.content = await (file).text();
                newNode.content = (file).name;

                parentNode.children?.push(newNode);

                ccount++;
            }
        }
    }

    /**
     * ファイル数カウント用
     * @param handle 
     * @returns 
     */
    async getEntriesCountFromDirectoryHandle(handle : FileSystemDirectoryHandle)
    {
        return new Promise(async (resolve : (resultCount : number) => void, reject) =>
        {
            let count = 0;
            await this.callGetEntriesCountFromDirectoryHandle(handle, () =>  count++ );
            resolve(count);
        });
    }

    async callGetEntriesCountFromDirectoryHandle(handle : FileSystemDirectoryHandle, progress : (count : number) => void)
    {
        for await (const [name, value] of handle.entries())
        {
            if (value.kind == "directory")
            {
                await this.callGetEntriesCountFromDirectoryHandle(value, progress);
            }
            else if (value.kind == "file")
            {
                progress?.call(this, 1);
            }
        }
    }
}