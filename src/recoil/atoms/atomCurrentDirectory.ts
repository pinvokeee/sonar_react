import { atom } from "recoil";
import { FileNode } from "../../types";
import { atomKeys } from "../keys";

export const currentDirectoryState = atom<FileNode[]>({
    key: atomKeys.CURRENT_DIRECTORY,    
    default: [],
});