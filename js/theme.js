/* ==========================================================
   Part 1: Theme Switcher with Persistent Preference
   Applies a saved (or default) theme on every page load, and
   wires up the toggle button once it exists in the DOM.

   Because the header (and its #theme-toggle button) is loaded
   dynamically in Part 2, the toggle can't be wired up on
   DOMContentLoaded the way a static button could. Instead this
   file exposes window.initThemeToggle(), which js/components.js
   calls right after the header markup is injected.
   ========================================================== */

document.addEventListener("DOMContentLoaded", function () {
  // Apply the saved (or default) theme immediately, before the
  // header/toggle button even exist, so there's no flash of the
  // wrong theme while the page finishes loading.
  loadSavedTheme();
});

function applyTheme(theme) {
  document.body.setAttribute("data-theme", theme);
  localStorage.setItem("theme", theme);
  updateToggleLabel(theme);
}

function loadSavedTheme() {
  const saved = localStorage.getItem("theme");
  const theme = saved === "light" || saved === "dark" ? saved : "dark";
  document.body.setAttribute("data-theme", theme);
}

function updateToggleLabel(theme) {
  const toggleBtn = document.getElementById("theme-toggle");
  if (!toggleBtn) return;
  const label = theme === "dark" ? "Light Mode" : "Dark Mode";
  toggleBtn.textContent = label;
  toggleBtn.setAttribute("aria-label", "Switch to " + label.toLowerCase());
}

// Called by js/components.js after the header has been injected.
window.initThemeToggle = function () {
  const toggleBtn = document.getElementById("theme-toggle");
  if (!toggleBtn) return;

  const currentTheme = document.body.getAttribute("data-theme") || "dark";
  updateToggleLabel(currentTheme);

  toggleBtn.addEventListener("click", function () {
    const active = document.body.getAttribute("data-theme") === "dark" ? "dark" : "light";
    const nextTheme = active === "dark" ? "light" : "dark";
    applyTheme(nextTheme);
  });
};
