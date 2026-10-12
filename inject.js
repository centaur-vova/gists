(function () {
  "use strict";

  function hideMenu() {
    const el = document.querySelector('[aria-label="Верхнее меню"]');
    if (el) el.style.display = "none";
  }

  // Пробуем сразу
  hideMenu();

  // ok.ru — SPA, меню может появиться/перерисоваться позже.
  // MutationObserver ловит его появление и скрывает.
  new MutationObserver(hideMenu).observe(document.documentElement, {
    childList: true,
    subtree: true,
  });

  // На случай SPA-навигации (переходы внутри ok.ru без полной перезагрузки)
  window.addEventListener("popstate", hideMenu);
  window.addEventListener("pushstate", hideMenu);
  window.addEventListener("replacestate", hideMenu);
})();
