(function () {
  "use strict";

  const menuButton = document.querySelector(".menu-toggle");
  const siteNav = document.querySelector(".site-nav");
  const docsButton = document.querySelector(".docs-nav-toggle");
  const docsNav = document.querySelector(".docs-sidebar");

  function normalizePath(path) {
    return path.endsWith("/") ? path + "index.html" : path;
  }

  document.querySelectorAll(".site-nav a[href]").forEach(function (link) {
    if (link.origin !== window.location.origin) return;
    const currentPath = normalizePath(window.location.pathname);
    const linkPath = normalizePath(new URL(link.href).pathname);
    const isHelpPage = currentPath.endsWith("/faq.html") || currentPath.endsWith("/contact.html");
    const isFieldGallery = currentPath.endsWith("/code/index.html");
    if (linkPath === currentPath ||
        (isHelpPage && linkPath.endsWith("/docs.html")) ||
        (isFieldGallery && linkPath.endsWith("/demo.html"))) {
      link.setAttribute("aria-current", "page");
    }
  });

  if (menuButton && siteNav) {
    menuButton.addEventListener("click", function () {
      const expanded = menuButton.getAttribute("aria-expanded") === "true";
      menuButton.setAttribute("aria-expanded", String(!expanded));
      menuButton.setAttribute("aria-label", expanded ? "Open navigation" : "Close navigation");
      siteNav.classList.toggle("is-open", !expanded);
    });
    siteNav.addEventListener("click", function (event) {
      if (event.target.closest("a")) {
        siteNav.classList.remove("is-open");
        menuButton.setAttribute("aria-expanded", "false");
        menuButton.setAttribute("aria-label", "Open navigation");
      }
    });
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && siteNav.classList.contains("is-open")) {
        siteNav.classList.remove("is-open");
        menuButton.setAttribute("aria-expanded", "false");
        menuButton.setAttribute("aria-label", "Open navigation");
        menuButton.focus();
      }
    });
  }

  if (docsButton && docsNav) {
    docsButton.addEventListener("click", function () {
      const expanded = docsButton.getAttribute("aria-expanded") === "true";
      docsButton.setAttribute("aria-expanded", String(!expanded));
      docsNav.classList.toggle("is-open", !expanded);
    });
    docsNav.addEventListener("click", function (event) {
      if (event.target.closest("a")) {
        docsNav.classList.remove("is-open");
        docsButton.setAttribute("aria-expanded", "false");
      }
    });
  }

  function addCopyControl(pre, card, customHeader) {
    const header = customHeader || card.querySelector(".code-card-header") || document.createElement("div");
    if (!customHeader && !header.classList.contains("code-card-header")) {
      header.className = "code-card-header";
      const language = (pre.dataset.language || "Code").toUpperCase();
      const label = document.createElement("span");
      label.textContent = language;
      header.appendChild(label);
      card.insertBefore(header, pre);
    }
    if (header.querySelector(".copy-button")) return;

    const button = document.createElement("button");
    button.className = "copy-button";
    button.type = "button";
    button.textContent = "Copy";
    button.setAttribute("aria-label", "Copy " + (pre.dataset.language || "code") + " example");
    button.addEventListener("click", async function () {
      const code = pre.querySelector("code");
      const value = code ? code.textContent : pre.textContent;
      try {
        if (navigator.clipboard && window.isSecureContext) {
          await navigator.clipboard.writeText(value);
        } else {
          const field = document.createElement("textarea");
          field.value = value;
          field.setAttribute("readonly", "");
          field.style.position = "fixed";
          field.style.opacity = "0";
          document.body.appendChild(field);
          field.select();
          const copied = document.execCommand("copy");
          field.remove();
          if (!copied) throw new Error("Copy command unavailable");
        }
        button.textContent = "Copied";
        button.setAttribute("aria-label", "Code copied to clipboard");
      } catch (error) {
        button.textContent = "Select code";
        button.setAttribute("aria-label", "Select the code to copy it");
      }
      window.setTimeout(function () {
        button.textContent = "Copy";
        button.setAttribute("aria-label", "Copy " + (pre.dataset.language || "code") + " example");
      }, 1800);
    });
    header.appendChild(button);
  }

  document.querySelectorAll("pre code").forEach(function (code) {
    const pre = code.closest("pre");
    if (!pre) return;
    const hero = pre.closest(".hero-code");
    if (hero) {
      addCopyControl(pre, hero, hero.querySelector(".window-bar"));
      return;
    }
    let card = pre.closest(".code-card");
    if (!card) {
      card = document.createElement("div");
      card.className = "code-card";
      pre.parentNode.insertBefore(card, pre);
      card.appendChild(pre);
    }
    addCopyControl(pre, card);
  });

  const article = document.querySelector(".prose");
  const onPage = document.querySelector(".on-page");
  if (article && onPage) {
    const headingList = document.createElement("div");
    article.querySelectorAll("h2[id], h3[id]").forEach(function (heading) {
      const link = document.createElement("a");
      link.href = "#" + heading.id;
      link.textContent = heading.textContent;
      headingList.appendChild(link);
    });
    onPage.appendChild(headingList);
  }

  if (typeof JnFormValidation === "function" && document.querySelector(".jnForm")) {
    new JnFormValidation({ formClass: ".jnForm", showErrorMessages: true });
  }

  if ("MutationObserver" in window) {
    document.querySelectorAll(".jnForm").forEach(function (form) {
      const updateErrorAccessibility = function () {
        form.querySelectorAll(".jn-input-wrap").forEach(function (wrapper) {
          const field = wrapper.querySelector("input, select, textarea");
          const error = wrapper.querySelector(".jn-error-message");
          if (!field) return;
          if (error) {
            if (!error.id) error.id = "jn-error-" + Math.random().toString(36).slice(2, 10);
            error.setAttribute("role", "alert");
            field.setAttribute("aria-invalid", "true");
            field.setAttribute("aria-describedby", error.id);
            field.dataset.jnErrorId = error.id;
          } else if (field.dataset.jnErrorId) {
            field.removeAttribute("aria-invalid");
            if (field.getAttribute("aria-describedby") === field.dataset.jnErrorId) {
              field.removeAttribute("aria-describedby");
            }
            delete field.dataset.jnErrorId;
          }
        });
      };
      new MutationObserver(updateErrorAccessibility).observe(form, { childList: true, subtree: true });
    });
  }
})();
