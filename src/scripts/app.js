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

const swController = async () => {

    state.serviceWorker = new ServiceWorker();
    await state.serviceWorker.registerSW();

}

const idbController = async () => {

    state.idb = new IDB();
    state.idb.open();

}


const currencyController = async () => {

    state.currencies = new Currencies();
    await state.currencies.getCurrencies();
    currencyView.displayCurrencies(state.currencies.currencies);
    state.idb.setItem({id:, state.currencies.currencies});

}

// const countryController = async () => {
//     //1) Prepare UI //TODO

//     //2 ) Get results //TODO
//     state.countries = new Countries();
//     await state.countries.getCountries();

//     //RENDER COUNTRIES ON UI //TOT
//     console.log(state.countries.countries);
// }

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

//===================================
// HELPER FUNCTIONS
//===================================

const handleInputChange = (event) => {
    convertController();
}

// const debounce = (delay, fn) => {
//     let timerId;
//     return function (...args) {
//       if (timerId) {
//         clearTimeout(timerId);
//       }
//       timerId = setTimeout(() => {
//         fn(...args);
//         timerId = null;
//       }, delay);
//     }
//   }

//===================================
// EVENT LISTENERS
//===================================
document.addEventListener("DOMContentLoaded", () => {
    // countryController();
    swController();
    idbController();
    currencyController();
})

elements.amountInput.addEventListener("input", handleInputChange);
elements.fromCurrency.addEventListener("change", handleInputChange);
elements.toCurrency.addEventListener("change", handleInputChange);

//===================================
// 
//===================================


