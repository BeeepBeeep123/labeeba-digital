/* ==========================================================
   Part 3: Dynamic Blog / News Section
   Fetches data/posts.json, sorts newest-first, and renders a
   post-card for each entry into #blog-list. The newest post
   gets a "Latest Post" badge, and each card has a Read More
   toggle that reveals the full post content.
   ========================================================== */

document.addEventListener("DOMContentLoaded", function () {
  const blogList = document.getElementById("blog-list");
  if (!blogList) return;

  fetch("data/posts.json")
    .then(function (response) { return response.json(); })
    .then(function (posts) {
      // Newest to oldest
      posts.sort(function (a, b) { return new Date(b.date) - new Date(a.date); });

      blogList.innerHTML = "";

      posts.forEach(function (post, index) {
        const postElement = document.createElement("article");
        postElement.classList.add("post-card");

        const readableDate = formatDate(post.date);
        const latestBadge = index === 0 ? '<span class="latest-badge">Latest Post</span>' : "";

        postElement.innerHTML =
          '<p class="post-meta">' + escapeHtml(post.category) + " &middot; " + readableDate + latestBadge + "</p>" +
          "<h3>" + escapeHtml(post.title) + "</h3>" +
          '<p class="post-summary">' + escapeHtml(post.summary) + "</p>" +
          '<p class="post-content" hidden>' + escapeHtml(post.content) + "</p>" +
          '<button type="button" class="read-more-btn">Read More</button>';

        blogList.appendChild(postElement);
      });

      // Read More / Show Less toggle for each card
      blogList.querySelectorAll(".read-more-btn").forEach(function (btn) {
        btn.addEventListener("click", function () {
          const card = btn.closest(".post-card");
          const summary = card.querySelector(".post-summary");
          const content = card.querySelector(".post-content");
          const isCollapsed = content.hidden;

          content.hidden = !isCollapsed;
          summary.hidden = isCollapsed;
          btn.textContent = isCollapsed ? "Show Less" : "Read More";
        });
      });

      // The filter box on this page was set up on DOMContentLoaded,
      // before these cards existed. Re-run it now in case the user
      // already typed something (harmless no-op otherwise).
      if (typeof window.reapplyFilter === "function") {
        window.reapplyFilter();
      }
    })
    .catch(function (error) {
      console.error("Error loading posts:", error);
      blogList.innerHTML = "<p>Posts couldn't be loaded right now. Please try again later.</p>";
    });
});

function formatDate(dateString) {
  const date = new Date(dateString + "T00:00:00");
  return date.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

// Minimal escaping since post content is our own JSON, not user input,
// but this keeps the render function safe if that ever changes.
function escapeHtml(str) {
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}
