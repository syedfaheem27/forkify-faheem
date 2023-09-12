import View from "./View";
import icons from "../../img/icons.svg";

class PaginationView extends View {
  _parentEl = document.querySelector(".pagination");

  _generateMarkup() {
    const currPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );

    //Page 1 and no other page
    if (currPage === 1 && numPages === 1) {
      return "";
    }

    //Page 1 and other pages
    if (currPage === 1 && numPages > 1) {
      // render next button only
      return `
            <button data-goto="${
              currPage + 1
            }" class="btn--inline pagination__btn--next">
                <span>Page ${currPage + 1}</span>
                <svg class="search__icon">
                  <use href="${icons}#icon-arrow-right"></use>
                </svg>
            </button> 
        `;
    }
    //Page last
    if (currPage === numPages) {
      //render prev button only
      return `
            <button data-goto="${
              currPage - 1
            }" class="btn--inline pagination__btn--prev">
                <svg class="search__icon">
                  <use href="${icons}#icon-arrow-left"></use>
                </svg>
                <span>Page ${currPage - 1}</span>
             </button>
        `;
    }

    //Other pages
    else {
      return `
          <button data-goto="${
            currPage - 1
          }" class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${currPage - 1}</span>
          </button>
          <button data-goto="${
            currPage + 1
          }" class="btn--inline pagination__btn--next">
            <span>Page ${currPage + 1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </button>
        `;
    }
  }

  addPaginationHandler(handler) {
    this._parentEl.addEventListener("click", function (e) {
      const btn = e.target.closest(".btn--inline");
      if (!btn) return;

      const goToPage = +btn.dataset.goto;
      handler(goToPage);
    });
  }
}

export default new PaginationView();
