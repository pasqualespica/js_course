// **************************
// **************************
//      CONTROLLER 
// **************************
// **************************

import Search from "./modules/Search";
import Recipe from "./modules/Recipe";
import List from "./modules/List";
import Likes from "./modules/Likes";
import * as searchView from "./views/searchView";
import * as recipeView from "./views/recipeView";
import * as listView from "./views/listView";
import * as likesView from "./views/likesView";
import { elements, renderLoader, clearLoader } from "./views/base";

// state management library Redux - A Predictable State Container for JS Apps

/** Global state of the APP
 * - Search object
 * - Current recipe object
 * - Shopping list object
 * - Liked recipes
 */
const state = {}; // EMPTY at start!!!!
window.statoDAJE = state;

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

            recipeView.renderRecipe(
                state.recipe, 
                state.likes.isLiked(id));

        } catch (error) {
            console.log(error);
            alert("Error processing recipe !!! : ( dajeee ");
        }

    }
};



/**
 * LIST CONTROLLER
 */

const controlList = () => {

    // 1. Create a new list if there is none yet
    if (!state.list) state.list = new List();

    console.log("controlList controller START ...");

    // 2. Add each ingredietnt to the list and UI
    state.recipe.ingredients.forEach(el => {
        const item = state.list.addItem(el.count, el.unit, el.ingredient);
        listView.renderItem(item);
    });


}


/**
 * LIKE CONTROLLER
 */

//  ONLY FOR TEST !!!!

// state.likes = new Likes();
// likesView.toggleLikeMenu(state.likes.getNumLikes());

const controlLike = () => {

    // 1. Create a new LIKEs list if there is none yet
    if (!state.likes) state.likes = new Likes();

    console.log("controlLike controller START ...");

    const currentID = state.recipe.id;

    // user has not yet liked currente recipe
    if (!state.likes.isLiked(currentID)) {
        // 1. add like to the state
        const newLike = state.likes.addLike(
            currentID,
            state.recipe.title,
            state.recipe.author,
            state.recipe.img
        );

        // 2. Toggle the button
        likesView.toggleLikeBtn(true);

        // 3. Add like to UI
        likesView.renderLike(newLike);

        console.log(`ADD LIKE`)
        console.log(state.likes)

    // user has liked currente recipe
    } else {

        // 1. Remove the like from the state
        state.likes.deleteLike(currentID);

        // 2. Toggle the button
        likesView.toggleLikeBtn(false);

        console.log(`REMOVE LIKE---1`)

        // 3. Remove like to UI
        likesView.deleteLike(currentID);

        console.log(`REMOVE LIKE`)
        console.log(state.likes)
    }

    likesView.toggleLikeMenu(state.likes.getNumLikes());
}

// Restore liked reciper on pages LOAD

window.addEventListener("load", () => {
    state.likes = new Likes();

    // Restore from localStorare
    state.likes.readStorage();

    console.log(state.likes)

    console.log(state.likes.getNumLikes())
    likesView.toggleLikeMenu(state.likes.getNumLikes());

    console.log("Daejjjjj");
    // Erndere the exitest likes 
    state.likes.likes.forEach(like => likesView.renderLike(like))

});


// ..........................................
// ..........................................
// ..........................................
// EVENT listner ..........
// ..........................................
// ..........................................
// ..........................................


// Handle DELETE, UPDATE list item event
elements.shopping.addEventListener("click", e => {

    // https://developer.mozilla.org/it/docs/Web/API/Element/closest
    const id = e.target.closest(".shopping__item").dataset.itemid;

    console.log(`elements.shopping.addEventListener id ${id}`);

    // handle the delete button
    if (e.target.matches(".shopping__delete, .shopping__delete *")) {
        // Delete from state
        state.list.deleteItem(id);

        // Delete from UI
        listView.deleteItem(id);

        //Hanlde update
    } else if (e.target.matches(".shopping__count-value")) {
        // Read the date and UPDATE
        const valore = parseFloat(e.target.value);
        state.list.updateCount(id, valore);
    }

});


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
    } else if (e.target.matches(".recipe__btn--add, .recipe__btn *")) { 
        // CSS selector for all childs
        // add ingredietsn to shopping list
        controlList();
    } else if (e.target.matches(".recipe__love, .recipe__love *")) {
        // Like Controller
        controlLike();
    }
    console.log(state.recipe);

});


const l = new List();
window.dajee = l;

// const search = new Search("pizza");

// console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
// console.log(">>> INDEX.JS >>> CONTROLLER-v00.01");
// console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");

// console.log(search);
// search.geResults();
