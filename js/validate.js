/* ==========================================================
   Part 4: Contact Form Validation
   Validates name, email, and message on submit, shows inline
   errors beneath each field, clears them as the user corrects
   their input, and swaps the form for a success message once
   everything passes.
   ========================================================== */

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("contact-form");
  if (!form) return;

  function showError(fieldId, message) {
    const field = document.getElementById(fieldId);
    const errorEl = field.parentElement.querySelector(".error-msg");
    if (errorEl) {
      errorEl.textContent = message;
      errorEl.classList.add("visible");
    }
    field.classList.add("invalid");
  }

  function clearError(fieldId) {
    const field = document.getElementById(fieldId);
    const errorEl = field.parentElement.querySelector(".error-msg");
    if (errorEl) {
      errorEl.textContent = "";
      errorEl.classList.remove("visible");
    }
    field.classList.remove("invalid");
  }

  function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    let isValid = true;

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    if (name === "") {
      showError("name", "Please enter your name.");
      isValid = false;
    } else {
      clearError("name");
    }

    if (email === "") {
      showError("email", "Please enter your email address.");
      isValid = false;
    } else if (!validateEmail(email)) {
      showError("email", "Please enter a valid email address (e.g. you@example.com).");
      isValid = false;
    } else {
      clearError("email");
    }

    if (message.length < 20) {
      showError("message", "Message should be at least 20 characters (" + message.length + "/20 so far).");
      isValid = false;
    } else {
      clearError("message");
    }

    if (isValid) {
      form.hidden = true;
      const successEl = document.getElementById("form-success");
      if (successEl) successEl.hidden = false;
    }
  });

  // Clear each field's error as soon as the user starts fixing it.
  ["name", "email", "message"].forEach(function (id) {
    const field = document.getElementById(id);
    if (field) {
      field.addEventListener("input", function () {
        clearError(id);
      });
    }
  });
});
