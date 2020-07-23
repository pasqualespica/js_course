// export const add = (a,b) => a + b;

// export const multiply = (a, b) => a * b;

// export const ID = 100;

import { elements } from "./base";

export const getInput = () => elements.searchInput.value; // one-line automatically return

export const clearInput = () => {
    elements.searchInput.value = "";
}

export const clearResults = () => {
    elements.searchResList.innerHTML = "";
    elements.searchResPages.innerHTML = "";
};

export const highlightSelected = id => {
    const resultsArr = Array.from(document.querySelectorAll(".results__link"));

    resultsArr.forEach(el => { el.classList.remove("results__link--active") } );

    // document.querySelector(`a[href="#${id}"]`).classList.add("results__link--active")
    document.querySelector(`.results__link[href="#${id}"]`).classList.add("results__link--active")
};

// "Pasta with tomato and spinach"
export const limitRecipeTitle = (title, limit = 17) => {

    const newTitle = [];
    
    if (title.length > limit) {
        // https://developer.mozilla.org/it/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce
        title.split(" ").reduce((acc,cur)=> {
            if (acc + cur.length <= limit) {
                newTitle.push(cur);
                return acc + cur.length;
            }
        }, 0);

        // https://developer.mozilla.org/it/docs/Web/JavaScript/Reference/Global_Objects/Array/join
        return `${newTitle.join(" ")}...`;
    }

    return title ;
};

// private function
const renderRecepie = recipe => {

    // 0:
    // image_url: "http://forkify-api.herokuapp.com/images/best_pizza_dough_recipe1b20.jpg"
    // publisher: "101 Cookbooks"
    // publisher_url: "http://www.101cookbooks.com"
    // recipe_id: "47746"
    // social_rank: 100
    // source_url: "http://www.101cookbooks.com/archives/001199.html"
    // title: "Best Pizza Dough Ever"

    const markup = `
                   <li>
                    <a class="results__link" href="#${recipe.recipe_id}">
                        <figure class="results__fig">
                            <img src="${recipe.image_url}" alt="Test">
                        </figure>
                        <div class="results__data">
                            <h4 class="results__name">${limitRecipeTitle(recipe.title)}</h4>
                            <p class="results__author">${recipe.publisher}</p>
                        </div>
                    </a>
                </li>
    `;

    // https://developer.mozilla.org/it/docs/Web/API/Element/insertAdjacentHTML

    elements.searchResList.insertAdjacentHTML("beforeend", markup);


};

/**
 * 
 * @param {*} page 
 * @param {string} type : "prev" or "next"
 */
const createButton = (page, type) => { 
    // https://developer.mozilla.org/en-US/docs/Web/API/HTMLOrForeignElement/dataset
    return `
    <button class="btn-inline results__btn--${type}" data-goto="${type === "prev" ? page - 1 : page + 1 }">
        <span>Page ${type === "prev" ? page - 1 : page + 1 }</span>
        <svg class="search__icon">
            <use href="img/icons.svg#icon-triangle-${type === "prev" ? "left" : "right" }"></use>
        </svg>
    </button>
    `;
}


// render "PREV" and "NEXT" buttons
const renderButtons = (page, numResults, numPerPage) => {
    // ceil : Returns the smallest integer greater than or equal to its numeric argument.
    const pages = Math.ceil(numResults / numPerPage) ;
    let bottone;

    // console.log(`renderButtons page ${page} pages ${pages}`)

    if (page === 1 && pages > 1) {
        // Only button to go next page
        bottone = createButton(page, "next");
    } else if (page < pages) {
        // Both buttons
        bottone = `
            ${createButton(page, "prev")}
            ${createButton(page, "next")}
            `;
    } else if (page === pages && pages > 1) {
        // Only button to go to prev page
        bottone = createButton(page, "prev");
    }

    // console.log("bottone", bottone);
    elements.searchResPages.insertAdjacentHTML("afterbegin", bottone);
};

export const renderResults = (recipes, page = 1, resultPerPage = 5) => {
    // 1. render results of current page
    const start = (page - 1) * resultPerPage;
    const end = page * resultPerPage;

    // https://developer.mozilla.org/it/docs/Web/JavaScript/Reference/Global_Objects/Array/slice
    // Il metodo slice() ritorna la copia di una porzione dell'array 
    // contenente gli elementi compresi tra inzio e fine (fine escluso). 
    // Il metodo slice() ritorna la copia dell'intero array se non 
    // contiene gli elementi di inizio e fine. 
    // L'array di partenza non viene modificato.
    recipes.slice(start, end).forEach(renderRecepie);

    // 2. render pagination button "PREV" NEXT"
    renderButtons(page, recipes.length, resultPerPage);
};