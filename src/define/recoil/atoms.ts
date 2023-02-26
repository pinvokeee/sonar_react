import { atom } from "recoil";
import { FileSystemNode } from "../../class/fileSystem/types";
import { RepositoryHandleItem, RepositoryLoadingState } from "../../controller/repository";
import { SelectedNodes } from "../../controller/selectedNodes";
import { DialogState } from "../../features/dialog/types";
import { TemplateNode } from "../../loader/templateLoader";
import { SelectedTemplates } from "../../types";
import { DialogNames } from "../dialogNames";
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
export const AtomHandleNodes = atom<FileSystemNode[]>({
    key: atomKeys.FILENODES.toString(),    
    default: [],
});

/**
 * 選択中のノード管理
 */
export const AtomSelectedHandleNodes = atom<SelectedNodes>({
    key: atomKeys.SELECTION_NODES.toString(),    
    default: [undefined, undefined, undefined, undefined],
});


export const currentDirectoryState = atom<FileSystemNode[]>({
    key: atomKeys.CURRENT_DIRECTORY.toString(),    
    default: [],
});

export const templateLibrary = atom<TemplateNode[]>({
    key: atomKeys.TEMPLATE_LIBRARY.toString(),    
    default: [],
});

export const selectedTemplateNodes = atom<SelectedTemplates>({
    key: atomKeys.SELECTED_TEMPLATE.toString(),    
    default: { node1: undefined, node2: undefined, node3: undefined, contentNode: undefined, },
});