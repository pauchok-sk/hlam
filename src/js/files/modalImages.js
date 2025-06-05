export default function modalImages() {
  const buttonsModal = document.querySelectorAll(".s-single__slide");

  if (buttonsModal.length) {
    buttonsModal.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        e.preventDefault();

        const imgSrc = btn.querySelector("img").src;
        handleOpenModal("modal-img", imgSrc);
      });
    });
  }

  function handleOpenModal(modalId, imgSrc) {
    const currentModalOpen = document.querySelector(".modal._open");

    if (currentModalOpen) {
      currentModalOpen.classList.remove("_open");
    }

    const currentModal = document.querySelector(`[data-modal="${modalId}"]`);
    const modalWindow = currentModal.querySelector(".modal__window");
    const btnClose = currentModal.querySelector(".modal__close");

    const currentImg = currentModal.querySelector(".modal__img");
    currentImg.src = imgSrc;

    modalTop(modalWindow);

    btnClose.addEventListener("click", handleCloseModal);

    document.addEventListener("click", handleCloseModal);
    modalWindow.addEventListener("click", (e) => e.stopPropagation());

    currentModal.classList.add("_open");
    document.body.classList.add("body-hidden");
  }

  function modalTop(modalWindow) {
    const windowHeight = document.documentElement.clientHeight;
    const modalHeight = modalWindow.clientHeight;

    const offsetTop = (windowHeight - modalHeight) / 2;
    const marginTop = offsetTop > 20 ? `${offsetTop}px` : "50px";

    modalWindow.style.marginTop = marginTop;
  }

  function handleCloseModal(e) {
    let currentModal = e.target.closest("[data-modal]");

    if (!currentModal)
      currentModal = document.querySelector("[data-modal]._open");

    const currentImg = currentModal.querySelector(".modal__img");

    setTimeout(() => (currentImg.src = ""), 300);

    document.body.classList.remove("body-hidden");
    currentModal.classList.remove("_open");

    return document.removeEventListener("click", handleCloseModal);
  }
}
