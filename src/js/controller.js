import * as model from "./model";
import recipeView from "./views/recipeView";

//5ed6604591c37cdc054bcd09
//5ed6604591c37cdc054bcc13

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

const controlRecipe = async function () {
  try {
    //Getting hash value
    const id = window.location.hash.slice(1);
    if (!id) return;
    recipeView.renderSpinner();

    //1. Loading recipes
    await model.getRecipe(id);

    //2.Rendering recipes
    recipeView.render(model.state.recipe);
  } catch (err) {
    alert(err.message);
  }
};

//Loading recipe on hashchange and loading
["hashchange", "load"].forEach((ev) => {
  window.addEventListener(ev, controlRecipe);
});
// window.addEventListener("hashchange", controlRecipe);
// window.addEventListener("load", controlRecipe);
