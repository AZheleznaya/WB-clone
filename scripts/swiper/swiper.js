import Swiper from 'swiper/swiper-bundle.js';

new Swiper('.swiper-container', {

    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
    },

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