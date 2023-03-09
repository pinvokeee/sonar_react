import { useMemo, useState } from "react";
import { FileSystemObject } from "../../../class/fileSystem/fileSystemObject";
import { FileObject } from "../../../controller/fileObject";
import { selection } from "../../../controller/selectedNodes";
import { ObjectViewer } from "./ObjectViewer";

export const ObjectViewerWrap = () =>
{
    const selectedNodes = selection.selectors.useGetSelectionTreeNode();

    const actions = FileObject.useActions();
    const [handle, setHandle] = useState<FileSystemObject | undefined>();

    const h = useMemo(() => 
    {
        if (selectedNodes[3] == undefined) return;

        actions.getFileObject(selectedNodes[3].path).then(h =>            
        {
            setHandle(h);    
        });
        
    }, [selectedNodes[3]])

    // useEffect(() =>
    // {
    //     if (selectedNodes[3] == undefined) return;

    //     actions.getFileObject(selectedNodes[3].path).then(h =>            
    //     {
    //         setHandle(h);    
    //     });

    // }, [selectedNodes[3]]);

    return <ObjectViewer object={handle}></ObjectViewer>

}