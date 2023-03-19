import { StyledComponent } from "@emotion/styled";
import { Divider, ExtendList, List, ListTypeMap, Pagination, Stack, styled } from "@mui/material";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { FileSystemObject } from "../../../../class/fileSystem/FileSystemObject";
import { FileSystemObjectMap } from "../../../../class/fileSystem/FileSystemObjectMap";
import { fileObjectContoller, fileObjectContoller_odl } from "../../../../controller/fileObjectContoller";
import { selectionController } from "../../../../controller/selectionController";
import { MatchObjectListItem } from "./MatchObjectListItem";

const Container = styled("div")(({theme}) =>
(
    {
        display: "grid",
        gridTemplateRows: "minmax(0, 1fr) auto",
        height: "100%",
    }
))

const ScrollList = styled(List)(({theme}) =>
(
    {
        width: "100%",
        // height: "100%",
        overflow: "auto",
    }
))

type Props =
{
    objectMap: FileSystemObjectMap,
    keyword: string,
    selectedPath: string,
    onClick: (fileObj: FileSystemObject, selectedIndex: number) => void,
    onKeyDown?: (e: React.KeyboardEventHandler<HTMLUListElement>) => void,
}

const pageItemMax = 20;

export const MatchObjectsList = (props: Props) =>
{    
    const onClick = useCallback((fileObj: FileSystemObject, index: number) => {
        props.onClick(fileObj, index);
    }, [])
    
    const scrollBox = useRef<any>();

    const [currentPage, setPage] = useState(0);

    const arr = props.objectMap;
    const h = Array.from(arr.values()).filter((value) => value.kind == "file");

    const pageCount = Math.round(h.length / pageItemMax) > 0 ? Math.round(h.length / pageItemMax) : 1;
    const start = ((currentPage) * pageItemMax);
    const end = start + pageItemMax < h.length ? start + pageItemMax : h.length;

    const listItem = h.slice((currentPage) * pageItemMax, end).map((fsObj, index) =>  {
        const path = fsObj.getStringPath();
        const isSelected = path == props.selectedPath;

        return <MatchObjectListItem key={path} isSelected={isSelected} index={index} keyword={props.keyword} onClick={onClick} fileObj={fsObj}></MatchObjectListItem>;
    });

    const onPageChange = useCallback((event: React.ChangeEvent<unknown>, page: number) => {
        scrollBox.current.scrollTop = 0;
        setPage(page - 1);
    }, []);

    const next = (current: string) =>
    {
        
    }

    // const setSelection = useCallback((newIndex: number) =>
    // {
    //     if (newIndex > h.length) return h.length;

    //     const fileObj = Array.from(h.values())[newIndex];
    //     onClick(fileObj, newIndex);

    //     return newIndex;
    // }, [])

    // const size = useMemo(() =>
    // {
    //     setSize(h.length);
    //     // console.log(h.length);
    //     setSelection(0);
    //     return h.length;

    // }, [currentSize]);



    return (
        <Container>
            <ScrollList ref={scrollBox} onKeyDown={(e) => 
            {
                e.preventDefault();

                // if (e.code == "ArrowDown") setSelectedIndex(index => setSelection(index + 1));

            }}>{listItem}</ScrollList>      
            <Pagination count={pageCount} onChange={onPageChange}/>      
        </Container>

    )
}