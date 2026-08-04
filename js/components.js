/* ==========================================================
   Part 2: Dynamic Header & Footer
   Fetches components/header.html and components/footer.html
   and injects them into their placeholder elements, so the
   nav and footer only have to be maintained in one place.

   Must be served over HTTP (fetch() will not work from a
   file:// URL). Run a local server from the project root, e.g.:
     python3 -m http.server 8000
   then visit http://localhost:8000/
   ========================================================== */

function loadComponent(selector, filePath, callback) {
  fetch(filePath)
    .then(function (response) {
      if (!response.ok) throw new Error("Could not load " + filePath);
      return response.text();
    })
    .then(function (html) {
      document.querySelector(selector).innerHTML = html;
      if (typeof callback === "function") callback();
    })
    .catch(function (error) {
      console.error(error);
    });
}

// Marks the nav link that matches the current page with aria-current="page".
function highlightActiveNav() {
  const currentPage = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav-links a").forEach(function (link) {
    if (link.getAttribute("href") === currentPage) {
      link.setAttribute("aria-current", "page");
    }
  });
}

document.addEventListener("DOMContentLoaded", function () {
  loadComponent("#header-placeholder", "components/header.html", function () {
    // The theme toggle button now exists in the DOM — wire it up.
    highlightActiveNav();
    if (typeof window.initThemeToggle === "function") {
      window.initThemeToggle();
    }
  });

  loadComponent("#footer-placeholder", "components/footer.html");
});
