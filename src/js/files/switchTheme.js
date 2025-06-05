export default function switchTheme() {
  const btn = document.querySelector("#switch-theme-btn");
  const singleSect = document.querySelector(".s-single");

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
      singleSect.classList.add("_light");
    }

    function handleOff() {
      btn.classList.remove("_active");
      singleSect.classList.remove("_light");
    }
  }
}
