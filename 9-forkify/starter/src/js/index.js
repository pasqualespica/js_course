// **************************
// **************************
//      CONTROLLER 
// **************************
// **************************

import Search from "./modules/Search";
import * as searchView from "./views/searchView";
import { elements, renderLoader, clearLoader } from "./views/base";

// state management library Redux - A Predictable State Container for JS Apps

/** Global state of the APP
 * - Search object
 * - Current recipe object
 * - Shopping list object
 * - Liked recipes
 */
const state = {}; // EMPTY at start!!!!

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
        await state.search.geResults(); // return a PROMISE

        // 5) render results on UI
        clearLoader();
        console.log(`render results on UI for [${query}]`);
        console.log(state.search.result);
        searchView.renderResults(state.search.result);
        

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
// const search = new Search("pizza");

// console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
// console.log(">>> INDEX.JS >>> CONTROLLER-v00.01");
// console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");

// console.log(search);
// search.geResults();
