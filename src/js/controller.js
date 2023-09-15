import * as model from "./model";
import recipeView from "./views/recipeView";
import searchView from "./views/searchView";
import resultsView from "./views/resultsView";
import paginationView from "./views/paginationView";
import bookmarksView from "./views/bookmarksView";

// https://forkify-api.herokuapp.com/v2

// if (module.hot) {
//   module.hot.accept();
// }

const controlRecipes = async function () {
  try {
    //Getting hash value
    const id = window.location.hash.slice(1);
    if (!id) return;
    recipeView.renderSpinner();

    //1. Loading recipe

    // resultsView.render(model.getResultsPerPage());
    resultsView.update(model.getResultsPerPage());

    await model.getRecipe(id);

    //2.Rendering recipe
    recipeView.render(model.state.recipe);

    //3. Updating bookmarks -- unnecessary as we are rendering the bookmark on loading    // bookmarksView.update(model.state.bookmarks);
  } catch (err) {
    recipeView.renderError();
    console.error(err);
  }
};

const controlSearchResults = async function () {
  try {
    //Render spinner in results view
    resultsView.renderSpinner();
    //1.Get query from the input field
    const query = searchView.getQuery();

    //2.Place a guard class
    if (!query) return;

    //3.Search the recipes
    await model.getSearchResults(query);

    //4.Render search results
    // resultsView.render(model.state.search.results);

    // Render results per page
    resultsView.render(model.getResultsPerPage());

    //Render pagination buttons
    paginationView.render(model.state.search);
  } catch (err) {
    console.error(err);
  }
};

const controlPagination = function (goToPage) {
  // Render new results per page
  resultsView.render(model.getResultsPerPage(goToPage));

  //Render new pagination buttons
  paginationView.render(model.state.search);
};

const controlServings = function (newServings) {
  //update serving size
  model.updateRecipeServings(newServings);

  //Render recipe with new serving size
  // recipeView.render(model.state.recipe);
  recipeView.update(model.state.recipe);
};

const controlToggleBookmarks = function (recipe) {
  //toggle the bookmark
  model.toggleBookmark(recipe);

  //update the view
  recipeView.update(model.state.recipe);

  //Render the bookmarks
  bookmarksView.render(model.state.bookmarks);
};

const controlBookmarks = function () {
  bookmarksView.render(model.state.bookmarks);
};

const init = function () {
  recipeView.addRenderHandler(controlRecipes);
  recipeView.addUpdateServingsHandler(controlServings);
  recipeView.addBookmarkHandler(controlToggleBookmarks);
  searchView.addSearchHandler(controlSearchResults);
  paginationView.addPaginationHandler(controlPagination);
  bookmarksView.loadBookmarksHandler(controlBookmarks);
};

init();
// window.addEventListener("hashchange", controlRecipes);
// window.addEventListener("load", controlRecipes);
