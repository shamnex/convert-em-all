
import {constants} from "../constants"
export default class Countries {
    constructor() {
    }
    async getCurrencies() {
        try {
            const { results: currencies } 
                = await ( await fetch(`${constants.BASE_URL}${constants.CURRENCIES_URL}`)).json();
                console.log(currencies);
             this.currencies = Object.values(currencies);
        } catch (error) {
            console.log(error.message);
        };
    }
}

