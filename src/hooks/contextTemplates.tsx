import { createContext, useContext } from "react";
import { FileNode } from "../types";
import { useTemplates } from "./useTemplates";

type TemplatesContext = 
{
    fileNode: FileNode,
}

export const TemplatesContext = createContext<TemplatesContext>(
    {
        fileNode: {
            name: "",
            kind: "directory",
            parent: null,
        },
    }
);

export const TemplatesProvider = (fileNode : FileNode) =>
{
    // const store = useContext(TemplatesContext);
    const store = useTemplates({ TopFileNode: fileNode });

    store.nodes

    return <>
        <TemplatesContext.Provider value={store}>
            
        </TemplatesContext.Provider>
    </>;
}