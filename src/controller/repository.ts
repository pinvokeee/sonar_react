import { useEffect, useState } from "react";
import { useCallback } from "react";
import { selector, useRecoilState, useRecoilValue } from "recoil";
import { Directory } from "../class/fileSystem/directory";
import { FileSystemNode } from "../class/fileSystem/types";
import { IndexedDBUtil } from "../class/indexeddb/indexeddb";
import { DialogNames } from "../define/dialogNames";
import { dialogState, fileNodes, repositoryHandleList, repositoryLoadingState } from "../define/recoil/atoms";
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
    currentNode: FileSystemNode | undefined,
}

enum StoreName
{
    Repository = "repos",
}

/**
 * リポジトリへのアクションををまとめたカスタムフック郡
 */
export const repositoryActions = {

    /**
     * リポジトリ選択ダイアログを表示する
     * @returns 
     */
    useSelectionRepository: () => {
        const [dialog, setDialogState] = useRecoilState(dialogState);

        return useCallback(() =>
        {
            setDialogState( { name: DialogNames.SelectRepository } );
        }, []);
    },

    /**
     * フォルダ選択ダイアログを表示し、選択したフォルダをリポジトリに登録する
     * (IndexedDBへ追加)
     * @returns 
     */
    useRegistRepository: () => {
        const [items, setItems] = useRecoilState(repositoryHandleList);

        return useCallback(() =>
        {
            Directory.asyncShowPickDialog().then(handle => 
            {
                IndexedDB.addItem<RepositoryHandleItem>(StoreName.Repository, { key: generateUuid(), modified: new Date(), handle }).then(item =>
                {
                    setItems((items) => [...items, item]);
                });
            })

        }, []);
    },    

    /**
     * 引数に与えられたハンドル取得済みアイテムを登録リポジトリから削除
     * @param item 
     * @returns 
     */
    useDeleteRepository: (item: RepositoryHandleItem) => {
        const [items, setItems] = useRecoilState(repositoryHandleList);

        return useCallback(() =>　{
            IndexedDB.removeItem(StoreName.Repository, item.key).then(r =>
            {
                setItems((list) => list.filter((i) => i.key != item.key));
            });

        }, []);
    },

    /**
     * 選択したディレクトリハンドルからリポジトリとして読み込む
     * @param item 
     * @returns 
     */
    useLoadRepository: (item: RepositoryHandleItem) =>
    {
        const [files, setFileNodes] = useRecoilState(fileNodes);
        const [dialog, setDialogState] = useRecoilState(dialogState);
        const [state, setState] = useRecoilState<RepositoryLoadingState>(repositoryLoadingState);

        return useCallback(()=>
        {
            let count = 0;

            const load = (handle: FileSystemDirectoryHandle) =>
            {
                setDialogState( { name: DialogNames.LoadingRepository });

                Directory.getAllFileEntriesAmount(handle).then(maximum => setState({ ...state, maximum }));
                
                Directory.loadFromHandle(handle, (e) => 
                {
                    if (e.kind == "file") setState((st) => ({ ...st, progress: count++, currentNode: st.currentNode }));
                })
                .then(e => 
                {
                    setFileNodes(e);
                    setDialogState( { name: DialogNames.Empty });
                });
            }

            setState({ currentNode: undefined, maximum: 0, progress: 0 });

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

        }, []);
    },
}

export const repositorySelector = 
{
    useRegistedHandleItems: () => 
    {
        const [items, setItems] = useRecoilState(repositoryHandleList); 

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

                setItems(gitems)

            })()
        }, []);

        return items;
    },

    useFileNodesSelector: () =>
    {
        return useRecoilValue(fileNodeSelector.getNodes); 
    }
}

// export const 

export const repositoryLoadingStateSelector = 
{
    useCurrentState: () => 
    {
        const state = useRecoilValue(repositoryLoadingState); 
        return state;
    },
}

export const fileNodeSelector = 
{
    getNodes: selector<FileSystemNode[]>({
        key: selectorKeys.SEL_FILENODES,
        get: ({get}) => get(fileNodes)
    }),

    // getNodeItem: selector(
}

/**
 * indexedDBからストア'repos'を作成しておく
 */
const IndexedDB: IndexedDBUtil = new IndexedDBUtil("sonar", 1);
IndexedDB.createStore(StoreName.Repository, "key").then(r => console.log("OK"));

