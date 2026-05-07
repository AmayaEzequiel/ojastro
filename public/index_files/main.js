function calculateVh() {
    var e = 0.01 * window.innerHeight;
    e && document.documentElement.style.setProperty("--vh", e + "px");
}
function setVh() {
    calculateVh(), window.addEventListener("resize", calculateVh);
}
function addBreakpoint(e, t) {
    e.addListener ? e.addListener(t) : e.addEventListener("change", t);
}
function offset(e) {
    var t = 0,
        i = 0;
    if (e.offsetParent) for (; (t += e.offsetTop), (i += e.offsetLeft), (e = e.offsetParent); );
    return { top: t, left: i };
}
var WORD_UP_SELECTOR = ".word-up";
function initWordUp() {
    var e = Array.prototype.slice.call(document.querySelectorAll(WORD_UP_SELECTOR));
    function t() {
        var t = document.body.scrollTop || document.documentElement.scrollTop;
        setTimeout(function () {
            e.forEach(function (e) {
                t + (5 * document.documentElement.clientHeight) / 6 >= offset(e).top && ((e.style.opacity = 1), (e.style.transform = "translateY(0) scale(1)"));
            });
        }, 5);
    }
    t(), window.addEventListener("scroll", t);
}
function throttle(e, t) {
    let i = !1,
        n,
        o;
    function r() {
        i
            ? ((n = arguments), (o = this))
            : (e.apply(this, arguments),
              (i = !0),
              setTimeout(function () {
                  (i = !1), n && (r.apply(o, n), (n = o = null));
              }, t));
    }
    return r;
}
const MENU_TRIGGER = ".js-menu-trigger",
    MENU = ".js-menu",
    MENU_OPEN_CLASS = "open";
function addMenuListeners() {
    const e = document.querySelector(MENU),
        t = document.querySelector(MENU_TRIGGER);
    (e.style.display = ""),
        t.addEventListener("click", () => {
            e.classList.toggle(MENU_OPEN_CLASS), t.classList.toggle(MENU_OPEN_CLASS);
        });
}
const POPUP_SELECTOR = ".js-popup",
    POPUP_LINK_SELECTOR = ".js-popup-trigger",
    POPUP_CLOSE_SELECTOR = ".js-popup-close",
    POPUP_OPEN_CLASS = "open",
    BODY_NO_SCROLL_CLASS = "no-scroll";
function popupOpen(e) {
    var t = this.getAttribute("href");
    const i = document.querySelector(t);
    void 0 !== i && (i.classList.add(POPUP_OPEN_CLASS), document.body.classList.add(BODY_NO_SCROLL_CLASS)), e.preventDefault();
}
function popupClose() {
    this.closest(POPUP_SELECTOR).classList.remove(POPUP_OPEN_CLASS), document.body.classList.remove(BODY_NO_SCROLL_CLASS);
}
function initPopups() {
    const e = Array.prototype.slice.call(document.querySelectorAll(POPUP_LINK_SELECTOR)),
        t = Array.prototype.slice.call(document.querySelectorAll(POPUP_CLOSE_SELECTOR));
    e.forEach(function (e) {
        e.addEventListener("click", popupOpen);
    }),
        t.forEach(function (e) {
            e.addEventListener("click", popupClose);
        });
}
function reinitSlider(e, t) {
    (e = Array.isArray(e) ? e : [e]).forEach((e) => {
        void 0 !== e && e.destroy(!0, !0);
    }),
        setTimeout(() => {
            t();
        });
}
function initSliders() {
    var e = window.matchMedia("(max-width: 767px)"),
        t = window.matchMedia("(max-width: 1023px)");
    new Swiper(".js-swiper-about-slider", {
        grabCursor: !0,
        loop: !0,
        loopAdditionalSlides: 3,
        pagination: { el: ".js-swiper-about-slider-pagination", type: "bullets", clickable: !0 },
        navigation: { nextEl: ".js-swiper-about-slider-button-next", prevEl: ".js-swiper-about-slider-button-prev" },
        spaceBetween: 40,
    });
    let i;
    function n() {
        i = new Swiper(".js-swiper-model-slider", {
            grabCursor: !0,
            effect: "creative",
            loop: !0,
            creativeEffect: { prev: { translate: ["-100%", 0, -400] }, next: { translate: ["100%", 0, -400] } },
            pagination: { el: ".js-swiper-model-slider-pagination", type: "bullets", clickable: !0 },
            navigation: { nextEl: ".js-swiper-model-slider-button-next", prevEl: ".js-swiper-model-slider-button-prev" },
        });
    }
    let o = [];
    function r() {
        document.querySelectorAll(".js-slider-double").forEach((e) => {
            o.push(
                new Swiper(e, { watchSlidesProgress: !0, slidesPerView: 1, spaceBetween: 0, pagination: { el: e.querySelector(".js-slider-double-pagination"), type: "bullets", clickable: !0 }, breakpoints: { 768: { slidesPerView: 1 } } })
            );
        });
    }
    let l = [];
    function s() {
        document.querySelectorAll(".js-slider-triple").forEach((e) => {
            l.push(
                new Swiper(e, {
                    watchSlidesProgress: !0,
                    slidesPerView: 1,
                    spaceBetween: 40,
                    pagination: { el: e.querySelector(".js-slider-triple-pagination"), type: "bullets", clickable: !0 },
                    breakpoints: { 768: { slidesPerView: e.querySelector(".philosophy-slider__container") ? 1 : 2 }, 1024: { slidesPerView: e.querySelector(".philosophy-slider__container") ? 1 : 2 } },
                })
            );
        });
    }
    function a() {
        window?.innerWidth < 1024 &&
            document.querySelectorAll(".news-slider").forEach((e) => {
                new Swiper(e, {
                    watchSlidesProgress: !0,
                    slidesPerView: 1,
                    spaceBetween: 40,
                    pagination: { el: e.querySelector(".js-slider-triple-pagination"), type: "bullets", clickable: !0 },
                    breakpoints: { 768: { slidesPerView: 2 }, 1024: { enabled: !1 } },
                    on: {
                        resize: function (e) {
                            1024 <= window.innerWidth && e.destroy(!0, !0);
                        },
                    },
                });
            });
    }
    function c() {
        window?.innerWidth < 1024 &&
            document.querySelectorAll(".js-mobile-slider").forEach((e) => {
                new Swiper(e, {
                    slidesPerView: 1,
                    centeredSlides: !0,
                    pagination: { el: e.querySelector(".js-slider-double-pagination"), type: "bullets", clickable: !0 },
                    breakpoints: { 1024: { enabled: !1 } },
                    on: {
                        resize: function (e) {
                            1024 <= window.innerWidth && e.destroy(!0, !0);
                        },
                    },
                });
            });
    }
    document.querySelectorAll(".js-slider-character").forEach((e) => {
        new Swiper(e, {
            loop: 0,
            spaceBetween: 40,
            pagination: { el: e.querySelector(".js-slider-character-pagination"), type: "bullets", clickable: !0 },
            navigation: { nextEl: e.querySelector(".js-slider-character-button-next"), prevEl: e.querySelector(".js-slider-character-button-prev") },
        });
    }),
        addBreakpoint(e, function () {
            reinitSlider(o, r), reinitSlider(i, n), reinitSlider(l, s);
        }),
        addBreakpoint(t, function () {
            reinitSlider(l, s), c(), a();
        }),
        r(),
        n(),
        s(),
        c(),
        a();
}
const VALUE_COUNTER_SELECTOR = ".js-value-counter",
    VALUE_COUNTER_DONE_CLASS = "js-value-counter-done";
function initValueCounter() {
    const e = Array.prototype.slice.call(document.querySelectorAll(VALUE_COUNTER_SELECTOR));
    function t() {
        const o = document.body.scrollTop || document.documentElement.scrollTop;
        setTimeout(() => {
            e.forEach((e) => {
                if (!e.classList.contains(VALUE_COUNTER_DONE_CLASS) && o + (5 * document.documentElement.clientHeight) / 6 >= offset(e).top) {
                    const i = e.dataset.value.replace(",", ".");
                    var t = i.indexOf(".");
                    const n = new countUp.CountUp(e, +i, { separator: "", decimal: ",", decimalPlaces: -1 === t ? 0 : i.length - t - 1 });
                    n.start(), e.classList.add(VALUE_COUNTER_DONE_CLASS);
                }
            });
        }, 100);
    }
    t(), window.addEventListener("scroll", t);
}
const NUMBER_BLOCKS_SELECTOR = ".number-blocks",
    NUMBER_BLOCKS_DONE_CLASS = "number-blocks--animation-done",
    NUMBER_BLOCK_SELECTOR = ".number-blocks-block__number",
    NUMBER_BLOCK_GRAY_CLASS = "number-blocks-block__number--gray";
let initialsNumbersArr = [],
    initialValue = 0,
    animationStart = 0,
    animationDone = !0;
const animationDuration = 2e3;
function animateCounter(e) {
    e -= animationStart = animationStart || e;
    const i = ("" + parseInt((e / animationDuration) * initialValue)).split("");
    for (; i.length < initialsNumbersArr.length; ) i.unshift("0");
    Array.from(document.querySelectorAll(NUMBER_BLOCK_SELECTOR)).forEach((e, t) => {
        e.innerText = i[t];
    }),
        e < animationDuration && window.requestAnimationFrame(animateCounter);
    const t = document.querySelector(NUMBER_BLOCKS_SELECTOR);
    t.classList.add(NUMBER_BLOCKS_DONE_CLASS);
}
function animateIfVisible() {
    const e = document.querySelector(NUMBER_BLOCKS_SELECTOR);
    e.classList.contains(NUMBER_BLOCKS_DONE_CLASS) || ((document.body.scrollTop || document.documentElement.scrollTop) + (5 * document.documentElement.clientHeight) / 6 >= offset(e).top && window.requestAnimationFrame(animateCounter));
}
function initNumberBlocks() {
    var t = document.querySelectorAll(NUMBER_BLOCK_SELECTOR);
    if (t?.length) {
        let e = !0;
        for (const n of t) {
            var i = Number(n.innerText);
            initialsNumbersArr.push(i), (n.innerText = "0"), (e && 0 === i) || (n.classList.remove(NUMBER_BLOCK_GRAY_CLASS), (e = !1));
        }
        (initialValue = parseInt(initialsNumbersArr.reduce((e, t) => "" + e + t, ""))), window.addEventListener("scroll", animateIfVisible);
    }
}
const NEWS_ITEM_SELECTOR = ".news-slider__item",
    NEWS_ITEM_HIDDEN_CLASS = "news-slider__item--hidden",
    NEWS_BLOCK_BUTTON_SELECTOR = ".news-slider__button .button",
    HIDDEN_BUTTON_CLASS = "button--hidden";
function onNewsButtonClick() {
    const t = Array.from(document.querySelectorAll(NEWS_ITEM_SELECTOR));
    var i = t.findIndex((e) => e.classList.contains(NEWS_ITEM_HIDDEN_CLASS));
    if (t.length && -1 !== i) {
        var n = i + 2 <= t.length - 1 ? i + 2 : t.length - 1;
        for (let e = i; e <= n; e++) t[e].classList.remove(NEWS_ITEM_HIDDEN_CLASS);
        i = t[n]?.offsetHeight || 0;
        window.scrollBy({ top: i, behavior: "smooth" }), n === t.length - 1 && this.classList.add(HIDDEN_BUTTON_CLASS);
    }
}
function initNewsBlock() {
    const e = document.querySelector(NEWS_BLOCK_BUTTON_SELECTOR);
    e && e.addEventListener("click", onNewsButtonClick);
}
function functionOnWindowResize() {
    1024 <= window?.innerWidth && initNewsBlock();
}
window.addEventListener("resize", functionOnWindowResize);
let currentAspectRation = 0;
const calculateAspectRatio = () => {
        const e = document.querySelector(".main");
        var t, i;
        window &&
            e &&
            (({ innerWidth: t, innerHeight: i } = window),
            i && t && ((currentAspectRation = t / i) < 0.8 ? (e.classList.add("mobile-aspect-ratio"), e.classList.remove("desktop-aspect-ratio")) : (e.classList.remove("mobile-aspect-ratio"), e.classList.add("desktop-aspect-ratio"))));
    },
    initAspectRatio = () => {},
    observerOptions = { rootMargin: "60px", threshold: 1 },
    createObserver = (e, t, i = 0) => {
        const n = new IntersectionObserver((e) => {
            e.forEach((e) => {
                e.intersectionRatio > i ? e.target.classList.add("animation-activated") : e.target.classList.remove("animation-activated");
            });
        }, t);
        e.forEach((e) => {
            const t = document.querySelectorAll(e);
            t.forEach((e) => {
                n.observe(e);
            });
        });
    },
    initIntersectionObserver = () => {
        createObserver([".observer-word-up", ".observer-fade-in"], { rootMargin: "20px", threshold: 1 }),
            createObserver([".move-out", ".order-online"], { rootMargin: "0px", threshold: 0.5 }),
            createObserver([".model-slider__container", ".full-bg--small"], { rootMargin: "140px 0px 20px 0px", threshold: 0.7 });
    };
let fullScreenElems = [];
function onWindowResize() {
    document.querySelector(".js-parallaxed-wide") &&
        (fullScreenElems.forEach((e) => {
            (e.style.height = "100%"), (e.style.position = "relative");
        }),
        addParallax());
}
function addParallaxedStyles() {
    if (!(window.innerWidth < 768)) {
        const t = window["pageYOffset"];
        fullScreenElems.forEach((e) => {
            t >= e.initialTop && ((e.style.position = "fixed"), (e.style.top = 0), (e.style.width = "100%"), (e.style.height = e.initialHeight + "px")), (t >= e.initialBottom || t < e.initialTop) && (e.style.position = "relative");
        });
    }
}
const throttledFunction = throttle(addParallaxedStyles, 16);
function addParallax() {
    fullScreenElems = document.querySelectorAll(".js-parallaxed-wide");
    const o = window["pageYOffset"];
    fullScreenElems.length &&
        (fullScreenElems.forEach((e) => {
            var t, i, n;
            window.innerWidth < 768 ||
                (({ top: t, height: i, bottom: n } = e.getBoundingClientRect()),
                (e.initialTop = o + t),
                (e.initialBottom = o + n),
                (e.initialHeight = i),
                o >= e.initialTop && 768 <= window.innerWidth && ((e.style.position = "fixed"), (e.style.top = 0), (e.style.width = "100%"), (e.style.height = e.initialHeight + "px")),
                (o >= e.initialBottom || o < e.initialTop) && ((e.style.position = "relative"), (e.style.height = e.initialHeight)));
        }),
        window.removeEventListener("resize", onWindowResize),
        window.addEventListener("resize", onWindowResize),
        window.innerWidth < 768
            ? (fullScreenElems.forEach((e) => {
                  e.style.position = "relative";
              }),
              window.removeEventListener("scroll", throttledFunction))
            : (window.removeEventListener("scroll", throttledFunction), window.addEventListener("scroll", throttledFunction)));
}
document.addEventListener("DOMContentLoaded", function (e) {
    setVh(), initIntersectionObserver(), initWordUp(), addMenuListeners(), initPopups(), initSliders(), initValueCounter(), initNumberBlocks(), initNewsBlock(), initAspectRatio(), addParallax();
}),
    initAspectRatio();
