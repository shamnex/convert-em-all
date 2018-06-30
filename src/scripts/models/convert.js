import {constants} from "../constants"


export default class Conversion {
    constructor(amount, fromCurrency, toCurrency) {
        this.amount = amount;
        this.fromCurrency = fromCurrency;
        this.toCurrency = toCurrency;
    }
    async convertCurrency() {
        try {
            this.query = `${this.fromCurrency}_${this.toCurrency}`;
            const queryInverse = `${this.toCurrency}_${this.fromCurrency}`;
            const url = `${constants.BASE_URL}${constants.CONVERT_URL}${this.query},${queryInverse}&compact=ultra`;

            if(!this.fromCurrency || !this.toCurrency ) return;

            this.rates = await (await fetch(url)).json();
            const value = +this.rates[this.query];

            if (value) {
                var total = value * this.amount;
                this.result = Math.round(total * 100) / 100;
            } else {
                const error = new Error(`value not found for ${query}`);
                this.error = error;
                throw(error);
            }
        } catch (error) {
            this.error = error;
            console.log(error);
        };
    }
}

