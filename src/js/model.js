import { API_URL, KEY, RES_PER_PAGE } from "./config";
// import { getJSON, sendJSON } from "./helpers";
import { AJAX } from "./helpers";

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

const formatRecipeData = function (data) {
  let { recipe } = data.data;
  return {
    id: recipe.id,
    title: recipe.title,
    publisher: recipe.publisher,
    sourceUrl: recipe.source_url,
    image: recipe.image_url,
    servings: recipe.servings,
    cookingTime: recipe.cooking_time,
    ingredients: recipe.ingredients,
    ...(recipe.key && { key: recipe.key }),
  };
};

export const getRecipe = async function (id) {
  try {
    const data = await AJAX(`${API_URL}${id}`);
    state.recipe = formatRecipeData(data);
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
    const { data } = await AJAX(`${API_URL}?search=${query}`);

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
const addBookmark = function () {
  //Bookmark it
  state.recipe.bookmarked = true;

  //Push it to the bookmarks array
  state.bookmarks.push(state.recipe);
};

const removeBookmark = function (recipe) {
  //Unbookmark it
  state.recipe.bookmarked = false;

  //Delete it from bookmakrs array
  const index = state.bookmarks.findIndex(
    (bookmark) => bookmark.id === recipe.id
  );
  state.bookmarks.splice(index, 1);
};

export function toggleBookmark(recipe) {
  if (recipe.bookmarked) {
    //Recipe will already be there in the state
    removeBookmark(recipe);
  } else {
    addBookmark();
  }

  //Updating local storage
  persistBookmarks();
}

const persistBookmarks = function () {
  localStorage.setItem("bookmarks", JSON.stringify(state.bookmarks));
};

//loading bookmarks when the page loads
const init = function () {
  const bookmarks = localStorage.getItem("bookmarks");
  if (!bookmarks) return;
  state.bookmarks = JSON.parse(bookmarks);
};

init();

const clearBookmarks = function () {
  localStorage.clear("bookmarks");
};
// clearBookmarks();

export const uploadRecipe = async function (newRecipe) {
  try {
    const ingredientsArr = Object.entries(newRecipe).filter(
      (recDetail) =>
        recDetail[0].startsWith("ingredient") && recDetail[1] !== ""
    );
    const ingredients = ingredientsArr.map((ing) => {
      const ingArr = ing[1].replaceAll(" ", "").split(",");

      if (ingArr.length !== 3)
        throw new Error(
          "Wrong Ingredients format entered! Please use the correct format :)"
        );

      const [quantity, unit, description] = ingArr;
      return {
        quantity: quantity ? +quantity : null,
        unit: unit ?? "",
        description: description ?? "",
      };
    });

    const recipe = {
      title: newRecipe.title,
      publisher: newRecipe.publisher,
      source_url: newRecipe.sourceUrl,
      image_url: newRecipe.image,
      servings: +newRecipe.servings,
      cooking_time: +newRecipe.cookingTime,
      ingredients,
    };

    const data = await AJAX(`${API_URL}?key=${KEY}`, recipe);
    //Add the data into the state
    state.recipe = formatRecipeData(data);
    //Bookmark it and store it in local storage
    addBookmark();

    persistBookmarks();
  } catch (err) {
    throw err;
  }
};
