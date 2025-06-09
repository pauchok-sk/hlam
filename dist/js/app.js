(() => {
    "use strict";
    function dropdown() {
        const dropdowns = document.querySelectorAll(".dropdown");
        if (dropdowns.length) {
            const drodpownBtns = document.querySelectorAll(".dropdown-btn");
            const dropdownItems = document.querySelectorAll(".dropdown__item");
            dropdownItems.forEach((item => item.addEventListener("click", (e => e.stopPropagation()))));
            drodpownBtns.forEach((btn => {
                btn.addEventListener("click", (e => {
                    e.stopPropagation();
                    const curDropdown = btn.closest(".dropdown");
                    if (curDropdown.classList.contains("_open")) curDropdown.classList.remove("_open"); else curDropdown.classList.add("_open");
                }));
            }));
            document.addEventListener("click", (() => {
                dropdowns.forEach((d => d.classList.remove("_open")));
            }));
        }
    }
    function editSingle() {
        const titles = document.querySelectorAll(".s-single__content h2");
        if (titles.length) titles.forEach((title => {
            const span = document.createElement("span");
            span.textContent = title.textContent;
            title.innerHTML = "";
            title.appendChild(span);
        }));
    }
    function footerSize() {
        function getIOSBottomMenuHeight() {
            const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) || navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1;
            if (!isIOS) return new Promise((resolve => resolve(0)));
            const initialHeight = window.innerHeight;
            window.scrollTo(0, document.body.scrollHeight);
            return new Promise((resolve => {
                setTimeout((() => {
                    const newHeight = window.innerHeight;
                    window.scrollTo(0, 0);
                    const bottomMenuHeight = initialHeight - newHeight;
                    resolve(bottomMenuHeight > 0 ? bottomMenuHeight : 0);
                }), 300);
            }));
        }
        getIOSBottomMenuHeight().then((height => {
            alert(`Высота нижнего меню Safari: ${height}`);
        }));
    }
    function initSingleSliders() {
        const blocks = document.querySelectorAll(".wp-block-gallery");
        if (blocks.length) blocks.forEach((block => {
            block.classList.add("swiper", "s-single__slider");
            const blockImages = block.querySelectorAll(".wp-block-image");
            blockImages.forEach((i => i.classList.add("swiper-slide", "s-single__slide")));
            const wrapper = document.createElement("div");
            wrapper.classList.add("swiper-wrapper");
            wrapper.innerHTML = block.innerHTML;
            block.innerHTML = "";
            block.appendChild(wrapper);
            const sliderBtnPrev = document.createElement("div");
            sliderBtnPrev.classList.add("s-single__slider-btn", "_prev");
            sliderBtnPrev.innerHTML = `\n        <svg width="13" height="19" viewBox="0 0 13 19" fill="none" xmlns="http://www.w3.org/2000/svg">\n          <path fill-rule="evenodd" clip-rule="evenodd" d="M9.56589 3L10.6973 4.13137L5.26295 9.56569L10.6973 15L9.56589 16.1314L3.00021 9.56569L9.56589 3Z" stroke="black" stroke-width="3" />\n        </svg>\n      `;
            const sliderBtnNext = document.createElement("div");
            sliderBtnNext.classList.add("s-single__slider-btn", "_next");
            sliderBtnNext.innerHTML = `\n        <svg width="13" height="19" viewBox="0 0 13 19" fill="none" xmlns="http://www.w3.org/2000/svg">\n          <path fill-rule="evenodd" clip-rule="evenodd" d="M4.13137 16.1309L3 14.9995L8.43431 9.56517L3 4.13086L4.13137 2.99949L10.6971 9.56517L4.13137 16.1309Z" stroke="black" stroke-width="3" />\n        </svg>\n      `;
            block.prepend(sliderBtnNext);
            block.prepend(sliderBtnPrev);
            new Swiper(block, {
                speed: 800,
                slidesPerView: "auto",
                navigation: {
                    prevEl: block.querySelector(".s-single__slider-btn._prev"),
                    nextEl: block.querySelector(".s-single__slider-btn._next")
                }
            });
        }));
    }
    function modalImages() {
        const buttonsModal = document.querySelectorAll(".s-single__slide");
        if (buttonsModal.length) buttonsModal.forEach((btn => {
            btn.addEventListener("click", (e => {
                e.stopPropagation();
                e.preventDefault();
                const imgSrc = btn.querySelector("img").src;
                handleOpenModal("modal-img", imgSrc);
            }));
        }));
        function handleOpenModal(modalId, imgSrc) {
            const currentModalOpen = document.querySelector(".modal._open");
            if (currentModalOpen) currentModalOpen.classList.remove("_open");
            const currentModal = document.querySelector(`[data-modal="${modalId}"]`);
            const modalWindow = currentModal.querySelector(".modal__window");
            const btnClose = currentModal.querySelector(".modal__close");
            const currentImg = currentModal.querySelector(".modal__img");
            currentImg.src = imgSrc;
            modalTop(modalWindow);
            btnClose.addEventListener("click", handleCloseModal);
            document.addEventListener("click", handleCloseModal);
            modalWindow.addEventListener("click", (e => e.stopPropagation()));
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
            if (!currentModal) currentModal = document.querySelector("[data-modal]._open");
            const currentImg = currentModal.querySelector(".modal__img");
            setTimeout((() => currentImg.src = ""), 300);
            document.body.classList.remove("body-hidden");
            currentModal.classList.remove("_open");
            return document.removeEventListener("click", handleCloseModal);
        }
    }
    function spoller() {
        const spollersArray = document.querySelectorAll("[data-spollers]");
        if (spollersArray.length > 0) {
            const spollersRegular = Array.from(spollersArray).filter((function(item, index, self) {
                return !item.dataset.spollers.split(",")[0];
            }));
            if (spollersRegular.length) initSpollers(spollersRegular);
            let mdQueriesArray = dataMediaQueries(spollersArray, "spollers");
            if (mdQueriesArray && mdQueriesArray.length) mdQueriesArray.forEach((mdQueriesItem => {
                mdQueriesItem.matchMedia.addEventListener("change", (function() {
                    initSpollers(mdQueriesItem.itemsArray, mdQueriesItem.matchMedia);
                }));
                initSpollers(mdQueriesItem.itemsArray, mdQueriesItem.matchMedia);
            }));
            function initSpollers(spollersArray, matchMedia = false) {
                spollersArray.forEach((spollersBlock => {
                    spollersBlock = matchMedia ? spollersBlock.item : spollersBlock;
                    if (matchMedia.matches || !matchMedia) {
                        spollersBlock.classList.add("_spoller-init");
                        initSpollerBody(spollersBlock);
                        spollersBlock.addEventListener("click", setSpollerAction);
                    } else {
                        spollersBlock.classList.remove("_spoller-init");
                        initSpollerBody(spollersBlock, false);
                        spollersBlock.removeEventListener("click", setSpollerAction);
                    }
                }));
            }
            function initSpollerBody(spollersBlock, hideSpollerBody = true) {
                let spollerTitles = spollersBlock.querySelectorAll("[data-spoller]");
                if (spollerTitles.length) {
                    spollerTitles = Array.from(spollerTitles).filter((item => item.closest("[data-spollers]") === spollersBlock));
                    spollerTitles.forEach((spollerTitle => {
                        if (hideSpollerBody) {
                            spollerTitle.removeAttribute("tabindex");
                            if (!spollerTitle.classList.contains("_spoller-active")) spollerTitle.nextElementSibling.hidden = true;
                        } else {
                            spollerTitle.setAttribute("tabindex", "-1");
                            spollerTitle.nextElementSibling.hidden = false;
                        }
                    }));
                }
            }
            function setSpollerAction(e) {
                const el = e.target;
                if (el.closest("[data-spoller]")) {
                    const spollerTitle = el.closest("[data-spoller]");
                    const spollersBlock = spollerTitle.closest("[data-spollers]");
                    const oneSpoller = spollersBlock.hasAttribute("data-one-spoller");
                    const spollerSpeed = spollersBlock.dataset.spollersSpeed ? parseInt(spollersBlock.dataset.spollersSpeed) : 500;
                    if (!spollersBlock.querySelectorAll("._slide").length) {
                        if (oneSpoller && !spollerTitle.classList.contains("_spoller-active")) hideSpollersBody(spollersBlock);
                        spollerTitle.classList.toggle("_spoller-active");
                        _slideToggle(spollerTitle.nextElementSibling, spollerSpeed);
                    }
                    e.preventDefault();
                }
            }
            function hideSpollersBody(spollersBlock) {
                const spollerActiveTitle = spollersBlock.querySelector("[data-spoller]._spoller-active");
                const spollerSpeed = spollersBlock.dataset.spollersSpeed ? parseInt(spollersBlock.dataset.spollersSpeed) : 500;
                if (spollerActiveTitle && !spollersBlock.querySelectorAll("._slide").length) {
                    spollerActiveTitle.classList.remove("_spoller-active");
                    _slideUp(spollerActiveTitle.nextElementSibling, spollerSpeed);
                }
            }
            const spollersClose = document.querySelectorAll("[data-spoller-close]");
            if (spollersClose.length) document.addEventListener("click", (function(e) {
                const el = e.target;
                if (!el.closest("[data-spollers]")) spollersClose.forEach((spollerClose => {
                    const spollersBlock = spollerClose.closest("[data-spollers]");
                    const spollerSpeed = spollersBlock.dataset.spollersSpeed ? parseInt(spollersBlock.dataset.spollersSpeed) : 500;
                    spollerClose.classList.remove("_spoller-active");
                    _slideUp(spollerClose.nextElementSibling, spollerSpeed);
                }));
            }));
        }
        function dataMediaQueries(array, dataSetValue) {
            const media = Array.from(array).filter((function(item, index, self) {
                if (item.dataset[dataSetValue]) return item.dataset[dataSetValue].split(",")[0];
            }));
            if (media.length) {
                const breakpointsArray = [];
                media.forEach((item => {
                    const params = item.dataset[dataSetValue];
                    const breakpoint = {};
                    const paramsArray = params.split(",");
                    breakpoint.value = paramsArray[0];
                    breakpoint.type = paramsArray[1] ? paramsArray[1].trim() : "max";
                    breakpoint.item = item;
                    breakpointsArray.push(breakpoint);
                }));
                let mdQueries = breakpointsArray.map((function(item) {
                    return "(" + item.type + "-width: " + item.value + "px)," + item.value + "," + item.type;
                }));
                mdQueries = uniqArray(mdQueries);
                const mdQueriesArray = [];
                if (mdQueries.length) {
                    mdQueries.forEach((breakpoint => {
                        const paramsArray = breakpoint.split(",");
                        const mediaBreakpoint = paramsArray[1];
                        const mediaType = paramsArray[2];
                        const matchMedia = window.matchMedia(paramsArray[0]);
                        const itemsArray = breakpointsArray.filter((function(item) {
                            if (item.value === mediaBreakpoint && item.type === mediaType) return true;
                        }));
                        mdQueriesArray.push({
                            itemsArray,
                            matchMedia
                        });
                    }));
                    return mdQueriesArray;
                }
            }
        }
        let _slideUp = (target, duration = 500, showmore = 0) => {
            if (!target.classList.contains("_slide")) {
                target.classList.add("_slide");
                target.style.transitionProperty = "height, margin, padding";
                target.style.transitionDuration = duration + "ms";
                target.style.height = `${target.offsetHeight}px`;
                target.offsetHeight;
                target.style.overflow = "hidden";
                target.style.height = showmore ? `${showmore}px` : `0px`;
                target.style.paddingTop = 0;
                target.style.paddingBottom = 0;
                target.style.marginTop = 0;
                target.style.marginBottom = 0;
                window.setTimeout((() => {
                    target.hidden = !showmore ? true : false;
                    !showmore ? target.style.removeProperty("height") : null;
                    target.style.removeProperty("padding-top");
                    target.style.removeProperty("padding-bottom");
                    target.style.removeProperty("margin-top");
                    target.style.removeProperty("margin-bottom");
                    !showmore ? target.style.removeProperty("overflow") : null;
                    target.style.removeProperty("transition-duration");
                    target.style.removeProperty("transition-property");
                    target.classList.remove("_slide");
                    document.dispatchEvent(new CustomEvent("slideUpDone", {
                        detail: {
                            target
                        }
                    }));
                }), duration);
            }
        };
        let _slideDown = (target, duration = 500, showmore = 0) => {
            if (!target.classList.contains("_slide")) {
                target.classList.add("_slide");
                target.hidden = target.hidden ? false : null;
                showmore ? target.style.removeProperty("height") : null;
                let height = target.offsetHeight;
                target.style.overflow = "hidden";
                target.style.height = showmore ? `${showmore}px` : `0px`;
                target.style.paddingTop = 0;
                target.style.paddingBottom = 0;
                target.style.marginTop = 0;
                target.style.marginBottom = 0;
                target.offsetHeight;
                target.style.transitionProperty = "height, margin, padding";
                target.style.transitionDuration = duration + "ms";
                target.style.height = height + "px";
                target.style.removeProperty("padding-top");
                target.style.removeProperty("padding-bottom");
                target.style.removeProperty("margin-top");
                target.style.removeProperty("margin-bottom");
                window.setTimeout((() => {
                    target.style.removeProperty("height");
                    target.style.removeProperty("overflow");
                    target.style.removeProperty("transition-duration");
                    target.style.removeProperty("transition-property");
                    target.classList.remove("_slide");
                    document.dispatchEvent(new CustomEvent("slideDownDone", {
                        detail: {
                            target
                        }
                    }));
                }), duration);
            }
        };
        let _slideToggle = (target, duration = 500) => {
            if (target.hidden) return _slideDown(target, duration); else return _slideUp(target, duration);
        };
    }
    function switchTheme() {
        const btn = document.querySelector("#switch-theme-btn");
        const singleSect = document.querySelector(".s-single");
        if (btn) {
            btn.addEventListener("click", (() => {
                if (!btn.classList.contains("_active")) handleOn(); else handleOff();
            }));
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
    spoller();
    dropdown();
    switchTheme();
    editSingle();
    initSingleSliders();
    modalImages();
    footerSize();
})();