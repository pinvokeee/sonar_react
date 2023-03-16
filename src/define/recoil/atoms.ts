import { atom } from "recoil";
import { FileSystemTreeNode } from "../../class/fileSystem/types";
import { FileSystemObject } from "../../class/fileSystem/FileSystemObject";
import { RepositoryHandleItem, RepositoryLoadingState } from "../../controller/repositoryController";
import { DialogState } from "../../features/dialog/types";
import { DialogNames } from "../names/dialogNames";
import { AtomKeys, atomKeys } from "./keys";
import { FileSystemObjectMap } from "../../class/fileSystem/FileSystemObjectMap";

/**
 * NEW ファイルシステムのマップ
 */
export const AtomFileSysObjectMap = atom<FileSystemObjectMap>({
    key: AtomKeys.FileSysObjectMap,    
    default: new FileSystemObjectMap(),
});

/**
 * NEW 選択可能・選択範囲を取得/設定する
 */
export const AtomSelection = atom<(string | undefined)[]>({
    key: AtomKeys.Selection,    
    default: [undefined, undefined, undefined, undefined],
});

/**
 * NEW 選択したレポジトリ
 */
export const AtomSelectRepository = atom<string>({
    key: AtomKeys.SelectRepository,    
    default: "",
});




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