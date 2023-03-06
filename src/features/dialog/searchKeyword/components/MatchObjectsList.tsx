import { FileSystemObject } from "../../../../class/fileSystem/FileSystemObject";
import { FileObject } from "../../../../controller/fileObject";
import { MatchObjectListItem } from "./MatchObjectListItem";

type Props =
{
    objects: Map<string, FileSystemObject>,
}

export const MatchObjectsList = (props: Props) =>
{    
    const objects = Array.from(props.objects);

    // console.log("AAA");

    return (
        <>
        {
            objects.map(([key, obj]) =>
            {
                return <MatchObjectListItem path={key}></MatchObjectListItem>
            })
        }
        </>
    )

    // return (
    // { 
    //     // Array.from(props.objects).map(([key, obj]) =>
    //     //     {
    //     //         const [path, handle] = h;

    //     //         // if (handle.kind == "directory" || handle.file == undefined) return undefined; 
    //     //         // if (handle.file.extension != "txt") return undefined;

    //     //         // // if (handle.file.content.binary == undefined) acitons.loadFile(handle);
                
    //     //         // if (utf8_decoder.decode(handle.file.content.binary).indexOf(keyword) > -1)
    //     //         // {
    //     //         //     return <div>{ handle.file.name }</div>
    //     //         // }
    //     //         return <></>;

    //     //     }).filter(h => h != undefined)
    // });
}