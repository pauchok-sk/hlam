export default function initSingleSliders() {
  const blocks = document.querySelectorAll(".wp-block-gallery");

  if (blocks.length) {
    blocks.forEach((block) => {
      // делаем структуру слайдера
      block.classList.add("swiper", "s-single__slider");

      const blockImages = block.querySelectorAll(".wp-block-image");
      blockImages.forEach((i) =>
        i.classList.add("swiper-slide", "s-single__slide")
      );

      const wrapper = document.createElement("div");
      wrapper.classList.add("swiper-wrapper");
      wrapper.innerHTML = block.innerHTML;
      block.innerHTML = "";
      block.appendChild(wrapper);

      // создаем навигационные стрелки
      const sliderBtnPrev = document.createElement("div");
      sliderBtnPrev.classList.add("s-single__slider-btn", "_prev");
      sliderBtnPrev.innerHTML = `
        <svg width="13" height="19" viewBox="0 0 13 19" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M9.56589 3L10.6973 4.13137L5.26295 9.56569L10.6973 15L9.56589 16.1314L3.00021 9.56569L9.56589 3Z" stroke="black" stroke-width="3" />
        </svg>
      `;
      const sliderBtnNext = document.createElement("div");
      sliderBtnNext.classList.add("s-single__slider-btn", "_next");
      sliderBtnNext.innerHTML = `
        <svg width="13" height="19" viewBox="0 0 13 19" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M4.13137 16.1309L3 14.9995L8.43431 9.56517L3 4.13086L4.13137 2.99949L10.6971 9.56517L4.13137 16.1309Z" stroke="black" stroke-width="3" />
        </svg>
      `;
      block.prepend(sliderBtnNext);
      block.prepend(sliderBtnPrev);

      // инициализируем слайдер
      const swiper = new Swiper(block, {
        speed: 800,
        slidesPerView: "auto",
        autoplay: {
          delay: 3000,
        },
        navigation: {
          prevEl: block.querySelector(".s-single__slider-btn._prev"),
          nextEl: block.querySelector(".s-single__slider-btn._next"),
        },
      });
    });
  }
}
