import { ListItem, Button, ListItemText } from "@mui/material"
import { repositoryController, RepositoryHandleItem } from "../../../../controller/repositoryController"

type Props =
{
    item: RepositoryHandleItem,
}

export const RepositoryListItem = (props: Props) =>
{
    const actions = repositoryController.useActions();

    const load = () => actions.loadRepository(props.item);
    const del = () => actions.deleteRepository(props.item);

    return <>
        <ListItem>
            <Button sx={{ width: "100%", justifyContent: "left" }} onClick={load}>{props.item.handle.name}</Button>
            <Button sx={{ marginLeft: "auto" }} color="error" onClick={del}>除去</Button>
        </ListItem>
    </>
    
}