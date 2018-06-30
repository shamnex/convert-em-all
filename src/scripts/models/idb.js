import idb from "idb";

export default class IDB {
    constructor(){}
    async open() {
        if (!window.indexedDB) return;
        try {
            const promise = idb.open("konvatam-db", 1, (upgradeDb)=> {
                const keyValStore = upgradeDb.createObjectStore("currency-rates-store");
                keyValStore.put("world", "hello");
            })
            this._db = await promise;


        }catch(error) {
            
        }
    }

    async setItem(key, val) {
        try {
            const transaction = await this._db.transaction("currency-rates-store", "readwrite");
            const keyValStore = transaction.objectStore("currency-rates-store");
            const result = await keyValStore.put(val, key);
            const done = await transaction.complete;
            console.log(done, result);
            
        }catch(error) {
            console.log(`error saving item to DB: ${error} `)
        }
    }
}
