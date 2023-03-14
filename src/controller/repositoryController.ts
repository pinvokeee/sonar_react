import { useEffect } from "react";
import { useCallback } from "react";
import { RecoilState, useRecoilCallback, useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { Directory } from "../class/fileSystem/Directory";
import { FileInfo } from "../class/fileSystem/fileInfo";
import { FileSystemObject } from "../class/fileSystem/FileSystemObject";
import { FileSystemObjectMap } from "../class/fileSystem/FileSystemObjectMap";
import { IndexedDBUtil } from "../class/indexeddb/indexeddb";
import { DialogNames } from "../define/names/dialogNames";
import { AtomDialogState, AtomFileSysObjectMap, AtomRepositoryHandleList, AtomRepositoryLoadingState } from "../define/recoil/atoms";
import { generateUuid } from "../util/util";
import { fileObjectContoller } from "./fileObjectContoller";

export type RepositoryHandleItem = {
    key: string,
    modified: Date,
    handle: FileSystemDirectoryHandle,
}

export type RepositoryLoadingState = {
    progress: number,
    maximum: number,
    currentNode: string,
}


export const repositoryController = {

    useActions: () =>
    {
        return {

            selectionRepository: useRecoilCallback(({ snapshot, set }) => async () => {
                helper.openDialog(set);
            }, []),

            closeSelectionRepository: useRecoilCallback(({ snapshot, set }) => async () => {                
                helper.closeDialog(set);
            }, []),

            registRepository: useRecoilCallback(({ snapshot, set }) => async () => {      
                Directory.asyncShowPickDialog().then(handle => {
                    IndexedDB.addItem<RepositoryHandleItem>(StoreName.Repository, { key: generateUuid(), modified: new Date(), handle })
                    .then(item => {
                        set(AtomRepositoryHandleList, (items) => [...items, item]);
                    });
                })
    
            }, []),
           
            deleteRepository: useRecoilCallback(({ snapshot, set }) => async (item: RepositoryHandleItem) => {
                IndexedDB.removeItem(StoreName.Repository, item.key).then(r => {
                    set(AtomRepositoryHandleList, (list) => list.filter((i) => i.key != item.key));
                });
            }, []),

            loadRepository: useRecoilCallback(({ snapshot, set }) => async (item: RepositoryHandleItem) => {

                let count = 0;

                const targetFileTypes = Array.from(FileInfo.registedFileTypes().keys());
                const onFilter = (obj: FileSystemObject) : boolean => helper.isReadTargetFile(targetFileTypes, obj);

                const load = (handle: FileSystemDirectoryHandle) => {

                    set(AtomDialogState, { name: DialogNames.LoadingRepository });

                    Directory.getAllFileEntriesAmount(handle, onFilter).then(maximum => {
                        set(AtomRepositoryLoadingState, (st) => ({ ...st, maximum }))
                    });
                    
                    Directory.readFromHandle(handle, true, (e) => {
                        
                        if (e.kind == "file") set(AtomRepositoryLoadingState, (st) => ({ ...st, progress: count++, currentNode: `${e.path}` }));

                    }, onFilter)
                    .then(e => {
                        set(AtomFileSysObjectMap, e);
                        helper.closeDialog(set);
                    });
                }

                set(AtomRepositoryLoadingState, { currentNode: "", maximum: 0, progress: 0 });

                item.handle.queryPermission({ mode: "readwrite" }).then(result => {
                    if (result != "granted") {
                        item.handle.requestPermission({ mode: "readwrite" }).then(result => {
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

class helper {
    
    static openDialog(set: <T>(recoilVal: RecoilState<T>, valOrUpdater: T | ((currVal: T) => T)) => void) {
        set(AtomDialogState, { name: DialogNames.ReSelectRepository } );
    }

    static closeDialog(set: <T>(recoilVal: RecoilState<T>, valOrUpdater: T | ((currVal: T) => T)) => void) {
        set(AtomDialogState, { name: DialogNames.Empty });
    }

    static isReadTargetFile(allowFileExtensions: string[], targetFileObject: FileSystemObject) {

        /*読み込み対象の拡張子のファイル以外は弾く*/
        if (targetFileObject.kind == "directory") return true;
        if (targetFileObject.kind == "file") {
            const finfo = targetFileObject.fileInfo as FileInfo;
            if (finfo.extension != "" && allowFileExtensions.indexOf(finfo.extension) > -1)  return true;
        }

        return false;
    }
}

export const repositoryLoadingStateSelector = {

    useCurrentState: () => {
        const state = useRecoilValue(AtomRepositoryLoadingState); 
        return state;
    },
}

enum StoreName {
    Repository = "repos",
}

/**
 * indexedDBからストア'repos'を作成しておく
 */
const IndexedDB: IndexedDBUtil = new IndexedDBUtil("sonar", 1);
IndexedDB.createStore(StoreName.Repository, "key").then(r => console.log("OK"));

