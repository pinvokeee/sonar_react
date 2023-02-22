import { Directory } from "../class/fileSystem/directory";

export const repositoryActions = 
{
    registoryFolder: async () =>
    {
        Directory.asyncShowPickDialog().then(handle => 
        {   
            Directory.getAllFileEntriesAmount(handle).then(r =>
            {
                console.log(`amount: ${r}`);
            });

            Directory.loadFromHandle(handle, (e) => console.log(e)).then(e => 
            {
                console.log(e);
            });
        });

        // const dir = await currentDirectory.asyncPickDirectory();
        // const temp = await createTemplateTree(dir);
    
        // templates.setTemplates(temp);
    
    }
}

export const repositorySelecter = 
{
    get
}