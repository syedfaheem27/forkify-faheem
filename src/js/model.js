import { API_URL, RES_PER_PAGE } from "./config";
import { getJSON } from "./helpers";
export const state = {
  recipe: {},
  search: {
    query: "",
    results: [],
    page: 1,
    resultsPerPage: RES_PER_PAGE,
  },
  bookmarks: [],
};

export const getRecipe = async function (id) {
  try {
    const data = await getJSON(`${API_URL}${id}`);
    let { recipe } = data.data;
    state.recipe = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceUrl: recipe.source_url,
      image: recipe.image_url,
      servings: recipe.servings,
      cookingTime: recipe.cooking_time,
      ingredients: recipe.ingredients,
    };
    //Persisting the bookmark state upon loading a new recipe
    if (state.bookmarks.some((bookmark) => bookmark.id === state.recipe.id))
      state.recipe.bookmarked = true;
    else state.recipe.bookmarked = false;
  } catch (err) {
    throw err;
  }
};

export const getSearchResults = async function (query) {
  try {
    state.search.query = query;
    const { data } = await getJSON(`${API_URL}?search=${query}`);

    state.search.results = data.recipes.map((rec) => {
      //Add bookmarked property to every result -- This creates an overkill -- unnecessary
      // const recipe = {
      //   id: rec.id,
      //   title: rec.title,
      //   publisher: rec.publisher,
      //   image: rec.image_url,
      // };
      // if (state.bookmarks.some((bookmark) => bookmark.id === rec.id))
      //   return { ...recipe, bookmarked: true };
      // else return { ...recipe, bookmarked: false };
      return {
        id: rec.id,
        title: rec.title,
        publisher: rec.publisher,
        image: rec.image_url,
      };
    });
    state.search.page = 1;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export function getResultsPerPage(page = state.search.page) {
  state.search.page = page;
  const start = (page - 1) * state.search.resultsPerPage;
  const end = page * state.search.resultsPerPage;

  return state.search.results.slice(start, end);
}

export function updateRecipeServings(newServings) {
  state.recipe.ingredients.forEach((ing) => {
    ing.quantity = (ing.quantity * newServings) / state.recipe.servings;
  });
  state.recipe.servings = newServings;
}

//----------------------
export function toggleBookmark(recipe) {
  if (recipe.bookmarked) {
    //Unbookmark it
    state.recipe.bookmarked = false;

    //Delete it from bookmakrs array
    const index = state.bookmarks.findIndex(
      (bookmark) => bookmark.id === recipe.id
    );

    state.bookmarks.splice(index, 1);
  } else {
    //Bookmark it
    state.recipe.bookmarked = true;

    //Push it to the bookmarks array
    state.bookmarks.push(state.recipe);
  }
}
