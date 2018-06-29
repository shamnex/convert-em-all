
import axios from "axios";
import {constants} from "../constants"
export default class Countries {
    constructor() {
    }
    async getCurrencies() {
        try {
            const { data: { results: currencies } }
                = await axios.get(`${constants.BASE_URL}${constants.CURRENCIES_URL}`);
             this.currencies = Object.values(currencies);
        } catch (error) {
            console.log(error.message);
        };
    }
}

