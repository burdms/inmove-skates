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

  console.log(burger);
}

menu();
