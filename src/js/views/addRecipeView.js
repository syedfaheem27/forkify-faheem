import View from "./View";
import previewView from "./previewView";

class AddRecipeView extends View {
  _parentEl = document.querySelector(".upload");
  _window = document.querySelector(".add-recipe-window");
  _overlay = document.querySelector(".overlay");
  _btnOpen = document.querySelector(".nav__btn--add-recipe");
  _btnClose = document.querySelector(".btn--close-modal");
  _message = "The recipe was successfully uploaded :)";

  constructor() {
    super();
    this._showWindowHandler();
    this._hideWindowHandler();
  }
  toggleWindow() {
    this._window.classList.toggle("hidden");
    this._overlay.classList.toggle("hidden");
  }

  _showWindowHandler() {
    this._btnOpen.addEventListener("click", this.toggleWindow.bind(this));
  }

  _hideWindowHandler() {
    this._btnClose.addEventListener("click", this.toggleWindow.bind(this));
    this._overlay.addEventListener("click", this.toggleWindow.bind(this));
  }

  addRecipeHandler(handler) {
    this._parentEl.addEventListener("submit", function (e) {
      e.preventDefault();
      const dataArr = [...new FormData(this)];
      const data = Object.fromEntries(dataArr);
      handler(data);
    });
  }
  _generateMarkup() {}
}

export default new AddRecipeView();
