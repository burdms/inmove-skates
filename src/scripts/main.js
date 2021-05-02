/* eslint-disable operator-linebreak */
/* eslint-disable arrow-parens */
'use strict';

// Menu
function menu() {
  const burger = document.getElementById('menu-burger'),
    menu = document.querySelector('.menu'),
    searchButton = document.getElementById('search'),
    searchInput = document.getElementById('menu-search');

  searchButton.addEventListener('click', () => {
    if (!menu.classList.contains('menu_active')) {
      menu.classList.add('menu_active');
    }

    searchInput.classList.toggle('menu-search_active');
  });

  burger.addEventListener('click', () => {
    menu.classList.toggle('menu_active');
  });
}

// Slider
function slider1() {
  const slider = document.querySelector('.hero-slider'),
    slides = document.querySelectorAll('.hero-slider__slide'),
    dotsContainer = document.querySelector('.slider-pagination'),
    buttonNext = document.querySelector('.slider-navigation__button_next'),
    buttonPrev = document.querySelector('.slider-navigation__button_prev'),
    dots = [];

  let currentSlide = 0;

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

    if (
      !target.matches('.slider-navigation__button, .slider-pagination__dot')
    ) {
      return;
    }

    prevSlide(slides, currentSlide, 'hero-slider__slide_active');
    prevSlide(dots, currentSlide, 'slider-pagination__dot_active');

    if (target.closest('.slider-navigation__button_next')) {
      currentSlide++;
    } else if (target.closest('.slider-navigation__arrow_prev')) {
      currentSlide--;
    } else if (target.matches('.slider-pagination__dot')) {
      dots.forEach((item, index) => {
        if (item === target) {
          currentSlide = index;
        }
      });
    }

    if (currentSlide >= slides.length) {
      buttonNext.classList.add('.slider-navigation__button_last');
    }
    if (currentSlide <= 0) {
      buttonPrev.classList.add('.slider-navigation__button_last');
    }

    nextSlide(slides, currentSlide, 'hero-slider__slide_active');
    nextSlide(dots, currentSlide, 'slider-pagination__dot_active');
  });

  createDots();
}

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

    if (!(currentSlide <= 0) && !(currentSlide >= slides.length - 1)) {
      document
        .querySelectorAll('.slider-navigation__button')
        .forEach((item) => {
          item.classList.remove('slider-navigation__button_last');
        });
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
    } else if (target.closest('.slider-navigation__button_prev')) {
      currentSlide--;
    } else if (target.matches('.slider-pagination__dot')) {
      dots.forEach((item, index) => {
        if (item === target) {
          currentSlide = index;
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

menu();
slider();
