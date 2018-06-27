import axios from "axios";
import {constants} from "../constants"


export default class Conversion {
    constructor(amount, fromCurrency, toCurrency) {
        console.log(toCurrency);
        this.amount = amount;
        this.fromCurrency = fromCurrency;
        this.toCurrency = toCurrency;
    }
    async convertCurrency() {
        try {
            const query = `${this.fromCurrency}_${this.toCurrency}`;
            const URL = `${constants.BASE_URL}/api/v5/convert?q=${query}&compact=ultra`;

            const { data: value } = await axios.get(`${URL}`);
            if (value) {
                var total = value * this.amount;
                this.result = Math.round(total * 100) / 100;
                console.log(this.result);
            } else {
                const error = new Error(`Value not found for ${query}`);
                console.log(error);
                throw(error);
            }
        } catch (error) {
            console.log("Got an error: ", error);
        };
    }
}

