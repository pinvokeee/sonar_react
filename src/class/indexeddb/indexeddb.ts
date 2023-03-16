export class IndexedDBUtil
{
    private name: string = "";
    private version: number = 0;

    constructor(name: string, version: number)
    {
        this.name = name;
        this.version = version;
    }

    createStore(storeName: string, keyPath?: string)
    {
        return new Promise<this>((resolve, reject) =>
        {
            const req = indexedDB.open(this.name, this.version);

            req.onupgradeneeded = () =>
            {
                const db = req.result;
                const keypath = keyPath? { keyPath } : undefined;
                if (!db.objectStoreNames.contains(storeName)) db.createObjectStore(storeName, keypath);

                resolve(this);
            }
        });
    }

    private transaction(storeName: string, mode: IDBTransactionMode | undefined)
    {
        return new Promise<IDBObjectStore>((resolve, reject) =>
        {
            const req = indexedDB.open(this.name, this.version);

            req.onsuccess = (event) =>
            {
                const db = req.result;
                const transaction = db.transaction(storeName, mode);
                const store = transaction.objectStore(storeName);
                
                resolve(store);
            }
        });
    }

    private getAll<T>(store: IDBObjectStore)
    {
        return new Promise<T[]>((resolve, reject) =>
        {
            const all = store.getAll();
            all.onsuccess = (event) => resolve(all.result.map(r => r as T));
        })
    }

    getAllItems<T>(storeName: string)
    {
        return new Promise<T[]>((resolve, reject) =>
        {
            this.transaction(storeName, "readonly").then(store =>
            {
                this.getAll<T>(store).then(items => resolve(items));
            });
        })
    }

    addItem<T>(storeName: string, item: T)
    {
        return new Promise<T>((resolve, reject) =>
        {
            this.transaction(storeName, "readwrite").then(store =>
            {
               store.add(item);
               resolve(item);
            });
        });
    }

    removeItem(storeName: string, key: string)
    {
        return new Promise<string>((resolve, reject) =>
        {
            this.transaction(storeName, "readwrite").then(store =>
            {
                store.delete(key);
                resolve(key);
            });
        });
    }
}