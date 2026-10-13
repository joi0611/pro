(function () {
  "use strict";
  function addPrintButton() {
    var host = document.querySelector(".topbar-inner");
    if (!host || host.querySelector(".topbar-print")) return;
    var button = document.createElement("button");
    button.type = "button";
    button.className = "topbar-print";
    button.textContent = "打印本讲";
    button.setAttribute("aria-label", "打印本讲讲义");
    button.addEventListener("click", function () { window.print(); });
    host.appendChild(button);
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", addPrintButton, { once: true });
  else addPrintButton();
})();
