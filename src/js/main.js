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

var player;

var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);


function onYouTubeIframeAPIReady() {
    player = new YT.Player('youtube-video', {
        height: 315,
        width: 560,
        videoId: 'ymckfao9i9E',
    });
}


$(document).ready(function () {
//    YOUTUBE VIDEO

    $('#customPlaybtn').click(function (e) {
        e.preventDefault();
        $(this).parents('.video__poster').fadeOut(700);

        player.playVideo();
    });

    // MOBILE MENU
    const nav = $('.header__nav');

    $('.btn-burger').on('click', function (e) {
        e.preventDefault();
        nav.toggleClass('open');
        $(this).toggleClass('open');
        $('body').toggleClass('modal_open');
    });

    $('.menu__link').click(function (e) {
        $('.btn-burger').removeClass('open');
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
                        nextEl: ".swiper-button-next",
                        prevEl: ".swiper-button-prev",
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

    //POPOVER
    function handlePopover() {
        const popover = $('.custom-popover');
        const popoverTitle = $('.custom-popover__title');
        const popoverText = $('.custom-popover__text');


        const closePopover = () => {
            popoverText.html('');
            popoverTitle.html('');
            popover.removeClass('active');
        };

        $('.popover-trigger').click(function (e) {
            e.preventDefault();
            popover.addClass('active');

            const topOffset = $(this).offset().top;
            const leftOffset = $(this).offset().left;
            const bindingRect = $(this).get(0).getBoundingClientRect();
            const popoverMaxWidth = 310;
            const popoverPosition = {
                top: topOffset,
            };
            if (bindingRect.left < 0) {
                popoverPosition.left = 10;
                popoverPosition.right = 'auto';
            } else if ((bindingRect.left + popoverMaxWidth) >= $(window).width()) {
                popoverPosition.right = 20;
                popoverPosition.left = 'auto';
            } else {
                popoverPosition.left = leftOffset;
                popoverPosition.right = 'auto';
            }

            // insert texts
            popoverTitle.html($(this).find('.card__title').text())
            popoverText.html($(this).siblings('.card__text').html())

            // set popover position
            popover.css(popoverPosition);
        });

        $('.custom-popover__close').click(function (e) {
            e.preventDefault();
            closePopover();
        })
    }

    handlePopover();


});



