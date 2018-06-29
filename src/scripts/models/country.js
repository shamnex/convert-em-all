
import {constants} from "../constants"
export default class Countries {
    constructor() {
    }
    async getCountries() {
        try {
            const { results: countries } 
                = await (await fetch(`${constants.BASE_URL}${constants.COUNTRY_URL}`)).json();
             this.countries = Object.values(countries);

        } catch (error) {
            console.log(error);
        };
    }
}

