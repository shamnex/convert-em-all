import './../sass/main.scss';
import Countries from "./models/country";
import Currencies from "./models/currency";
import convertCurrency from "./models/convert";
import * as currencyView from "./views/currencyView"
import * as convertView from "./views/convertView"
import { elements } from './views/base';



const state = {
}

const currencyController = async () => {

    state.currencies = new Currencies();
    await state.currencies.getCurrencies();
    currencyView.renderResults(state.currencies.currencies);
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
    //1) get input values
    const fromCurrency = await convertView.getFromCurrencyValue();
    const toCurrency = await convertView.getToCurrencyValue();
    const amount = await convertView.getAmountValue();


    //2) get hold of the converter
    state.converter =  new convertCurrency(amount, fromCurrency, toCurrency);

    
    //3) Convert it
    await state.converter.convertCurrency();

    //4) 

    // console.log(state.converter.result);

}
window.onload =()=> {
    // countryController();
    currencyController();
}

elements.amountInput.addEventListener("keypress", function(e) {
    // console.log(e)
    convertController();
})


