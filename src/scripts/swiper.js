import Swiper from '../../node_modules/swiper/swiper-bundle.js';

new Swiper('.swiper-container', {

    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },

    spaceBetween: 15,

    centeredSlides: true,

    loop: true,

    slideToClickedSlide: true,

    autoplay: {
        delay: 3000,
        stopOnLastSlide: true,
        disableOnInteraction: false,
    },

    speed: 800,
});