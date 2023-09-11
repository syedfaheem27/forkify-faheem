import * as model from "./model";
import RecipeView from "./views/recipeView";
import SearchView from "./views/searchView";
import ResultsView from "./views/resultsView";
// https://forkify-api.herokuapp.com/v2

if (module.hot) {
  module.hot.accept();
}

const controlRecipes = async function () {
  try {
    //Getting hash value
    const id = window.location.hash.slice(1);
    if (!id) return;
    RecipeView.renderSpinner();

    //1. Loading recipes
    await model.getRecipe(id);

    //2.Rendering recipes
    RecipeView.render(model.state.recipe);
  } catch (err) {
    RecipeView.renderError();
  }
};

const controlSearchResults = async function () {
  try {
    //Render spinner in results view
    ResultsView.renderSpinner();
    //1.Get query from the input field
    const query = SearchView.getQuery();

    //2.Place a guard class
    if (!query) return;

    //3.Search the recipes
    await model.getSearchResults(query);

    //4.Render search results
    ResultsView.render(model.state.search.results);
  } catch (err) {
    console.error(err);
  }
};

const init = function () {
  RecipeView.addRenderHandler(controlRecipes);
  SearchView.addSearchHandler(controlSearchResults);
};

init();
// window.addEventListener("hashchange", controlRecipes);
// window.addEventListener("load", controlRecipes);
