import { ListItem, Button, ListItemText } from "@mui/material"
import { repositoryActions, RepositoryHandleItem } from "../../../../controller/repository"

type Props =
{
    item: RepositoryHandleItem,
}

export const RepositoryListItem = (props: Props) =>
{
    return <>
        <ListItem>
            <Button sx={{ width: "100%", justifyContent: "left" }} onClick={repositoryActions.useLoadRepository(props.item)}>{props.item.handle.name}</Button>
            <Button sx={{ marginLeft: "auto" }} color="error" onClick={ repositoryActions.useDeleteRepository(props.item) }>除去</Button>
        </ListItem>
    </>
    
}