// export const atomKeys = 
// {
//     CURRENT_DIRECTORY: "currentDirectory",
//     TEMPLATE_LIBRARY: "templateLibrary",
//     SELECTED_TEMPLATE: "selectedTemplate",
// }

export enum atomKeys
{
    DIALOG_STATE,
    REPOSITORY_HANDLE_ITEMS,
    REPOSITORY_LOADING_STATE,
    SELECTION_NODES,
    FILENODES,
    FS_NODE_ARRAY,

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
}