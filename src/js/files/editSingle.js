export default function editSingle() {
  const titles = document.querySelectorAll(".s-single__content h2");

  if (titles.length) {
    titles.forEach(title => {
      const span = document.createElement("span");
      span.textContent = title.textContent;
      title.innerHTML = "";
      title.appendChild(span)
    })
  }
}