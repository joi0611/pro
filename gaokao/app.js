(function () {
  "use strict";

  const toast = document.getElementById("toast");
  const pendingButtons = document.querySelectorAll(".pending-link");
  let toastTimer = null;

  function showToast(message) {
    if (!toast) return;

    window.clearTimeout(toastTimer);
    toast.textContent = message;
    toast.classList.add("is-visible");

    toastTimer = window.setTimeout(function () {
      toast.classList.remove("is-visible");
    }, 2600);
  }

  pendingButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      const subject = button.dataset.subject || "该专项";
      showToast(subject + "正在搭建中，尽情期待。");
    });
  });
}());
