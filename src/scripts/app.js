// import './../sass/main.scss';
import Countries from "./models/country";
import Currencies from "./models/currency";
import Converter from "./models/convert";
import IDB from "./models/idb";

import ServiceWorker from "./models/service-worker";
import * as currencyView from "./views/currencyView"
import * as convertView from "./views/convertView"
import * as toastView from "./views/toastView"

import { elements } from './views/base';

//===================================
// APP STATE
//===================================
const state = {
}
//===================================
// CONTROLLERS
//===================================

const idbController = async () => {
    state.idb = new IDB();
}


const swController = async () => {

    state.serviceWorker = new ServiceWorker();
    await state.serviceWorker.registerSW();

}


const convertController = async () => {

    // get input values from UI
    const fromCurrency = await convertView.getFromCurrencyValue();
    const toCurrency = await convertView.getToCurrencyValue();
    const amount = await convertView.getAmountValue();

    //get hold of the converter
   state.converter = new Converter(amount, fromCurrency, toCurrency);

    // validate input
    if (!toCurrency || !fromCurrency) return;

    //show loading
    convertView.showSpinner();

    //Fetch rate from cache
    const item = await state.idb.getItem(state.converter.query);

    if (item) {
        //if item is in cache
        state.converter.convertOffline(item.val);
    } else {
        //Convert Online
        await state.converter.convertOnline();
        //5) Save To DB
        if (state.converter.rates) {
            const key = state.converter.query;
            const val = state.converter.rates;
            state.idb.setItem(key, val);
        }
    }

    // If error
    if (state.converter.error) return convertView.showError(state.converter.error);
    if (!state.converter.result || !amount) return convertView.clearResults();

    // Display Result
    convertView.displayResults(state.converter.result);

}


const currencyController = async () => {
    //fetch currencies from CACHE
    state.currencies = new Currencies();
    if (!state.idb._db) {
        const db = await state.idb.dbPromise;
        const res = await state.idb.getItem("currencies", db);
        if (res) {
            state.currencies.setCurrencies(res.val);
        } else {
            state.idb
                .setItem("currencies", await state.currencies.getCurrencies());
        }
    }

    currencyView.displayCurrencies(state.currencies.currencies);

}

//===================================
// HELPER FUNCTIONS
//===================================

const handleInputChange = () => {
    convertController();
}


//debounce stolen from _underscore.js to delay immediate execution of keypress events
const  debounce = (func, wait, immediate) => {
	var timeout;
	return function() {
		var context = this, args = arguments;
		var later = function() {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		var callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
};


//===================================
// EVENT LISTENERS
//===================================
document.addEventListener("DOMContentLoaded", () => {
    // countryController();
    idbController();
    currencyController();
    swController();
})

elements.amountInput.addEventListener("input", debounce(handleInputChange, 1000));
elements.fromCurrency.addEventListener("change", handleInputChange);
elements.toCurrency.addEventListener("change", handleInputChange);




