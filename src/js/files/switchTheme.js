export default function switchTheme() {
  const btn = document.querySelector("#switch-theme-btn");

  if (btn) {
    btn.addEventListener("click", () => {
      if (!btn.classList.contains("_active")) {
        handleOn();
      } else {
        handleOff();
      }
    });

    function handleOn() {
      btn.classList.add("_active");
    }

    function handleOff() {
      btn.classList.remove("_active");
    }
  }
}
