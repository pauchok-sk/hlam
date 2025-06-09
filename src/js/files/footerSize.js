export default function footerSize() {
  function getIOSBottomMenuHeight() {
    if (!window.visualViewport) return 0;

    console.log(window.visualViewport)

    const viewport = window.visualViewport;
    const initialHeight = viewport.height;

    return new Promise((resolve) => {
      setTimeout(() => {
        const newHeight = viewport.height;
        window.scrollTo(0, 0);

        const bottomMenuHeight = initialHeight - newHeight;
        resolve(bottomMenuHeight > 0 ? bottomMenuHeight : 0);
      }, 300);
    });
  }

  // Использование
  getIOSBottomMenuHeight().then((height) => {
    alert(`Высота нижнего меню Safari: ${height}`);
  });
}
