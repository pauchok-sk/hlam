export default function footerSize() {
  function getIOSBottomMenuHeight() {
    // Проверяем iOS (включая iPad с сенсорным управлением)
    const isIOS =
      /iPad|iPhone|iPod/.test(navigator.userAgent) ||
      (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);

    if (!isIOS) return new Promise(resolve => resolve(0));

    // Запоминаем начальную высоту (когда меню видно)
    const initialHeight = window.innerHeight;

    // Прокручиваем вниз, чтобы меню скрылось
    window.scrollTo(0, document.body.scrollHeight);

    return new Promise((resolve) => {
      setTimeout(() => {
        const newHeight = window.innerHeight;
        // Возвращаем скролл обратно
        window.scrollTo(0, 0);

        // Разница в высоте — это высота нижнего меню
        const bottomMenuHeight = initialHeight - newHeight;
        resolve(bottomMenuHeight > 0 ? bottomMenuHeight : 0);
      }, 300); // Даём время на скрытие меню
    });
  }

  // Использование
  getIOSBottomMenuHeight().then((height) => {
    alert(`Высота нижнего меню Safari: ${height}`);
  });
}
