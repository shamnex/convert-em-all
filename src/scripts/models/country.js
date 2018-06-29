
import {constants} from "../constants"
export default class Countries {
    constructor() {
    }
    async getCountries() {
        try {
            const url = `${constants.BASE_URL}${constants.COUNTRY_URL}`;
            const { results: countries } =
                 await (await fetch(url)).json();
             this.countries = Object.values(countries);

        } catch (error) {
            console.log(error);
        };
    }
}

