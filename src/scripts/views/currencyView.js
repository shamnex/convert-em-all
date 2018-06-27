import {elements} from "./base";


const displayCurrency = (currency, element) => {

    const option = document.createElement("option")
     option.value = `${currency.id}`
     option.innerHTML = 
      `<p class="input-group__currency--symbol">${currency.currencySymbol || "" }</p> 
     (${currency.id}) -
      ${currency.currencyName.length>30? currency.currencyName.slice(0,30): currency.currencyName}`

      element.insertAdjacentElement("beforeend", option);
}


export const renderResults = (currencies) => {
    currencies.forEach(currency => {
        displayCurrency(currency, elements.fromCurrency );
        displayCurrency(currency, elements.toCurrency );
    });
}