/*
* to include js file write: `//= include ./path-to-file`
* */

//= include ../lib/jquery.min.js ;
//= include ../lib/swiper/swiper-bundle.min.js

// CUSTOM SCRIPTS

$(document).ready(function () {

    // MOBILE MENU

    const nav = $('.header__nav');

    $('.btn-burger').on('click', function (e) {
        e.preventDefault();
        nav.toggleClass('open');
        $(this).toggleClass('open');
        $('body').toggleClass('modal_open');
    });

    // SLIDER WITH MASK
    const slider = document.querySelector('.banner-slider');

    if (slider) {
        const sliderTimeout = 5500;

        // slides informations
        const slidesDefault = document.querySelectorAll(".banner-slider .banner-slider__slide");

        slidesDefault.forEach(item => {
            const clonedItem = item.cloneNode(true);
            slider.appendChild(clonedItem);
        });

        let slides = document.querySelectorAll(".banner-slider .banner-slider__slide");

        function moveSlide(e) {
            const currSlideIndex = [].slice.call(slides).findIndex(s => s.classList.contains('active-slide'));
            const slide = slides[currSlideIndex + 1];
            const prevSlide = slides[currSlideIndex - 1];

            if (prevSlide) {
                const cloned = prevSlide.cloneNode(true);
                cloned.classList.remove('slide-on');
                prevSlide.remove();
                slider.appendChild(cloned);
                slides = document.querySelectorAll(".banner-slider .banner-slider__slide")
            }

            $(slides).removeClass('active-slide');

            slide.classList.add("slide-on");
            slide.classList.add("active-slide");
        }

        function startSlider() {
            slides[0].classList.add('active-slide');
            slides[0].classList.add("slide-on");

            setInterval(() => {
                moveSlide();
            }, sliderTimeout);
        }

        startSlider();
    }



   let bannerSlider = new Swiper(".banner-slider", {
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
    });

});



