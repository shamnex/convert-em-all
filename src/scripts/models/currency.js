
import {constants} from "../constants"
export default class Countries {
    constructor() {
    }
    async getCurrencies() {
        try {
            const { data: { results: currencies } }
                = await fetch(`${constants.BASE_URL}${constants.CURRENCIES_URL}`);
             this.currencies = Object.values(currencies);
        } catch (error) {
            console.log(error.message);
        };
    }
}

