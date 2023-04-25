'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

const openModal = function(e) {
	e.preventDefault();
	modal.classList.remove('hidden');
	overlay.classList.remove('hidden');
};

const closeModal = function() {
	modal.classList.add('hidden');
	overlay.classList.add('hidden');
};

btnsOpenModal.forEach((button) => button.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function(e) {
	if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
		closeModal();
	}
});

// Smooth scrolling
btnScrollTo.addEventListener('click', function(e) {
	const s1coords = section1.getBoundingClientRect();
	console.log(s1coords);
	console.log(e.target.getBoundingClientRect());

	console.log('Current scroll (x/y)', window.pageXOffset, window.pageYOffset);
	console.log('height/width viewport', document.documentElement.clientHeight, document.documentElement.clientWidth);

	// Scrolling
	//window.scrollTo(s1coords.left + window.pageXOffset, s1coords.top + window.pageYOffset);

	/* window.scrollTo({
		left: s1coords.left + window.pageXOffset,
		top: s1coords.top + window.pageYOffset,
		behavior: 'smooth'
	});*/
// Modern solution for scrolling
  section1.scrollIntoView({behavior: 'smooth'});
});
