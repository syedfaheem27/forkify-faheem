import icons from "../../img/icons.svg";

export default class View {
  _data;

  render(data, render = true) {
    //Guard class
    if (!data || Object.keys(data).length === 0) return this.renderError();

    this._data = data;

    const markup = this._generateMarkup();
    if (!render) return markup;
    this._clear();
    this._parentEl.insertAdjacentHTML("afterbegin", markup);
  }
  update(data) {
    this._data = data;

    const markup = this._generateMarkup();
    const newDom = document.createRange().createContextualFragment(markup);
    const newElements = Array.from(newDom.querySelectorAll("*"));
    const currElements = Array.from(this._parentEl.querySelectorAll("*"));

    newElements.forEach((newEl, i) => {
      const currEl = currElements[i];
      if (
        !newEl.isEqualNode(currEl) &&
        newEl.firstChild?.nodeValue.trim() !== ""
      ) {
        // currEl.innerHTML = newEl.innerHTML;
        //Updating the text content
        currEl.textContent = newEl.textContent;
      }

      //Updating the attributes
      if (!newEl.isEqualNode(currEl)) {
        Array.from(newEl.attributes).forEach((attr) => {
          currEl.setAttribute(attr.name, attr.value);
        });
      }
    });
  }

  _clear() {
    this._parentEl.innerHTML = "";
  }
  renderError(message = this._errorMessage) {
    const markup = `
      <div class="error">
         <div>
           <svg>
             <use href="${icons}#icon-alert-triangle"></use>
           </svg>
         </div>
         <p>${message}</p>
      </div>`;
    this._clear();
    this._parentEl.insertAdjacentHTML("afterbegin", markup);
  }

  renderSuccess(message = this._message) {
    const markup = `
        <div class="message">
          <div>
            <svg>
              <use href="${icons}#icon-smile"></use>
            </svg>
          </div>
          <p>${message}</p>
        </div>
    `;
    this._clear();
    this._parentEl.insertAdjacentHTML("afterbegin", markup);
  }
  renderSpinner() {
    this._clear();
    const markup = `
      <div class="spinner">
        <svg>
          <use href="${icons}#icon-loader"></use>
        </svg>
      </div>
  `;
    this._parentEl.insertAdjacentHTML("afterbegin", markup);
  }
}
