/* eslint-disable operator-linebreak */
/* eslint-disable arrow-parens */
'use strict';

window.addEventListener('DOMContentLoaded', () => {
  // Menu
  function menu() {
    const burger = document.getElementById('menu-burger'),
      menu = document.querySelector('.menu'),
      searchButton = document.getElementById('search'),
      searchInput = document.getElementById('menu-search');

    searchButton.addEventListener('click', () => {
      if (!menu.classList.contains('menu_active')) {
        burger.classList.add('header-burger_active');
        menu.classList.add('menu_active');
        document.body.classList.add('js-overflow_hidden');
      }

      searchInput.classList.toggle('menu-search_active');
    });

    burger.addEventListener('click', (event) => {
      event.preventDefault();
      burger.classList.toggle('header-burger_active');
      menu.classList.toggle('menu_active');
      document.body.classList.toggle('js-overflow_hidden');

      if (searchInput.classList.contains('menu-search_active')) {
        searchInput.classList.remove('menu-search_active');
      }
    });
  }

  // Slider
  function slider() {
    const slider = document.querySelector('.slider'),
      slides = document.querySelectorAll('.hero-slider__slide'),
      dotsContainer = document.querySelector('.slider-pagination'),
      buttonNext = document.querySelector('.slider-navigation__button_next'),
      buttonPrev = document.querySelector('.slider-navigation__button_prev'),
      dots = [];

    let currentSlide = 0;

    buttonPrev.classList.add('slider-navigation__button_last');

    function createDots() {
      for (let i = 0; i < slides.length; i++) {
        const li = document.createElement('li');
        li.classList.add('slider-pagination__dot');

        if (i === 0) {
          li.classList.add('slider-pagination__dot_active');
        }

        dots.push(li);
        dotsContainer.append(li);
      }
    }

    function prevSlide(elem, index, strClass) {
      elem[index].classList.remove(strClass);
    }

    function nextSlide(elem, index, strClass) {
      elem[index].classList.add(strClass);
    }

    slider.addEventListener('click', (event) => {
      event.preventDefault();

      const target = event.target;

      function lastSlide() {
        if (!(currentSlide <= 0)) {
          document
            .querySelector('.slider-navigation__button_prev')
            .classList.remove('slider-navigation__button_last');
        }

        if (!(currentSlide >= slides.length - 1)) {
          document
            .querySelector('.slider-navigation__button_next')
            .classList.remove('slider-navigation__button_last');
        }
      }

      if (
        !target.closest('.slider-navigation__button') &&
        !target.matches('.slider-pagination__dot')
      ) {
        return;
      }

      if (target.closest('.slider-navigation__button_last')) {
        return;
      }

      prevSlide(slides, currentSlide, 'hero-slider__slide_active');
      prevSlide(dots, currentSlide, 'slider-pagination__dot_active');

      if (target.closest('.slider-navigation__button_next')) {
        currentSlide++;
        lastSlide();
      } else if (target.closest('.slider-navigation__button_prev')) {
        currentSlide--;
        lastSlide();
      } else if (target.matches('.slider-pagination__dot')) {
        dots.forEach((item, index) => {
          if (item === target) {
            currentSlide = index;
            lastSlide();
          }
        });
      }

      if (currentSlide === slides.length - 1) {
        buttonNext.classList.add('slider-navigation__button_last');
      }
      if (currentSlide === 0) {
        buttonPrev.classList.add('slider-navigation__button_last');
      }

      nextSlide(slides, currentSlide, 'hero-slider__slide_active');
      nextSlide(dots, currentSlide, 'slider-pagination__dot_active');
    });

    createDots();
  }

  // Product sizes on hover
  function sizesOnHover() {
    const cards = document.querySelectorAll('.product');

    if (window.innerWidth >= 993) {
      cards.forEach((item) => {
        item.addEventListener('mouseover', () => {
          item
            .querySelector('.product-sizes')
            .classList.remove('product-sizes_hidden');
        });
      });

      cards.forEach((item) => {
        item.addEventListener('mouseout', () => {
          item
            .querySelector('.product-sizes')
            .classList.add('product-sizes_hidden');
        });
      });
    } else {
      document.addEventListener('click', (event) => {
        const target = event.target,
          targetParent = target.closest('.product'),
          sizes = document.querySelectorAll('.product-sizes');

        function closeAllSizes(current) {
          sizes.forEach((item) => {
            if (item !== current) {
              item.classList.add('product-sizes_hidden');
            }
          });
        }

        if (targetParent) {
          if (target.closest('.product-pricing__button')) {
            closeAllSizes(targetParent.querySelector('.product-sizes'));

            targetParent
              .querySelector('.product-sizes')
              .classList.toggle('product-sizes_hidden');
          } else {
            closeAllSizes();
          }
        } else {
          closeAllSizes();
        }
      });
    }
  }

  menu();
  slider();
  sizesOnHover();
});

/*

Slider swipes test

function slider1() {
  const slider = document.querySelector('.slider'),
    slides = document.querySelectorAll('.hero-slider__slide'),
    dotsContainer = document.querySelector('.slider-pagination'),
    buttonNext = document.querySelector('.slider-navigation__button_next'),
    buttonPrev = document.querySelector('.slider-navigation__button_prev'),
    dots = [],
    sensitivity = 20;

  let currentSlide = 0,
    touchStart = null,
    touchPosition = null;

  buttonPrev.classList.add('slider-navigation__button_last');

  function createDots() {
    for (let i = 0; i < slides.length; i++) {
      const li = document.createElement('li');
      li.classList.add('slider-pagination__dot');

      if (i === 0) {
        li.classList.add('slider-pagination__dot_active');
      }

      dots.push(li);
      dotsContainer.append(li);
    }
  }

  function prevSlide(elem, index, strClass) {
    elem[index].classList.remove(strClass);
  }

  function nextSlide(elem, index, strClass) {
    elem[index].classList.add(strClass);
  }

  slider.addEventListener('click', (event) => {
    event.preventDefault();

    const target = event.target;

    function lastSlide() {
      if (!(currentSlide <= 0)) {
        document
          .querySelector('.slider-navigation__button_prev')
          .classList.remove('slider-navigation__button_last');
      }

      if (!(currentSlide >= slides.length - 1)) {
        document
          .querySelector('.slider-navigation__button_next')
          .classList.remove('slider-navigation__button_last');
      }
    }

    if (
      !target.closest('.slider-navigation__button') &&
      !target.matches('.slider-pagination__dot')
    ) {
      return;
    }

    if (target.closest('.slider-navigation__button_last')) {
      return;
    }

    prevSlide(slides, currentSlide, 'hero-slider__slide_active');
    prevSlide(dots, currentSlide, 'slider-pagination__dot_active');

    if (target.closest('.slider-navigation__button_next')) {
      currentSlide++;
      lastSlide();
    } else if (target.closest('.slider-navigation__button_prev')) {
      currentSlide--;
      lastSlide();
    } else if (target.matches('.slider-pagination__dot')) {
      dots.forEach((item, index) => {
        if (item === target) {
          currentSlide = index;
          lastSlide();
        }
      });
    }

    if (currentSlide === slides.length - 1) {
      buttonNext.classList.add('slider-navigation__button_last');
    }
    if (currentSlide === 0) {
      buttonPrev.classList.add('slider-navigation__button_last');
    }

    nextSlide(slides, currentSlide, 'hero-slider__slide_active');
    nextSlide(dots, currentSlide, 'slider-pagination__dot_active');
  });

  slider.addEventListener('touchstart', (event) => tStart(event));
  slider.addEventListener('touchmove', (event) => tMove(event));
  slider.addEventListener('touchend', (event) => tEnd(event));

  function tStart(event) {
    touchStart = {
      x: event.changedTouches[0].clientX,
      y: event.changedTouches[0].clientY,
    };

    touchPosition = { x: touchStart.x, y: touchStart.y };
  }

  function tMove(event) {
    touchPosition = {
      x: event.changedTouches[0].clientX,
      y: event.changedTouches[0].clientY,
    };
  }

  function tEnd(event) {
    checkAction();

    touchStart = null;
    touchPosition = null;
  }

  function checkAction() {
    const d = {
      x: touchStart.x - touchPosition.x,
      y: touchStart.y - touchPosition.y,
    };

    if (Math.abs(d.x) > Math.abs(d.y)) {
      if (Math.abs(d.x) > sensitivity) {
        if (d.x > 0) {
          // Swipe Left
        } else {
          // Swipe Right
        }
      }
    }
  }

  createDots();
}
*/
