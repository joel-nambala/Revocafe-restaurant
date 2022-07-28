'use strict';

// Select DOM elements
const header = document.querySelector('.header');
const nav = document.querySelector('.nav');
const scrollLink = document.querySelectorAll('.scroll-link');
const linksContainer = document.querySelector('.links-container');
const navMenu = document.querySelector('.nav-menu');
const navList = document.querySelector('.nav-list');

const slides = document.querySelectorAll('.slide');
const btnRight = document.querySelector('.btn-slide--right');
const btnLeft = document.querySelector('.btn-slide--left');

const copyYear = document.querySelector('.footer-year');

/////////////////////////////////////////////////////////////////////
// Slider component
let curSlide = 0;
const maxSlide = slides.length;

const gotToSlide = function (slide) {
  slides.forEach(function (s, i) {
    s.style.transform = `translateX(${100 * (i - slide)}%)`;
  });
};
gotToSlide(0);

const nextSlide = function () {
  if (curSlide === maxSlide - 1) curSlide = 0;
  else curSlide++;

  gotToSlide(curSlide);
};

const prevSlide = function () {
  if (curSlide === 0) curSlide = maxSlide - 1;
  else curSlide--;

  gotToSlide(curSlide);
};

btnRight.addEventListener('click', nextSlide);
btnLeft.addEventListener('click', prevSlide);
document.addEventListener('keydown', function (e) {
  if (e.key === 'ArrowRight') nextSlide();
  if (e.key === 'ArrowLeft') prevSlide();
});

/////////////////////////////////////////////////////////
// Copyright year
const changeCopyrightYear = function () {
  const presentYear = new Date().getFullYear();
  copyYear.textContent = presentYear;
};

changeCopyrightYear();

//////////////////////////////////////////////////////////
// Responsive navbar
const responsiveNav = function () {
  const navHeight = navList.getBoundingClientRect().height;
  const containerHeight = linksContainer.getBoundingClientRect().height;

  if (containerHeight === 0) {
    linksContainer.style.height = `${navHeight}px`;
    navMenu.classList.add('fa-xmark');
  } else {
    linksContainer.style.height = 0;
    navMenu.classList.remove('fa-xmark');
  }
};

navMenu.addEventListener('click', responsiveNav);

//////////////////////////////////////////////////////////
// Sticky navigation bar
const stickyNav = function () {
  // Calculate the heights
  const navHeight = nav.getBoundingClientRect().height;
  const headerHeight = header.getBoundingClientRect().height;
  const scrollHeight = window.scrollY;

  if (scrollHeight > headerHeight - navHeight) nav.classList.add('sticky');
  else nav.classList.remove('sticky');

  if (scrollHeight > headerHeight)
    document.querySelector('.top-link').style.display = 'block';
  else document.querySelector('.top-link').style.display = 'none';
};

window.addEventListener('scroll', stickyNav);

////////////////////////////////////////////////////////
//  Smooth scroll
scrollLink.forEach(function (link, i, arr) {
  link.addEventListener('click', function (e) {
    e.preventDefault();

    // Get the attribute
    const id = e.target.getAttribute('href').slice(1);
    const section = document.getElementById(id);
    if (!id) return;

    // Calculate the heights
    const navHeight = nav.getBoundingClientRect().height;
    const containerHeight = linksContainer.getBoundingClientRect().height;
    const fixedNav = nav.classList.contains('sticky');

    let position = section.offsetTop - navHeight;

    if (!fixedNav) position = position - navHeight;
    if (navHeight > 82) position = position + containerHeight;

    // Scroll to the location
    window.scrollTo({
      left: 0,
      top: position,
      behavior: 'smooth',
    });

    linksContainer.style.height = 0;
    navMenu.classList.remove('fa-xmark');
  });
});
