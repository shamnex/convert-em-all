
import { constants } from "../constants";
export default class Countries {

    async getCurrencies() {
        try {
            // this.getCurrenciesFromDB();
            const url = `${constants.BASE_URL}${constants.CURRENCIES_URL}`;
            const { results: currencies } = await (await fetch(url)).json();
            this.currencies = Object.values(currencies);
            return currencies;

        } catch (error) {
            this.error = error;
            console.log(error);
        };
    }

    setCurrencies(currencies) {
        return this.currencies = Object.values(currencies);

    }

}

