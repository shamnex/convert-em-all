// import './../sass/main.scss';
import Countries from "./models/country";
import Currencies from "./models/currency";
import ConvertCurrency from "./models/convert";
import ServiceWorker from "./models/service-worker";
import * as currencyView from "./views/currencyView"
import * as convertView from "./views/convertView"
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

const currencyController = async () => {

    state.currencies = new Currencies();
    await state.currencies.getCurrencies();
    currencyView.displayCurrencies(state.currencies.currencies);
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

    //1) get input values from UI
    const fromCurrency = await convertView.getFromCurrencyValue();
    const toCurrency = await convertView.getToCurrencyValue();
    const amount = await convertView.getAmountValue();

    //2) get hold of the converter
    state.converter =  new ConvertCurrency(amount, fromCurrency, toCurrency);

    //3) show loading...TODO
    convertView.showSpinner();

    //4) Convert it
    await state.converter.convertCurrency();
    if(!state.converter.result || !amount)  return convertView.clearResults();

    //5)Display Result
    convertView.displayResults(state.converter.result);

}

//===================================
// HELPER FUNCTIONS
//===================================

const handleInputChange = (event)=> {
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

window.onload =()=> {
    // countryController();
    swController();
    currencyController();

}

elements.amountInput.addEventListener("input", handleInputChange);
elements.fromCurrency.addEventListener("change",handleInputChange);
elements.toCurrency.addEventListener("change",handleInputChange);

//===================================
// 
//===================================


