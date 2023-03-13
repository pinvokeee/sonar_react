import { Button } from "@mui/material"
import { repositoryController } from "../../../../controller/repositoryController"

export const RegistNewRepository = () =>
{
    const actions = repositoryController.useActions();

    return <>
        <Button variant="contained" onClick={ () => actions.registRepository() } disableElevation>フォルダを追加</Button>
    </>
}
