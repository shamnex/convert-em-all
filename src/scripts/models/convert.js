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
            const queryInverse = `${this.toCurrency}_${this.fromCurrency}`;
            const url = `${constants.BASE_URL}${constants.CONVERT_URL}${query},${queryInverse}&compact=ultra`;

            if(!this.fromCurrency || !this.toCurrency ) return;

            const res = await (await fetch(url)).json();
            console.log(res);
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

