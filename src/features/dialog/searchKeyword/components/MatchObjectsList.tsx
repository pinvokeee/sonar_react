import { FileSystemObject } from "../../../../class/fileSystem/fileSystemObject";
import { FileObject } from "../../../../controller/fileObject";
import { selection } from "../../../../controller/selectedNodes";
import { MatchObjectListItem } from "./MatchObjectListItem";

type Props =
{
    objects: Map<string, FileSystemObject>,
    keyword: string,
}

export const MatchObjectsList = (props: Props) =>
{    
    const objects = Array.from(props.objects);

    const select = selection.selectors.useGetSelectionPaths();
    const h = FileObject.selectors.useSearchFromKeyword(props.keyword, select[1] as string);

    console.log(h);

    return (
        <>
        {
            h.map((obj) =>
            {
                return <MatchObjectListItem path={obj.getStringPath()}></MatchObjectListItem>
            })
        }
        </>
    )
}