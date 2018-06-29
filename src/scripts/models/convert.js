import {constants} from "../constants"


export default class Conversion {
    constructor(amount, fromCurrency, toCurrency) {
        this.amount = amount;
        this.fromCurrency = fromCurrency;
        this.toCurrency = toCurrency;
    }
    async convertCurrency() {
        try {
            const query = `${this.fromCurrency}_${this.toCurrency}`;
            const url = `${constants.BASE_URL}${constants.CONVERT_URL}${query}&compact=ultra`;
            const res = await (await fetch(url)).json();
            const value = +res[query];

            if (value) {
                var total = value * this.amount;
                this.result = Math.round(total * 100) / 100;
            } else {
                const error = new Error(`value not found for ${query}`);
                throw(error);
            }
        } catch (error) {
            console.log("Got an error: ", error.message);
        };
    }
}

