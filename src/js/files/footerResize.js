export default function footerResize() {
  function adjustFooterForSafari() {
    const footer = document.querySelector(".footer");
    if (navigator.userAgent.match(/iPhone|iPad|iPod/i)) {
      const isSafari = /^((?!CriOS).)*Safari/.test(navigator.userAgent);
      if (isSafari) {
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty("--vh", `${vh}px`);
        footer.style.paddingBottom = "calc(20px + env(safe-area-inset-bottom))";
      }
    }
  }

  window.addEventListener("resize", adjustFooterForSafari);
  window.addEventListener("DOMContentLoaded", adjustFooterForSafari);
}
