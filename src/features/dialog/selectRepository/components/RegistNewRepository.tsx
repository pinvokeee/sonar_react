import { Button } from "@mui/material"
import { FileSystemNode } from "../../../../class/fileSystem/types"
import { repositoryActions } from "../../../../controller/repository"

type Props =
{

}

export const RegistNewRepository = () =>
{    

    return <>
        <Button variant="contained" onClick={repositoryActions.useRegistRepository()} disableElevation>フォルダを追加</Button>
    </>
}
