import { Backdrop, Button, Dialog, DialogTitle, List, ListItem, Stack } from "@mui/material"
import { Directory } from "../../class/fileSystem/directory"
import { LoadingDirectoryDialog } from "./LoadingDirectoryDialog";

export const DialogSelectRepository = () =>
{
    const openReq = indexedDB.open("sonar", 3);

    openReq.onupgradeneeded = () =>
    {
        const db = openReq.result;

        db.createObjectStore('repos', {keyPath: 'id'});

        if (!db.objectStoreNames.contains('repos')) 
        {
            db.createObjectStore('repos', {keyPath: 'id'});
        }

        db.deleteObjectStore('repos');
    }

    openReq.onsuccess = () =>
    {
        const db = openReq.result;
        console.log(db.objectStoreNames);

        const transaction = db.transaction("repos", "readwrite");
        // const repos = transaction.objectStore("repos");

        // console.log(repos);


    }



    const click = () =>
    {
        // Directory.asyncShowPickDialog().then(handle => 
        // {   
        //     Directory.getAllFileEntriesAmount(handle).then(r =>
        //     {
        //         console.log(`amount: ${r}`);
        //     });

        //     Directory.loadFromHandle(handle, (e) => console.log(e)).then(e => 
        //     {
        //         console.log(e);
        //     });
        // });
    }


    return <>
        <Backdrop sx={{ zIndex: 1 }} open={true}>

            <LoadingDirectoryDialog></LoadingDirectoryDialog>

            <Dialog open={true}>
                
                <DialogTitle>リポジトリ選択</DialogTitle>

                <List>
                    <ListItem secondaryAction={ <Button color="error">削除</Button> }>
                        <Stack>
                            <Button variant="text">Text</Button>
                        </Stack>
                    </ListItem>

                    <ListItem secondaryAction={ <Button color="error">削除</Button> }>
                        <Stack>
                            <Button variant="text">Text</Button>
                        </Stack>
                    </ListItem>

                </List>                            

                <Button variant="outlined" onClick={click}>フォルダを追加</Button>

            </Dialog>
        </Backdrop>
    </>
}