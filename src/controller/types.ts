export {}

// export type Controller =
// {
//     useActions: () => void,
//     selector: any,
// }

// export const base = 
// {
//     useActions: () =>
//     {
//         const setDialogState = useSetRecoilState(dialogState);
//         const setItems = useSetRecoilState(repositoryHandleList);
//         const setFileNodes = useSetRecoilState(fileNodes);
//         const setLoadingState = useSetRecoilState(repositoryLoadingState);

//         return {
//             selectionRepository: useCallback(() =>
//             {
//                 setDialogState( { name: DialogNames.ReSelectRepository } );
//             }, []),

//             closeSelectionRepository: useCallback(() =>
//             {
//                 setDialogState( { name: DialogNames.Empty } );
//             }, []),

//             registRepository: useCallback(() =>
//             {
//                 Directory.asyncShowPickDialog().then(handle => 
//                 {
//                     IndexedDB.addItem<RepositoryHandleItem>(StoreName.Repository, { key: generateUuid(), modified: new Date(), handle })
//                     .then(item =>
//                     {
//                         setItems((items) => [...items, item]);
//                     });
//                 })
    
//             }, []),
           
//             deleteRepository: useCallback((item: RepositoryHandleItem) =>
//             {
//                 IndexedDB.removeItem(StoreName.Repository, item.key).then(r =>
//                 {
//                     setItems((list) => list.filter((i) => i.key != item.key));
//                 });
    
//             }, []),

//             loadRepository: useCallback((item: RepositoryHandleItem) =>
//             {
//                 let count = 0;

//                 const load = (handle: FileSystemDirectoryHandle) =>
//                 {
//                     setDialogState( { name: DialogNames.LoadingRepository });

//                     Directory.getAllFileEntriesAmount(handle).then(maximum => setLoadingState((st) => ({ ...st, maximum })));
                    
//                     Directory.loadFromHandle(handle, false, (e) => 
//                     {
//                         console.log(e);
//                         if (e.kind == "file") setLoadingState((st) => ({ ...st, progress: count++, currentNode: `${e.path}` }));
//                     })
//                     .then(e => 
//                     {
//                         setFileNodes(e);
//                         setDialogState( { name: DialogNames.Empty });
//                     });
//                 }

//                 setLoadingState({ currentNode: "", maximum: 0, progress: 0 });

//                 item.handle.queryPermission({ mode: "readwrite" }).then(result =>
//                 {
//                     if (result != "granted") 
//                     {
//                         item.handle.requestPermission({ mode: "readwrite" }).then(result =>
//                         {
//                             if (result == "granted") load(item.handle);
//                         })
//                     }
//                     else if (result == "granted") load(item.handle);
//                 })

//             }, [])
//         }
//     },

//     selector: () =>
//     {
//         return {
//             useGetRegistedHandleItems: () =>
//             {
//                 const [items, setItems] = useRecoilState(repositoryHandleList); 

//                 useEffect(() => {
//                     (async ()=> 
//                     {
//                         const gitems = (await IndexedDB.getAllItems<RepositoryHandleItem>(StoreName.Repository))
//                         .sort((a: RepositoryHandleItem, b: RepositoryHandleItem) => 
//                         {
//                             if (a.modified.getTime() < b.modified.getTime()) return -1;
//                             if (a.modified.getTime() > b.modified.getTime()) return 1;
//                             return 0;
//                         });
        
//                         setItems(gitems);
//                     })()
//                 }, []);
        
//                 return items;
//             }
//         }
//     }
// }
