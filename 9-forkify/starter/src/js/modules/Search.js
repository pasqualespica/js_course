// export default "I'm an exported string DAEJEEEE";

import axios from "axios";

export default class Search {
    constructor(query){
        this.query = query;
    }


    async geResults() {
        try {
            // see Forkify API v1 documentation
            // http://forkify-api.herokuapp.com/
            const url = "https://forkify-api.herokuapp.com/api/search";

            // axios like a FETCH - Promise but result is just a JSON
            const response = await axios(`${url}?q=${this.query}`);

            // console.log(`I have read >> ${ressponse.data.count} << RECEPIEs`);
            // console.log(">>>>>>>>>> RESPONSE >>>>>>>>>>>>>>>>>>>>");
            // console.log(ressponse);
            // console.log(">>>>>>>>>> RESPONSE >>>>>>>>>>>>>>>>>>>>");
            this.result = response.data.recipes;
            // console.log(":::::::::: recipes :::::::::::::::::::::");
            // console.log(this.result);
            // console.log(":::::::::: recipes :::::::::::::::::::::");
        } catch (error) {
            alert(error);
        }

    }
}
