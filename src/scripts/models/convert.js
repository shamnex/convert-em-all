import axios from "axios";
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
            const URL = `${constants.BASE_URL}${constants.CONVERT_URL}${query}&compact=ultra`;
            const { data: res  } = await axios.get(`${URL}`);
            const value = +res[`${query}`];

            if (value) {
                var total = value * this.amount;
                this.result = Math.round(total * 100) / 100;
            } else {
                const error = new Error(`Value not found for ${query}`);
                throw(error);
            }
        } catch (error) {
            console.log("Got an error: ", error.message);
        };
    }
}

