import * as toastView from "../views/toastView";

export default class ServiceWorker {
    constructor() { }
    
    async registerSW() {
        if (!navigator.serviceWorker) return;
        try {
            this.registration = await navigator.serviceWorker.register(`${window.location.href}sw.js`,{scope: "/konvatam/"});
            if (this.registration) console.log("Service Worker Registered");

            if (!navigator.serviceWorker.controller) return;

            if (this.registration.waiting) return this._updateReady(this.registration.waiting);

            if (this.registration.installing) return this._trackInstalling(this.registration.installing);

            this.registration.addEventListener('updatefound', () => {
                this._trackInstalling(this.registration.installing);
            });

        }
        catch (error) {
            console.log(error);
        } finally {
            let refreshing;
            navigator.serviceWorker.addEventListener('controllerchange', () => {
                if (refreshing) return;
                window.location.reload();
                refreshing = true;
            });
        }
    }

     _trackInstalling (sw) {
        sw.addEventListener('statechange',() => {
            if (sw.state == 'installed') this._updateReady(sw);    
        });
    };

    async _updateReady (sw) { 
        try {
            const toastAnswser = await toastView.showToast("New version available", "Update");
            console.log(toastAnswser);
               if (!toastAnswser) return;
               sw.postMessage({ action: 'skipWaiting' });
        } catch(error) {
            //TO DO
        }

    };   
}