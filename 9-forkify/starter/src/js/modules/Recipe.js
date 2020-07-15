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

    parseIngredients(){
        const unitsLong = ["tablespoons", "tablespoon", "ounces", "ounce", "teaspoon", "teaspoons", "cups", "pounds" ];
        const unitsShort = ["tbsp", "tbsp", "oz", "oz", "tsp", "tsp", "cup", "pound" ];
        const units = [...unitsShort, "kg", "g"]

        const newIngredients = this.ingredients.map(el => { 
            // 1) Uniforms units
            let ingredient = el.toLowerCase();
            unitsLong.forEach((unit, i)=> {
                ingredient = ingredient.replace(unit, unitsShort[i]);
            });

            // 2) Remove parentheres
            // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions/Cheatsheet
            ingredient = ingredient.replace(/ *\([^)]*\) */g, "");

            // 3) Parse ingredients into count, unit and ingredient
            const arrIng = ingredient.split(" ");
            const unitIndex = arrIng.findIndex( el2 => units.includes(el2));

            let objIng;
            if (unitIndex > -1) {
                // there is a UNIT
                // Ex. 4 1/2 cups, arrCount is [4, 1/2]
                // Ex. 4 cups, arrCount is [4]
                const arrCount = arrIng.slice(0, unitIndex); 
                let count;
                if (arrCount.length === 1) {
                    count = eval(arrIng[0].replace("-","+"));
                } else {
                    count = eval(arrIng.slice(0,unitIndex).join("+"));
                }

                objIng = {
                    count,
                    unit : arrIng[unitIndex],
                    ingredient: arrIng.slice(unitIndex+1).join(" ")
                };

            } else if (parseInt(arrIng[0], 10)) {
                // ther is NO a unit, but 1st elem is a number
                objIng = {
                    count: parseInt(arrIng[0], 10),
                    unit : '',
                    ingredient : arrIng.slice(1).join(" ")
                };
            } else if (unitIndex === -1 ) {
                // there is NO a unit and NO number as 1st elem
                objIng = {
                    count : 1,
                    unit : '',
                    // ingredient : ingredient  // EQUAL !!!!
                    ingredient
                };
            }


            // return ingredient;
            return objIng;
        });

        this.ingredients = newIngredients;
    }


    updateServing(type) {
        // Servings
        const newServings = type == "dec" ? this.servings - 1 : this.servings + 1;

        // Ingredients 
        this.ingredients.forEach(el => {
            el.count *=  (newServings / this.servings);
        });

        this.servings = newServings;

    }
}