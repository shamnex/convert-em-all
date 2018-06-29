

export default class ServiceWorker {
    constructor(){}

    async registerSW() {
        if(!navigator.serviceWorker) return;
        try {
           const registration = await navigator.serviceWorker.register("/sw.js");
           console.log(`service worker registered; ${registration}`);
        }
        catch(error) {
            console.log(error);
        }
    }
}