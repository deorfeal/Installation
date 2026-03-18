// ============================================================
// PAGES
// ============================================================

const pages = {
  greating: document.querySelector(".greating"),
  choose: document.querySelector(".choose"),
  histories: document.querySelector(".histories"),
};

function showPage(name) {
  Object.values(pages).forEach((p) => p && (p.style.display = "none"));
  if (pages[name]) pages[name].style.display = "block";
}

showPage("greating");

// ============================================================
// GREATING → CHOOSE
// ============================================================

function bindGreatingClick() {
  pages.greating.addEventListener("click", function handler() {
    showPage("choose");
    pages.greating.removeEventListener("click", handler);
  });
}

bindGreatingClick();

// ============================================================
// CURSOR
// ============================================================

const cursor = document.querySelector(".main__cursor");

let mouseX = 0;
let mouseY = 0;
let posX = 0;
let posY = 0;

document.addEventListener("mousemove", (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

function animateCursor() {
  posX += (mouseX - posX) * 0.15;
  posY += (mouseY - posY) * 0.15;
  cursor.style.left = posX + "px";
  cursor.style.top = posY + "px";
  requestAnimationFrame(animateCursor);
}

animateCursor();

// ============================================================
// INFORMATION ITEMS
// ============================================================

document.querySelectorAll(".information-item").forEach((item) => {
  item.addEventListener("click", () => {
    document
      .querySelectorAll(".information-item")
      .forEach((el) => el.classList.remove("information-item--acitve"));
    document
      .querySelectorAll(".information-subitem")
      .forEach((el) => el.classList.remove("information-subitem--active"));

    item.classList.add("information-item--acitve");

    const index = [...document.querySelectorAll(".information-item")].indexOf(item);
    const subitems = document.querySelectorAll(".information-subitem");
    if (subitems[index]) subitems[index].classList.add("information-subitem--active");
  });
});

// ============================================================
// ADDITIONAL TOGGLE
// ============================================================

document.querySelectorAll(".additional").forEach((card) => {
  card.addEventListener("click", (e) => {
    if (e.target.closest(".additional-content")) return;
    card.classList.toggle("additional--active");
  });
});

// ============================================================
// VIDEOS
// ============================================================

if (document.querySelector(".videos")) {
  document.querySelectorAll(".videos-item").forEach((item) => {
    item.addEventListener("click", () => {
      const video = item.querySelector(".videos-item__video");
      const isActive = item.classList.contains("videos-item--active");

      if (isActive) {
        item.classList.remove("videos-item--active");
        video.pause();
      } else {
        item.classList.add("videos-item--active");
        video.play();
      }
    });
  });
}

// ============================================================
// CARDS SWIPER
// ============================================================

const cardsSwiper = new Swiper(".cards-swiper", {
  slidesPerView: 6,
  loop: true,
  spaceBetween: 0,
  speed: 750,
  centeredSlides: true,
  navigation: {
    prevEl: ".arrow--cards-prev",
    nextEl: ".arrow--cards-next",
  },
});

// ============================================================
// INNER SLIDERS INIT (вызывается после показа histories)
// ============================================================

function initInnerSliders() {

  // TIMELINE SWIPERS
  document.querySelectorAll(".timeline-swiper").forEach((el) => {
    if (el._swiperInited) return;
    el._swiperInited = true;

    new Swiper(el, {
      slidesPerView: 1,
      loop: false,
      spaceBetween: 30,
      speed: 750,
      effect: "fade",
      fadeEffect: { crossFade: true },
      navigation: {
        prevEl: el.closest(".timeline").querySelector(".arrow--timeline-prev"),
        nextEl: el.closest(".timeline").querySelector(".arrow--timeline-next"),
      },
    });
  });

  // HISTORY SWIPER
  document.querySelectorAll(".history-swiper").forEach((el) => {
    if (el._swiperInited) return;
    el._swiperInited = true;

    new Swiper(el, {
      slidesPerView: 1,
      loop: false,
      spaceBetween: 30,
      speed: 750,
      effect: "fade",
      fadeEffect: { crossFade: true },
      navigation: {
        prevEl: el.closest(".history__swiper").querySelector(".arrow--history-prev"),
        nextEl: el.closest(".history__swiper").querySelector(".arrow--history-next"),
      },
    });
  });

  // CASES SWIPERS
  document.querySelectorAll(".cases-swiper").forEach((el) => {
    if (el._swiperInited) return;
    el._swiperInited = true;

    new Swiper(el, {
      slidesPerView: 1,
      loop: false,
      spaceBetween: 30,
      speed: 750,
      effect: "fade",
      fadeEffect: { crossFade: true },
      navigation: {
        prevEl: el.closest(".cases").querySelector(".arrow--cases-prev"),
        nextEl: el.closest(".cases").querySelector(".arrow--cases-next"),
      },
    });
  });

  // TYPES SLIDERS
  document.querySelectorAll(".types").forEach((typesEl) => {
    if (typesEl._slidersInited) return;
    typesEl._slidersInited = true;

    const thumbsEl = typesEl.querySelector(".types-thumbs");
    const infoEl = typesEl.querySelector(".types-info");

    if (!thumbsEl || !infoEl) return;

    const typesInfo = new Swiper(infoEl, {
      slidesPerView: 1,
      loop: false,
      speed: 750,
      effect: "fade",
      fadeEffect: { crossFade: true },
      allowTouchMove: false,
      simulateTouch: false,
    });

    const typeThumbs = new Swiper(thumbsEl, {
      slidesPerView: 3.2,
      loop: false,
      spaceBetween: 10,
      speed: 750,
      watchSlidesProgress: true,
    });

    let currentIndex = 0;

    function setActiveThumb(index) {
      typeThumbs.slides.forEach((s) => s.classList.remove("is-active"));
      if (typeThumbs.slides[index]) {
        typeThumbs.slides[index].classList.add("is-active");
      }
      currentIndex = index;
      typesInfo.slideTo(index, 750);
    }

    setTimeout(() => setActiveThumb(0), 100);

    typeThumbs.on("click", function () {
      const index = this.clickedIndex;
      if (index === undefined || index === null) return;
      setActiveThumb(index);
    });

    typeThumbs.on("slideChange", function () {
      const direction = this.swipeDirection;
      if (direction === "prev") {
        setActiveThumb(Math.max(0, currentIndex - 1));
      } else if (direction === "next") {
        setActiveThumb(Math.min(typeThumbs.slides.length - 1, currentIndex + 1));
      }
    });
  });

  // VARIANTS SLIDERS
  document.querySelectorAll(".variants").forEach((variantsEl) => {
    if (variantsEl._slidersInited) return;
    variantsEl._slidersInited = true;

    const thumbsEl = variantsEl.querySelector(".variants-thumbs");
    const infoEl = variantsEl.querySelector(".variants-info");

    if (!thumbsEl || !infoEl) return;

    const variantsInfo = new Swiper(infoEl, {
      slidesPerView: 1,
      loop: false,
      speed: 750,
      effect: "fade",
      fadeEffect: { crossFade: true },
      allowTouchMove: false,
      simulateTouch: false,
    });

    const variantsThumbs = new Swiper(thumbsEl, {
      slidesPerView: 3,
      loop: false,
      spaceBetween: 10,
      speed: 750,
      watchSlidesProgress: true,
    });

    let currentIndex = 0;

    function setActiveThumb(index) {
      variantsThumbs.slides.forEach((s) => s.classList.remove("is-active"));
      if (variantsThumbs.slides[index]) {
        variantsThumbs.slides[index].classList.add("is-active");
      }
      currentIndex = index;
      variantsInfo.slideTo(index, 750);
    }

    setTimeout(() => setActiveThumb(0), 100);

    variantsThumbs.on("click", function () {
      const index = this.clickedIndex;
      if (index === undefined || index === null) return;
      setActiveThumb(index);
    });

    variantsThumbs.on("slideChange", function () {
      const direction = this.swipeDirection;
      if (direction === "prev") {
        setActiveThumb(Math.max(0, currentIndex - 1));
      } else if (direction === "next") {
        setActiveThumb(Math.min(variantsThumbs.slides.length - 1, currentIndex + 1));
      }
    });
  });
}

// ============================================================
// CHOOSE → HISTORIES
// ============================================================

document.querySelector(".cards-swiper").addEventListener("click", function (e) {
  const slide = e.target.closest(".swiper-slide");
  if (!slide) return;
  if (!slide.classList.contains("swiper-slide-active")) return;

  const index = slide.getAttribute("data-index");

  showPage("histories");
  initInnerSliders();

  const wrappers = document.querySelectorAll(".histories__wrapper");
  wrappers.forEach((w) => (w.style.display = "none"));

  const target = document.querySelector(`.histories__wrapper[data-index="${index}"]`);
  if (target) target.style.display = "grid";
});

// ============================================================
// BACK → CHOOSE
// ============================================================

document.querySelectorAll(".history-card__back").forEach((btn) => {
  btn.addEventListener("click", () => {
    showPage("choose");
  });
});

// ============================================================
// HOME → GREATING
// ============================================================

document.querySelectorAll(".navigation-list__item--home").forEach((btn) => {
  btn.addEventListener("click", () => {
    showPage("greating");
    setTimeout(() => bindGreatingClick(), 0);
  });
});

// ============================================================
// JQUERY
// ============================================================

$(function () {
  $(".burger").on("click", function () {
    $("body").toggleClass("body--active");
  });

  $(".menu__link").on("click", function () {
    $("body").toggleClass("body--active");
  });

  var $popup = $(".popup");
  var $popups = { back: $(".popup--back"), retry: $(".popup--retry") };
  var retryTimer = null;

  function showPopup($p) {
    $p.addClass("popup--active").fadeIn(250);
    $("body").addClass("body--popup");
  }

  function hidePopup($p) {
    $p.removeClass("popup--active").fadeOut(250);
    $("body").removeClass("body--popup");
  }

  function clearRetryTimer() {
    if (retryTimer) {
      clearInterval(retryTimer);
      retryTimer = null;
    }
  }

  $(".result-bottom__button--retry").click(function (e) {
    e.stopPropagation();
    e.preventDefault();
    showPopup($popups.retry);

    var secs = 15;
    var $span = $popups.retry.find(".popup__text span");
    $span.text(secs + " секунд");

    retryTimer = setInterval(function () {
      secs--;
      $span.text(secs + " секунд");
      if (secs <= 0) {
        clearInterval(retryTimer);
        retryTimer = null;
        hidePopup($popups.retry);
      }
    }, 1000);
  });

  $(".result-bottom__button--end").click(function (e) {
    e.stopPropagation();
    e.preventDefault();
    showPopup($popups.back);
  });

  $(".popup__button--retry").click(function (e) {
    e.stopPropagation();
    e.preventDefault();
    clearRetryTimer();
    hidePopup($popups.retry);
  });

  $(".popup__button--home").click(function (e) {
    e.stopPropagation();
    e.preventDefault();
    hidePopup($popups.back);
  });

  $(".cls").click(function (e) {
    e.stopPropagation();
    e.preventDefault();
    clearRetryTimer();
    hidePopup($popup);
  });

  $(document).click(function (e) {
    $.each($popups, function (key, $p) {
      if ($p.hasClass("popup--active")) {
        var $inner = $p.find(".popup__inner");
        if (!$inner.is(e.target) && $inner.has(e.target).length === 0) {
          clearRetryTimer();
          hidePopup($p);
        }
      }
    });
  });
});