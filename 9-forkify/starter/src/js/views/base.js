export const elements = {
    searchInput: document.querySelector(".search__field"),
    searchForm: document.querySelector(".search"),
    searchResList: document.querySelector(".results__list"),
    searchRes: document.querySelector(".results"),
    searchResPages: document.querySelector(".results__pages"),
    recipe: document.querySelector(".recipe"),
    shopping: document.querySelector(".shopping__list")
}

export const elementStrings = {
    loader : 'loader',

}

// LOADER che va bene un po da per tutto !!!! : )
// vedi .loader into css/style.css
export const renderLoader = (parent) => {

    const loader = `
        <div class="${elementStrings.loader}">
            <svg>
                <use href="img/icons.svg#icon-cw"></use>
            </svg>
        <div>
    `;

    parent.insertAdjacentHTML("afterbegin", loader);

};

export const clearLoader = () => {

    const loader = document.querySelector(`.${elementStrings.loader}`);

    if (loader) {
        // https://developer.mozilla.org/en-US/docs/Web/API/Node/removeChild
        loader.parentElement.removeChild(loader);
    }

};