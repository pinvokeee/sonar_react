import { Button, DialogContent, DialogContentText, List, ListItem, ListItemText, Stack } from "@mui/material"
import { useEffect, useMemo, useState } from "react";
import { repositoryActions, repositorySelector } from "../../../../controller/repository"
import { RepositoryListItem } from "./RepositoryListItem";

type Props = 
{
    
}

export const RepositoryList = (props: Props) =>
{
    const a = repositorySelector.useRegistedHandleItems();

    return <>

        {
            a.length == 0 
            ? 
                <DialogContent>
                    <DialogContentText>[フォルダを追加]からリポジトリとして扱うフォルダを選んでください</DialogContentText> 
                </DialogContent>
            :
            <List>
            {
                a.map((item) => 
                {
                    return <RepositoryListItem key={item.key} item={item}></RepositoryListItem>
                })
            }
            </List>
        }

    </>   
}