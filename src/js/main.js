/*
* to include js file write: `//= include ./path-to-file`
* */

//= include ../lib/jquery.min.js ;
//= include ../lib/swiper/swiper-bundle.min.js

// CUSTOM SCRIPTS

function destroySwiper(sliderInstance) {
    if (sliderInstance instanceof Swiper && sliderInstance.initialized) {
        sliderInstance.destroy(true, true);
        console.log('destroy')
    }
}

$(document).ready(function () {

    // MOBILE MENU

    const nav = $('.header__nav');

    $('.btn-burger').on('click', function (e) {
        e.preventDefault();
        nav.toggleClass('open');
        $(this).toggleClass('open');
        $('body').toggleClass('modal_open');
    });

    $('.backdrop, .menu__link').click(function (e) {
        nav.removeClass('open');
        $('body').removeClass('modal_open');
    });

    // SLIDER WITH MASK
    const slider = document.querySelector('.banner-slider');

    if (slider) {
        const BG_TRANSITION = 800;
        const CONTENT_TRANSITION = 800;
        const TIMEOUT_OVERLAP = 50
        const transitionStyles = document.createElement('style');

        const transition_rules = "\n" +
            ".leave-anim .part-bg {\n" +
            "-webkit-transition: " + BG_TRANSITION + "ms transform;\n" +
            "-moz-transition: " + BG_TRANSITION + "ms transform;\n" +
            "-ms-transition: " + BG_TRANSITION + "ms transform;\n" +
            "-o-transition: " + BG_TRANSITION + "ms transform;\n" +
            "transition: " + BG_TRANSITION + "ms transform;\n" +
            "}\n" +
            ".leave-anim .part-bg {\n" +
            "-webkit-transition: " + CONTENT_TRANSITION + "ms transform;\n" +
            "-moz-transition: " + CONTENT_TRANSITION + "ms transform;\n" +
            "-ms-transition: " + CONTENT_TRANSITION + "ms transform;\n" +
            "-o-transition: " + CONTENT_TRANSITION + "ms transform;\n" +
            "transition: " + CONTENT_TRANSITION + "ms transform;\n" +
            "}\n" +
            "" +
            ".content-anim {\n" +
            "-webkit-transition: " + CONTENT_TRANSITION + "ms;\n" +
            "transition: " + CONTENT_TRANSITION + "ms;\n" +
            "}"

        transitionStyles.appendChild(document.createTextNode(transition_rules))
        document.head.append(transitionStyles);

        let active_slide_index = 0;
        const slides = $('.banner-slider .banner-slider__slide');
        $(slides[active_slide_index]).addClass('enter-anim active-slide');
        const next_btn = $('.banner-slider .next-slide-btn');
        const prev_btn = $('.banner-slider .prev-slide-btn');

        if (active_slide_index === 0) {
            prev_btn.addClass('disabled');
        }

        let is_animating = false;

        function goToSlide(currSlide, nextSlide) {
            is_animating = true; // start slide animation

            $(currSlide).addClass('leave-anim');
            $(nextSlide).addClass('next-slide');
            setTimeout(() => {
                setTimeout(() => {
                    $(currSlide).removeClass('leave-anim active-slide enter-anim');
                    $(nextSlide).removeClass('next-slide');
                    $(nextSlide).addClass('enter-anim active-slide');

                    is_animating = false; // end slide animation. allowing slide change
                }, CONTENT_TRANSITION + TIMEOUT_OVERLAP);
                $(nextSlide).addClass('enter-anim');
            }, BG_TRANSITION + TIMEOUT_OVERLAP);
        }

        next_btn.click(function (e) {
            if (!is_animating) {
                const currSlide = slides[active_slide_index];
                const nextSlideIndex = active_slide_index + 1;
                const nextSlide = slides[nextSlideIndex];

                if (currSlide && nextSlide) {
                    if ((nextSlideIndex) === (slides.length - 1)) {
                        next_btn.addClass('disabled');
                    }
                    $(prev_btn).removeClass('disabled');
                    goToSlide(currSlide, nextSlide);
                    active_slide_index = nextSlideIndex;
                }
            }
        });

        prev_btn.click(function (e) {
            if (!is_animating) {
                const currSlide = slides[active_slide_index];
                const prevIndex = active_slide_index - 1;
                const prevSlide = slides[prevIndex];

                if (currSlide && prevSlide) {
                    $(next_btn).removeClass('disabled');
                    if (prevIndex === 0) {
                        prev_btn.addClass('disabled');
                    }
                    goToSlide(currSlide, prevSlide);
                    active_slide_index--;
                }
            }
        });
    }

    //SLIDER SPECIFICS-CARD
    let specificSlider;

    function handleResponsive() {

        // DESTROY SLIDER INSTANCES

        if ($(window).outerWidth() <= 1160) {
            if (!specificSlider) {
                specificSlider = new Swiper('.specifics__card-slider', {
                    slidesPerView: 'auto',
                    navigation: {
                        nextEl: ".slider__arrow_next",
                        prevEl: ".slider__arrow_prev",
                    },
                });
            }
        } else {
            destroySwiper(specificSlider);
            specificSlider = null;
        }
    }

    let resizeId;


    handleResponsive();

    window.addEventListener('resize', function () {
        clearTimeout(resizeId);
        resizeId = setTimeout(handleResponsive, 500);
    });


    function handlePopover() {
        $('.popover-trigger').click(function (e) {
            e.preventDefault();
            const popover = $('.custom-popover');
            popover.addClass('active');


            const clientRect = $(this).get(0).getBoundingClientRect();
            const topOffset = $(this).offset().top

            const margin = 30;
            const popoverWidth = popover.outerWidth();
            const windowW = $(window).width();

            const isRight = windowW - clientRect.x - clientRect.width - margin;
            const isLeft = clientRect.x - margin;

            popover.css({top: topOffset - margin, left: 0});
        });
    }

    handlePopover()
});



