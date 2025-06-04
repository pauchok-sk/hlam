export default function dropdown() {
  const dropdowns = document.querySelectorAll(".dropdown");

  if (dropdowns.length) {
    const drodpownBtns = document.querySelectorAll(".dropdown-btn");
    const dropdownItems = document.querySelectorAll(".dropdown__item");

    dropdownItems.forEach((item) =>
      item.addEventListener("click", (e) => e.stopPropagation())
    );

    drodpownBtns.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();

        const curDropdown = btn.closest(".dropdown");

        if (curDropdown.classList.contains("_open")) {
          curDropdown.classList.remove("_open");
        } else {
          curDropdown.classList.add("_open");
        }
      });
    });

    document.addEventListener("click", () => {
      dropdowns.forEach((d) => d.classList.remove("_open"));
    });
  }
}
