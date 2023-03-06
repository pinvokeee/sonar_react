import { atom } from "recoil";
import { FileSystemTreeNode } from "../../class/fileSystem/types";
import { FileSystemObject } from "../../class/fileSystem/FileSystemObject";
import { RepositoryHandleItem, RepositoryLoadingState } from "../../controller/repository";
import { DialogState } from "../../features/dialog/types";
import { DialogNames } from "../names/dialogNames";
import { atomKeys } from "./keys";

/**
 * 表示中のダイアログの状態
 */
export const AtomDialogState = atom<DialogState>({
    key: atomKeys.DIALOG_STATE.toString(),    
    default: { name: DialogNames.SelectRepository },
});

/**
 * 登録されているリポジトリ一覧
 */
export const AtomRepositoryHandleList = atom<RepositoryHandleItem[]>({
    key: atomKeys.REPOSITORY_HANDLE_ITEMS.toString(),    
    default: [],
});

/**
 * 読み込み中のリポジトリの進捗状態
 */
export const AtomRepositoryLoadingState = atom<RepositoryLoadingState>({
    key: atomKeys.REPOSITORY_LOADING_STATE.toString(),    
    default: { maximum: 0, progress: 0, currentNode: "" },
});

/**
 * リポジトリ中のファイルノード一覧
 */
export const AtomFileObjects = atom<Map<string, FileSystemObject>>({
    key: atomKeys.FILENODES.toString(),    
    default: new Map(),
});

/**
 * 木構造で保持するファイルノード配列
 */
export const AtomFileSystemTreeNodes = atom<FileSystemTreeNode[]>({
    key: atomKeys.FS_NODE_ARRAY.toString(),    
    default: [],
});

/**
 * 選択中のノード管理
 */
export const AtomSelectedHandleNodes = atom<(string | undefined)[]>({
    key: atomKeys.SELECTION_NODES.toString(),    
    default: [undefined, undefined, undefined, undefined],
});


// /*未使用*/

// export const currentDirectoryState = atom<FileSystemNode[]>({
//     key: atomKeys.CURRENT_DIRECTORY.toString(),    
//     default: [],
// });

// export const templateLibrary = atom<TemplateNode[]>({
//     key: atomKeys.TEMPLATE_LIBRARY.toString(),    
//     default: [],
// });

// export const selectedTemplateNodes = atom<SelectedTemplates>({
//     key: atomKeys.SELECTED_TEMPLATE.toString(),    
//     default: { node1: undefined, node2: undefined, node3: undefined, contentNode: undefined, },
// });