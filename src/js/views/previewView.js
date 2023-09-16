import View from "./View";
import icons from "../../img/icons.svg";
class PreviewView extends View {
  /**
   * Generates a markup which serves as a preview of the data in the PreviewView instance
   * @returns {string} returns a markup string
   * @this {Object} PreviewView instance
   * @author Faheem Tahir
   */
  _generateMarkup() {
    const id = window.location.hash.slice(1);
    return `
         <li class="preview">
           <a class="preview__link ${
             id === this._data.id ? "preview__link--active" : ""
           }" href="#${this._data.id}">
             <figure class="preview__fig">
               <img src="${this._data.image}" alt=${this._data.title} />
             </figure>
             <div class="preview__data">
               <h4 class="preview__title">${this._data.title}...</h4>
               <p class="preview__publisher">${this._data.publisher}</p>
               <div class="recipe__user-generated ${
                 this._data.key ? "" : "hidden"
               }">
                  <svg>
                   <use href="${icons}#icon-user"></use>
                  </svg>
               </div>
             </div>
           </a>
    </li>        
        `;
  }
}

export default new PreviewView();
