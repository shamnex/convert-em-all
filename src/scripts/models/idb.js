import idb from "idb";
import { constants } from "../constants";

export default class IDB {
    constructor(){
        this.storeName = constants.CURRENCY_RATES_STORE;
    }
    async open() {
        if (!window.indexedDB) return;
        try {
            const promise = idb.open("konvatam-db", 1, (upgradeDb)=> {
                 upgradeDb.createObjectStore(this.storeName, {
                     keyPath: "id"
                 });
            })
            this._db = await promise;


        }catch(error) {
            console.log(error);
        }
    }

    async setItem(key, val) {
        try {
            const transaction = await this._db.transaction(this.storeName, "readwrite");
            const currencyRatetesStore = transaction.objectStore(this.storeName);
            const result = await currencyRatetesStore.put({id:key,val});     
            
        }catch(error) {
            console.log(`error saving item to DB: ${error} `)
        }
    }

    async getItem(key) {
        try {
            const transaction = await this._db.transaction(this.storeName);
            const currencyRatetesStore = transaction.objectStore(this.storeName);
            const item = await currencyRatetesStore.get(key);
            return item;
        }catch(error) {
            console.log(`error getting item to DB: ${error} `)
        }
    }
}
