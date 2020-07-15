// **************************
// **************************
//      CONTROLLER 
// **************************
// **************************

import Search from "./modules/Search";
import Recipe from "./modules/Recipe";
import * as searchView from "./views/searchView";
import * as recipeView from "./views/recipeView";
import { elements, renderLoader, clearLoader } from "./views/base";

// state management library Redux - A Predictable State Container for JS Apps

/** Global state of the APP
 * - Search object
 * - Current recipe object
 * - Shopping list object
 * - Liked recipes
 */
const state = {}; // EMPTY at start!!!!

/**
 * SEARCH CONTROLLER
 */
const controlSearch = async () => {

    // 1) Get query from view
    const query = searchView.getInput();
    console.log(`Input [${query}]`)

    if (query) {
        // 2) New Search objetc and add to `state`
        state.search = new Search(query);

        // 3) Prepare UI for the results 
        searchView.clearInput();
        searchView.clearResults();
        renderLoader(elements.searchRes);

        // 4) Search for recipies
        try {
            await state.search.geResults(); // return a PROMISE

            // 5) render results on UI
            clearLoader();
            console.log(`render results on UI for [${query}]`);
            console.log(state.search.result);
            searchView.renderResults(state.search.result);            
        } catch (error) {
            alert("Something wrong !!!!!! :( ");
            clearLoader();
        }

        

    }

};

elements.searchForm.addEventListener("submit", e => {
    e.preventDefault(); // not page refresh
    controlSearch();
})

elements.searchResPages.addEventListener("click", e => {
    // https://developer.mozilla.org/it/docs/Web/API/Element/closest
    const btn = e.target.closest(".btn-inline");
    // console.log(e.target);
    // console.log(btn);

    if (btn) {
        // https://developer.mozilla.org/en-US/docs/Web/API/HTMLOrForeignElement/dataset
        const goToPage = parseInt(btn.dataset.goto);
        searchView.clearResults();
        searchView.renderResults(state.search.result, goToPage);
        // console.log(goToPage);
    }
})


/**
 * RECIPE CONTROLLER
 */

// const r = new Recipe(47746);
// r.getRecipe();
// console.log(r);

const controlRecipe = async () => {
    // Get ID from the URL
    const id = window.location.hash.replace('#', '');
    // console.log(id);

    if (id) {
        // Prepare the UI for changes
        recipeView.clearRecipe();
        renderLoader(elements.recipe);

        // Highlight selected search item
        if (state.search) searchView.highlightSelected(id);

        // Create new receipe object
        state.recipe = new Recipe(id);

        try {
            // Get Recipe data & parse ingredients
            await state.recipe.getRecipe();
            // console.log(state.recipe.ingredients)
            state.recipe.parseIngredients();

            // Calculate serving and time
            state.recipe.calcServing();
            state.recipe.calcTime();

            // Rendere recipe
            clearLoader();
            console.log(state.recipe);

            recipeView.renderRecipe(state.recipe);

        } catch (error) {
            alert("Error processing recipe !!! : ( dajeee ");
        }

    }
};

// https://developer.mozilla.org/en-US/docs/Web/API/Window/hashchange_event
// window.addEventListener("hashchange", controlRecipe);

// https://developer.mozilla.org/it/docs/Web/Events/load
// window.addEventListener("load", controlRecipe);

// One row !!!! Woooww
["hashchange", "load"].forEach(evento => window.addEventListener(evento, controlRecipe));


// Event Delegation - handling recipe button clicks
// https://developer.mozilla.org/en-US/docs/Web/API/Element/matches

elements.recipe.addEventListener("click", e => {
    if (e.target.matches(".btn-decrease, .btn-decrease *")) {
        // Decrease button is clicked 
        if (state.recipe.servings > 1) {
            state.recipe.updateServing("dec");
            recipeView.updateServingIngredients(state.recipe);
        }
    } else if (e.target.matches(".btn-increase, .btn-increase *")) {
        // Increase button is clicked 
        state.recipe.updateServing("inc");
        recipeView.updateServingIngredients(state.recipe);
    }
    console.log(state.recipe);

});


// const search = new Search("pizza");

// console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
// console.log(">>> INDEX.JS >>> CONTROLLER-v00.01");
// console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");

// console.log(search);
// search.geResults();
