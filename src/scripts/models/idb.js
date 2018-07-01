import idb from "idb";
import { constants } from "../constants";

export default class IDB {
    constructor(){
        this.storeName = constants.CURRENCY_RATES_STORE;
        this.open();
    }
    async open() {
        if (!window.indexedDB) return;
        try {
            this.dbPromise = idb.open("konvatam-db", 1, (upgradeDb)=> {
                 upgradeDb.createObjectStore(this.storeName, {
                     keyPath: "id"
                 });
            })

            this._db = await this.dbPromise;
        }catch(error) {
            console.log(error);
        }
    }

    async setItem(key, val) {
        try {
            const transaction = await this._db.transaction(this.storeName, "readwrite");
            const store = transaction.objectStore(this.storeName);
            const result = await store.put({id:key,val});     
            
        }catch(error) {
            console.log(`error saving item to DB: ${error} `)
        }
    }

    async getItem(key, db) {
        try {
            const transaction = await (this._db || db).transaction(this.storeName);
            const store = transaction.objectStore(this.storeName);
            const item = await store.get(key);
            return item;
        }catch(error) {
            console.log(`error getting item to DB: ${error} `)
        }
    }
}
