import { useEffect, useState } from "react";
import { FileSystemObject } from "../../../../class/fileSystem/fileSystemObject";
import { FileObject } from "../../../../controller/fileObject";

type Props =
{
    path: string,
}

export const MatchObjectListItem = (props: Props) =>
{
    const actions = FileObject.useActions();
    const [handle, setHandle] = useState<FileSystemObject>();

    // useEffect(() =>
    // {
    //     (async () =>
    //     {
    //         const h = await actions.getFileObject(props.path);

    //         // console.log(h);

    //     })();

    //     // await actions.getFileObject(props.path).then(h =>            
    //     // {
    //     //     if (h == undefined) return;
    //     //     console.log(h);
    //     //     setHandle(h);
    //     // });

    // }, []);

    return <></>;
}