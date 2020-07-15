import axios from "axios";

export default class Recipe {
    constructor(id) {
        this.id = id;
    }


    async getRecipe() {
        try {
            // see Forkify API v1 documentation
            // http://forkify-api.herokuapp.com/

            
            const url = "https://forkify-api.herokuapp.com/api/";
            // Ex : Returns the details about a specific recipe
            // https://forkify-api.herokuapp.com/api/get?rId=47746

            // axios like a FETCH - Promise but result is just a JSON
            const response = await axios(`${url}get?rId=${this.id}`);
            this.title = response.data.recipe.title;
            this.author = response.data.recipe.publisher;
            this.img = response.data.recipe.image_url;
            this.url = response.data.recipe.source_url;
            this.ingredients = response.data.recipe.ingredients;

            // console.log(response)

        } catch (error) {
            console.log(error);
            alert("Something went wrog :(");
        }
    }


    calcTime() {
        // Assuming we need 15min for each 3 ingredients
        const numIng = this.ingredients.length;
        const periods = Math.ceil(numIng / 3);
        this.time = periods * 15;
    }

    calcServing() {
        this.servings = 4;
    }
}