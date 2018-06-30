import idb from "idb";

export default class IDB {
    constructor(){}
    async init() {
        const promise = idb.open("test-db", 1, (upgradeDb)=> {
            const keyValStore = upgradeDb.createObjectStore("keyval");
            keyValStore.put("world", "hello");
        })

        try {
            this._db = await promise;
            this._transaction = this.db.transaction("keyval");
            this._keyValStore = this.transaction.objectStore("keyval");
            this.value = this.keyValStore.get("hello");

            console.log(`this value of hello is ${value}`);

        }catch(error) {
            
        }
    }
}
