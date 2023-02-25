import { atom } from "recoil";
import { FileSystemNode } from "../../class/fileSystem/types";
import { RepositoryHandleItem, RepositoryLoadingState } from "../../controller/repository";
import { DialogState } from "../../features/dialog/types";
import { TemplateNode } from "../../loader/templateLoader";
import { SelectedTemplates } from "../../types";
import { DialogNames } from "../dialogNames";
import { atomKeys } from "./keys";

export const dialogState = atom<DialogState>({
    key: atomKeys.DIALOG_STATE.toString(),    
    default: { name: DialogNames.SelectRepository },
});

export const repositoryHandleList = atom<RepositoryHandleItem[]>({
    key: atomKeys.REPOSITORY_HANDLE_ITEMS.toString(),    
    default: [],
});

export const repositoryLoadingState = atom<RepositoryLoadingState>({
    key: atomKeys.REPOSITORY_LOADING_STATE.toString(),    
    default: { maximum: 0, progress: 0, currentNode: undefined },
});

export const fileNodes = atom<FileSystemNode[]>({
    key: atomKeys.FILENODES.toString(),    
    default: [],
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