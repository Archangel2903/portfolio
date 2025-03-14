import '../scss/main.scss';
import 'intersection-observer';
import $ from 'jquery';
import Swiper from 'swiper';
import 'bootstrap';
import 'popper.js';

/*$(window).on('load', function () {
    let b = $('body');

    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)) {
        b.addClass('ios');
    } else {
        b.addClass('web');
    }
});*/

$(function () {
    // Header fixed
    const header = document.getElementById('header');
    const content = document.getElementById('content');

    function adjustHeaderOnScroll() {
        let headerHeight = header.offsetHeight;

        if (window.scrollY > 0 && !header.classList.contains('postition-fixed')) {
            header.classList.add('position-fixed');
            content.style.paddingTop = `${headerHeight}px`;
        }
        else {
            header.classList.remove('position-fixed');
            content.style.paddingTop = '0';
        }
    }

    window.addEventListener('scroll', adjustHeaderOnScroll);
    window.addEventListener('load', adjustHeaderOnScroll);

    // Anchor scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Swiper slider
    /*if ($('.swiper-container').length) {
        let slider;
        let slide = document.querySelectorAll('.swiper-container .swiper-slide').length;

        if (slide > 1) {
            slider = new Swiper('.swiper-container', {
                observer: true,
                observeParents: true,
                loop: true,
                autoplay: true,
                spaceBetween: 25,
                slidesPerView: 1,
                /!*navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev'
                },*!/
                /!*pagination: {
                    el: '.swiper-pagination',
                    clickable: true
                },*!/
                /!*scrollbar: {
                    el: '.swiper-scrollbar',
                },*!/
                /!*dynamicBullets: true,*!/
            });
        }
    }*/

    // Lazy load observer
    const imagesAll = document.querySelectorAll('img[data-src]');
    let imgObserve = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.intersectionRatio >= 0 && entry.target.hasAttribute('data-src')) {
                let current = entry.target;
                let source = current.getAttribute('data-src');

                current.setAttribute('src', source);
                current.removeAttribute('data-src');
            }
        });
    });
    if (imagesAll.length > 0) {
        imagesAll.forEach(function (image) {
            imgObserve.observe(image);
        });
    }

    // Copyright
    document.getElementById('current_year').textContent = new Date().getFullYear();
});