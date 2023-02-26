import { useEffect, useState } from "react";
import { useCallback } from "react";
import { selector, selectorFamily, useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { Directory } from "../class/fileSystem/directory";
import { FileSystemNode } from "../class/fileSystem/types";
import { IndexedDBUtil } from "../class/indexeddb/indexeddb";
import { DialogNames } from "../define/dialogNames";
import { AtomDialogState, AtomHandleNodes, AtomRepositoryHandleList, AtomRepositoryLoadingState } from "../define/recoil/atoms";
import { selectorKeys } from "../define/recoil/keys";
import { generateUuid } from "../util/util";

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

export const repository =
{
    useActions: () =>
    {
        const setDialogState = useSetRecoilState(AtomDialogState);
        const setItems = useSetRecoilState(AtomRepositoryHandleList);
        const setFileNodes = useSetRecoilState(AtomHandleNodes);
        const setLoadingState = useSetRecoilState(AtomRepositoryLoadingState);

        return {
            selectionRepository: useCallback(() =>
            {
                setDialogState( { name: DialogNames.ReSelectRepository } );
            }, []),

            closeSelectionRepository: useCallback(() =>
            {
                setDialogState( { name: DialogNames.Empty } );
            }, []),

            registRepository: useCallback(() =>
            {
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

                const load = (handle: FileSystemDirectoryHandle) =>
                {
                    setDialogState( { name: DialogNames.LoadingRepository });

                    Directory.getAllFileEntriesAmount(handle).then(maximum => 
                        {
                            console.log(maximum);
                            setLoadingState((st) => ({ ...st, maximum }))
                        });
                    
                    Directory.readFromHandle(handle, false, (e) => 
                    {
                        // console.log(e);
                        if (e.kind == "file") setLoadingState((st) => ({ ...st, progress: count++, currentNode: `${e.path}` }));
                    })
                    .then(e => 
                    {
                        setFileNodes(e);
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

