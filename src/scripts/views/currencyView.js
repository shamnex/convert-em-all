import {elements} from "./base";


const displayCurrency = (currency, element) => {
    const option = document.createElement("option")
     option.value = `${currency.id}`
     option.innerHTML = 
      ` ${currency.currencyName.length>30? currency.currencyName.slice(0,30): currency.currencyName} -  (${currency.id}) -`;
      element.insertAdjacentElement("beforeend", option);
}


export const displayCurrencies = (currencies) => {
    currencies.forEach(currency => {
        displayCurrency(currency, elements.fromCurrency );
        displayCurrency(currency, elements.toCurrency );
    });
}