'use strict';

// Select DOM elements
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
