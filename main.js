// Wibble.Works — mobile nav, cookie consent (necessary-only by default)
(function () {
  "use strict";

  // Mobile navigation
  var toggle = document.getElementById("nav-toggle");
  var nav = document.getElementById("site-nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    nav.addEventListener("click", function (e) {
      if (e.target.tagName === "A") {
        nav.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  // Cookie consent: strictly-necessary only until the visitor opts in.
  var KEY = "wibble-cookie-consent-v1";
  var banner = document.getElementById("cookie-banner");
  function choice() {
    try {
      return localStorage.getItem(KEY);
    } catch (e) {
      return null;
    }
  }
  function save(value) {
    try {
      localStorage.setItem(KEY, value);
    } catch (e) {
      /* storage unavailable — banner simply reappears */
    }
    if (banner) banner.hidden = true;
  }
  if (banner && !choice()) {
    banner.hidden = false;
  }
  var accept = document.getElementById("cookie-accept");
  var reject = document.getElementById("cookie-reject");
  if (accept) accept.addEventListener("click", function () { save("accepted"); });
  if (reject) reject.addEventListener("click", function () { save("rejected"); });

  // "Cookie Settings" footer links re-open the banner.
  document.querySelectorAll('a[id^="cookie-settings-link"]').forEach(function (link) {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      if (banner) banner.hidden = false;
    });
  });
})();
