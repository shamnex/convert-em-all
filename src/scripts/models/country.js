
import {constants} from "../constants"
export default class Countries {
    constructor() {
    }
    async getCountries() {
        try {
            const { data: { results: countries } }
                = await fetch(`${constants.BASE_URL}${constants.COUNTRY_URL}`);
             this.countries = Object.values(countries);

        } catch (error) {
            console.log(error);
        };
    }
}

