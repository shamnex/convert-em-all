import { elements } from "./base";

export const getAmountValue = () => elements.amountInput.value;
export const getFromCurrencyValue = () => elements.fromCurrency.value;
export const getToCurrencyValue = () => elements.toCurrency.value;

export const displayResults = (result) => {
    clearResults();
    elements.resultsWrapper.innerHTML = `
        <div class="results__from">
            ${getAmountValue()}<span class="results__from--currency">(${getFromCurrencyValue()})</span> =
        </div>
        
        <h1 class="heading-primary results__to">
            ${result}<span>(${getToCurrencyValue()})</span>
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

export const showError = (error) => {
    let message;
    if(error.message === "Failed to fetch") {
        message = "Internet required for this conversion"
    }
    elements.resultsWrapper.innerHTML = `
        <div class="results__error">
           <div class="results__error--message">${message || error.message}</div> 
        </div>

        <div class="btn results__error--btn">Retry</div>

    `
}



