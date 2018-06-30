
import {constants} from "../constants"
export default class Countries {
    constructor() {
    }
    async getCurrencies() {
        try {
            const url = `${constants.BASE_URL}${constants.CURRENCIES_URL}`;
            const { results: currencies } = await ( await fetch(url)).json();
             this.currencies = Object.values(currencies);
        } catch (error) {
            this.error = error;
            console.log(error);
        };
    }
}

