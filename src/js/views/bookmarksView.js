import View from "./View";
import previewView from "./previewView";

class BookmarksView extends View {
  _parentEl = document.querySelector(".bookmarks__list");
  _errorMessage = "No bookmarks yet. Find a recipe and bookmark it ;)";

  _message;

  loadBookmarksHandler(handler) {
    window.addEventListener("load", handler);
  }

  /**
   * Generates a markup string to be inserted to the DOM
   * @returns {string} returns markup string
   * @this {Object} BookmarksView instance
   * @author Faheem Tahir
   */
  _generateMarkup() {
    return this._data
      .map((bookmark) => previewView.render(bookmark, false))
      .join("");
  }
}

export default new BookmarksView();
