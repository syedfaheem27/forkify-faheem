import View from "./View";
import previewView from "./previewView";

class BookmarksView extends View {
  _parentEl = document.querySelector(".bookmarks__list");
  _errorMessage = "No bookmarks yet. Find a recipe and bookmark it ;)";

  _message;

  loadBookmarksHandler(handler) {
    window.addEventListener("load", handler);
  }
  _generateMarkup() {
    return this._data
      .map((bookmark) => previewView.render(bookmark, false))
      .join("");
  }
}

export default new BookmarksView();
