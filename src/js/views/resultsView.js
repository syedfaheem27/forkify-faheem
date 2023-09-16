import View from "./View";
import previewView from "./previewView";
class Resultsview extends View {
  _parentEl = document.querySelector(".results");
  _errorMessage =
    "No recipes found for your query! Try again with a valid query";

  _message;
  /**
   * Generates a markup which is then inserted to the DOM
   * @returns {string} returns a markup string
   * @this {Object} ResultsView instance
   * @author Faheem Tahir
   */
  _generateMarkup() {
    return this._data
      .map((bookmark) => previewView.render(bookmark, false))
      .join("");
  }
}

export default new Resultsview();
