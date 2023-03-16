// export const atomKeys = 
// {
//     CURRENT_DIRECTORY: "currentDirectory",
//     TEMPLATE_LIBRARY: "templateLibrary",
//     SELECTED_TEMPLATE: "selectedTemplate",
// }

export class AtomKeys
{
    static StateDialog = "StateDialog";
    static FileSysObjectMap = "FileSysObject";
    static Selection = "Selection";
    static SelectRepository = "";

    static Selecter =
    {
        StateDialog: `Sel${this.StateDialog}`,
        FileSysObjectMap:  `Sel${this.FileSysObjectMap}`,
        Selection: `Sel${this.Selection}`,
        SelectRepository: `Sel${this.SelectRepository}`,
    }
}




export enum atomKeys
{
    DIALOG_STATE,
    REPOSITORY_HANDLE_ITEMS,
    REPOSITORY_LOADING_STATE,
    SELECTION_NODES,
    FILENODES,
    FS_NODE_ARRAY,

    FILESYSOBJECT_MAP,

    CURRENT_DIRECTORY,
    TEMPLATE_LIBRARY,
    SELECTED_TEMPLATE,
}


export enum selectorKeys
{
    SEL_REPOSITORY_HANDLE_ITEMS = "selector_repo_handle_items",
    SEL_REPOSITORY_LOADING_STATE = "selector_repo_loading_state",
    SEL_DIALOG_STATE = "selector_dialog_state",
    SEL_FILENODES = "selector_file_nodes",

    SEL_SELECTION_FILE_NODES = "selector_select_file_nodes",

    SEL_FILENODE_ITEM = "selector_file_node_item",

    SEL_SUB_NODE = "selector_sub_node",

    SELECTOR_SEARCH_OBJECT = "SELECTOR_SEARCH_OBJECT",
}