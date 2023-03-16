import { Button, DialogContent, DialogContentText, List, ListItem, ListItemText, Stack } from "@mui/material"
import { useEffect, useMemo, useState } from "react";
import { repositoryController } from "../../../../controller/repositoryController"
import { RepositoryListItem } from "./RepositoryListItem";

type Props = 
{
    
}

export const RepositoryList = (props: Props) =>
{
    const selector = repositoryController.selector;

    const items = selector.useGetRegistedHandleItems();

    return <>

        {
            items.length == 0 
            ? 
                <DialogContent>
                    <DialogContentText>[フォルダを追加]からリポジトリとして扱うフォルダを選んでください</DialogContentText> 
                </DialogContent>
            :
            <List>
            {
                items.map((item) => 
                {
                    return <RepositoryListItem key={item.key} item={item}></RepositoryListItem>
                })
            }
            </List>
        }

    </>   
}