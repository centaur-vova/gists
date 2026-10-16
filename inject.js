(function () {
  "use strict";

  // Функция скрытия элементов по выбранному селектору
  function hideElements(selector) {
    const el = document.querySelector(selector);
    if (!el) return;
    el.style.display = "none";
  }

  // Определяем сайт и выбираем соответствующий селектор
  let selector;
  switch (location.hostname) {
    case "ok.ru":
      selector = '[aria-label="Верхнее меню"]'; // Селектор для OK.ru
      break;
    case "vk.ru":
      selector =
        'section[data-testid="profile-friends-block"], [data-testid*="friends-header"]'; // Селекторы для VK.com
      break;
    default:
      console.log("Неизвестный сайт");
      return; // Выходим из функции, если не нашлось совпадения
  }

  // Пробуем скрыть сразу при загрузке страницы
  hideElements(selector);

  // Создаём наблюдатель за изменениями в дереве документа
  new MutationObserver(() => {
    hideElements(selector); // При каждом изменении пробуем снова найти элемент
  }).observe(document.body, { childList: true, subtree: true });

  // Ловим навигации внутри SPA-приложений
  window.addEventListener("popstate", () => hideElements(selector));
})();
