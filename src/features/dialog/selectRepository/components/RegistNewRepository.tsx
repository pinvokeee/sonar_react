import { Button } from "@mui/material"
import { repository } from "../../../../controller/repository"

export const RegistNewRepository = () =>
{
    const actions = repository.useActions();

    return <>
        <Button variant="contained" onClick={ () => actions.registRepository() } disableElevation>フォルダを追加</Button>
    </>
}
