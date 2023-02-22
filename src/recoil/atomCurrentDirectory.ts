import { atom } from "recoil";
import { FileSystemNode } from "../class/fileSystem/types";
import { TemplateNode } from "../loader/templateLoader";
import { SelectedTemplates } from "../types";
import { atomKeys } from "./keys";

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