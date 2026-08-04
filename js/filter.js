/* ==========================================================
   Part 5: Work / Journal Filter
   Live-filters cards as the user types, matching against the
   title and category/meta text. Works on both the Work page
   (static .product-card items) and the Journal page (.post-card
   items added dynamically by js/blog.js), because the filter
   re-queries the DOM fresh on every keystroke instead of caching
   a card list up front.

   The card/title/category selectors are read from data-*
   attributes on the input itself, so this one file can drive
   the filter on more than one page layout:
     <input id="filter-input"
            data-card-selector=".product-card"
            data-title-selector="h3"
            data-category-selector=".tag">
   ========================================================== */

document.addEventListener("DOMContentLoaded", function () {
  setupFilter();
});

function setupFilter() {
  const filterInput = document.getElementById("filter-input");
  if (!filterInput) return;

  const noResults = document.getElementById("no-results");
  const cardSelector = filterInput.dataset.cardSelector || ".product-card";
  const titleSelector = filterInput.dataset.titleSelector || "h3";
  const categorySelector = filterInput.dataset.categorySelector || ".tag";

  function runFilter() {
    const query = filterInput.value.toLowerCase().trim();
    const cards = document.querySelectorAll(cardSelector);
    let visibleCount = 0;

    cards.forEach(function (card) {
      const titleEl = card.querySelector(titleSelector);
      const categoryEl = card.querySelector(categorySelector);
      const title = titleEl ? titleEl.textContent.toLowerCase() : "";
      const category = categoryEl ? categoryEl.textContent.toLowerCase() : "";

      const matches = query === "" || title.includes(query) || category.includes(query);
      card.style.display = matches ? "" : "none";
      if (matches) visibleCount++;
    });

    if (noResults) {
      noResults.classList.toggle("visible", visibleCount === 0 && cards.length > 0);
    }
  }

  filterInput.addEventListener("input", runFilter);

  // Exposed so blog.js can re-run the filter after it appends posts
  // that were fetched asynchronously (after this listener was set up).
  window.reapplyFilter = runFilter;
}
