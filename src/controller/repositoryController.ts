import { useEffect, useState } from "react";
import { useCallback } from "react";
import { selector, selectorFamily, useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { Directory } from "../class/fileSystem/_directory";
import { FileInfo } from "../class/fileSystem/fileInfo";
import { FileSystemObject } from "../class/fileSystem/FileSystemObject";
import { FileSystemTreeNode } from "../class/fileSystem/types";
import { IndexedDBUtil } from "../class/indexeddb/indexeddb";
import { DialogNames } from "../define/names/dialogNames";
import { AtomDialogState, AtomFileObjects, AtomRepositoryHandleList, AtomRepositoryLoadingState } from "../define/recoil/atoms";
import { selectorKeys } from "../define/recoil/keys";
import { generateUuid } from "../util/util";
import { fileObjectContoller, fileObjectContoller_odl } from "./fileObjectContoller";

export type RepositoryHandleItem =
{
    key: string,
    modified: Date,
    handle: FileSystemDirectoryHandle,
}

export type RepositoryLoadingState =
{
    progress: number,
    maximum: number,
    currentNode: string,
}

enum StoreName
{
    Repository = "repos",
}

export const repositoryController =
{
    useActions: () =>
    {
        const setDialogState = useSetRecoilState(AtomDialogState);
        const setItems = useSetRecoilState(AtomRepositoryHandleList);
        // const setFileNodes = useSetRecoilState(AtomHandleNodes);
        const setLoadingState = useSetRecoilState(AtomRepositoryLoadingState);

        // const nodeActions = fileObjectContoller_odl.useActions();

        const actions = fileObjectContoller.useActions();

        return {

            selectionRepository: useCallback(() => {
                setDialogState( { name: DialogNames.ReSelectRepository } );
            }, []),

            closeSelectionRepository: useCallback(() => {
                setDialogState( { name: DialogNames.Empty } );
            }, []),

            registRepository: useCallback(() => {
                Directory.asyncShowPickDialog().then(handle => 
                {
                    IndexedDB.addItem<RepositoryHandleItem>(StoreName.Repository, { key: generateUuid(), modified: new Date(), handle })
                    .then(item =>
                    {
                        setItems((items) => [...items, item]);
                    });
                })
    
            }, []),
           
            deleteRepository: useCallback((item: RepositoryHandleItem) =>
            {
                IndexedDB.removeItem(StoreName.Repository, item.key).then(r =>
                {
                    setItems((list) => list.filter((i) => i.key != item.key));
                });
    
            }, []),

            loadRepository: useCallback((item: RepositoryHandleItem) =>
            {
                let count = 0;

                const targetFileTypes = Array.from(FileInfo.registedFileTypes().keys());
                const onFilter = (obj: FileSystemObject) : boolean => repositoryHelper.isReadTargetFile(targetFileTypes, obj);

                const load = (handle: FileSystemDirectoryHandle) =>
                {
                    setDialogState( { name: DialogNames.LoadingRepository });

                    Directory.getAllFileEntriesAmount(handle, onFilter).then(maximum => {
                        setLoadingState((st) => ({ ...st, maximum }))
                    });
                    
                    Directory.readFromHandle(handle, true, (e) => {
                        if (e.kind == "file") setLoadingState((st) => ({ ...st, progress: count++, currentNode: `${e.path}` }));
                    }, onFilter)
                    .then(e => {

                        // actions.assign(m);

                        // setFileNodes(e);
                        setDialogState( { name: DialogNames.Empty });
                    });
                }

                setLoadingState({ currentNode: "", maximum: 0, progress: 0 });

                item.handle.queryPermission({ mode: "readwrite" }).then(result =>
                {
                    if (result != "granted") 
                    {
                        item.handle.requestPermission({ mode: "readwrite" }).then(result =>
                        {
                            if (result == "granted") load(item.handle);
                        })
                    }
                    else if (result == "granted") load(item.handle);
                })

            }, [])
        }
    },

    selector:
    {
        useGetRegistedHandleItems: () =>
        {
            const [items, setItems] = useRecoilState(AtomRepositoryHandleList); 

            useEffect(() => {
                (async ()=> 
                {
                    const gitems = (await IndexedDB.getAllItems<RepositoryHandleItem>(StoreName.Repository))
                    .sort((a: RepositoryHandleItem, b: RepositoryHandleItem) => 
                    {
                        if (a.modified.getTime() < b.modified.getTime()) return -1;
                        if (a.modified.getTime() > b.modified.getTime()) return 1;
                        return 0;
                    });
    
                    setItems(gitems);
                })()
            }, []);
    
            return items;
        }
    }
}

const repositoryHelper =
{
    isReadTargetFile: (allowFileExtensions: string[], targetFileObject: FileSystemObject) =>
    {

        /*読み込み対象の拡張子のファイル以外は弾く*/
        if (targetFileObject.kind == "directory") return true;
        if (targetFileObject.kind == "file")
        {
            const finfo = targetFileObject.fileInfo as FileInfo;

            if (finfo.extension != "" && allowFileExtensions.indexOf(finfo.extension) > -1)  return true;
        }

        return false;
    }
}

export const repositoryLoadingStateSelector = 
{
    useCurrentState: () => 
    {
        const state = useRecoilValue(AtomRepositoryLoadingState); 
        return state;
    },
}

/**
 * indexedDBからストア'repos'を作成しておく
 */
const IndexedDB: IndexedDBUtil = new IndexedDBUtil("sonar", 1);
IndexedDB.createStore(StoreName.Repository, "key").then(r => console.log("OK"));

