import { constants } from "../constants"


export default class Conversion {

    constructor(amount, fromCurrency, toCurrency) {
        this._amount = amount;
        this._fromCurrency = fromCurrency;
        this._toCurrency = toCurrency;
        this.query = `${fromCurrency}_${toCurrency}`;
        this.queryInverse = `${toCurrency}_${fromCurrency}`;
        this.url = `${constants.BASE_URL}${constants.CONVERT_URL}${this.query},${this.queryInverse}&compact=ultra`;
    }

    async convertOnline() {
        console.log("converting online");
        try {
            if (!this._fromCurrency || !this._toCurrency) return;
            this.rates = await (await fetch(this.url)).json();
            const value = +this.rates[this.query];
            this._convert(value);

        } catch (error) {
            this.error = error;
        };
    }

    async convertOffline(rates) {
        console.log("converting offline");
        try {
            if (!this._fromCurrency || !this._toCurrency) return;
            const value = +rates[this.query];
            this._convert(value);
        }catch (error) {
            console.log(error);
        }
    }

    async _convert(value) {
        if (value) {
            var total = value * this._amount;
            return this.result = Math.round(total * 100) / 100;
        } else {
            const error = new Error(`value not found for ${query}`);
            this.error = error;
            throw (error);
        }
    }


}

