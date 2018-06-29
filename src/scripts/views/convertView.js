import { elements } from "./base";

export const getAmountValue = () => elements.amountInput.value;
export const getFromCurrencyValue = () => elements.fromCurrency.value;
export const getToCurrencyValue = () => elements.toCurrency.value;

export const displayResults = (result) => {
    clearResults();
    elements.resultsWrapper.innerHTML = `
        <div class="results__from">
            ${getAmountValue()}<span class="results__from--currency">${getFromCurrencyValue()}</span> =
        </div>
        
        <h1 class="heading-primary results__to">
            ${result}<span>${getToCurrencyValue()}</span>
        </h1>
    `
}

export const clearResults = () => {
    elements.resultsWrapper.innerHTML = `
    `
}

export const showSpinner = () => {
    elements.resultsWrapper.innerHTML = `
        loading...
    `
}



