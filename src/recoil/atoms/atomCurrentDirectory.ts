import { atom } from "recoil";
import { TemplateNode } from "../../loader/templateLoader";
import { FileNode, SelectedTemplates } from "../../types";
import { atomKeys } from "../keys";

export const currentDirectoryState = atom<FileNode[]>({
    key: atomKeys.CURRENT_DIRECTORY,    
    default: [],
});

export const templateLibrary = atom<TemplateNode[]>({
    key: atomKeys.TEMPLATE_LIBRARY,    
    default: [],
});

export const selectedTemplateNodes = atom<SelectedTemplates>({
    key: atomKeys.SELECTED_TEMPLATE,    
    default: { node1: undefined, node2: undefined, node3: undefined, contentNode: undefined, },
});