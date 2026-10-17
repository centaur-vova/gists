(function () {
  "use strict";

  // Функция скрытия элементов по выбранному селектору
  function hideElements(selector) {
    document
      .querySelectorAll(selector)
      .forEach((el) => (el.style.display = "none"));
  }

  // Определяем сайт и выбираем соответствующий селектор
  let selector;
  switch (location.hostname) {
    case "ok.ru":
      selector = '[aria-label="Верхнее меню"]'; // Селектор для OK.ru
      break;
    case "vk.ru":
      selector =
        '[data-testid="profile-narrow-column"], #ads_wrapper, #page_header_cont';
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
