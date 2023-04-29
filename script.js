'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');
const nav = document.querySelector('.nav');

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
	section1.scrollIntoView({ behavior: 'smooth' });
});

// Page navigation
// document.querySelectorAll('.nav__link').forEach(function(el) {
// 	el.addEventListener('click', function(e) {
// 		e.preventDefault();
// 		const id = this.getAttribute('href');
// 		document.querySelector(id).scrollIntoView({
// 			behavior: 'smooth'
// 		});
// 	});
// });

// 1. Add event listener to common parent element
// 2. Determine what element originated the event
document.querySelector('.nav__links').addEventListener('click', function(e) {
	e.preventDefault();

	// Matching strategy
	if (e.target.classList.contains('nav__link')) {
		const id = e.target.getAttribute('href');
		document.querySelector(id).scrollIntoView({
			behavior: 'smooth'
		});
	}
});

// Tabbed component

// Use event delegation to attach event listeners to buttons
tabsContainer.addEventListener('click', function(e) {
	const clicked = e.target.closest('.operations__tab');

	// Guard close
	if (!clicked) return;

	// Remove active classes
	tabsContent.forEach((tab) => tab.classList.remove('operations__content--active'));
	tabs.forEach((tabs) => tabs.classList.remove('operations__tab--active'));

	// Active tab
	clicked.classList.add('operations__tab--active');

	// Activate content area

	document.querySelector(`.operations__content--${clicked.dataset.tab}`).classList.add('operations__content--active');
});

// Menu fade animation

const handleHover = function(e) {
	if (e.target.classList.contains('nav__link')) {
		const clicked = e.target;
		const siblings = clicked.closest('.nav').querySelectorAll('.nav__link');
		const logo = clicked.closest('.nav').querySelector('img');

		siblings.forEach((el) => {
			if (el !== clicked) el.style.opacity = this;
		});
		logo.style.opacity = this;
	}
};

// nav.addEventListener('mouseover', function(e) {
// 	handleHover(e, 0.5);
// });
//
// nav.addEventListener('mouseout', function(e) {
// 	handleHover(e, 1);
// });

// Have to change argument to THIS. keyword
// Can only use one real argument ). If you want multiple arguments, pass in an object, or array of values
nav.addEventListener('mouseover', handleHover.bind(0.5));

nav.addEventListener('mouseout', handleHover.bind(1));

// Sticky navigation

// Inefficient solution (especially on older smartphones and PCs)
// const initialCoords = section1.getBoundingClientRect();
// console.log(initialCoords);
// window.addEventListener('scroll', function() {
// 	console.log(window.scrollY);
//
// 	if (window.scrollY > initialCoords.top) nav.classList.add('sticky');
// 	else nav.classList.remove('sticky');
// });

// Solution using Intersection Observer API

// const obsCallback = function(entries, observer) {
// 	entries.forEach(entry => console.log(entry))
// }
//
// const obsOptions = {
// 	root: null,
// 	threshold: [0, 0.2]
// };
// const observer = new IntersectionObserver(obsCallback, obsOptions);
// observer.observe(section1);

const header = document.querySelector('.header');
const navHeight = nav.getBoundingClientRect().height;

const stickyNav = function(entries) {
	const [ entry ] = entries;
	if (!entry.isIntersecting) nav.classList.add('sticky');
	else nav.classList.remove('sticky');
};

const headerObserver = new IntersectionObserver(stickyNav, {
	root: null,
	threshold: 0,
	rootMargin: `-${navHeight}px`
});
headerObserver.observe(header);

// Reveal sections
const allSections = document.querySelectorAll('.section');
const revealSection = function(entries, observer) {
	const [ entry ] = entries;
	console.log(entry);
	if (!entry.isIntersecting) return;
	entry.target.classList.remove('section--hidden');
	observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
	root: null,
	threshold: 0.15
});

allSections.forEach(function(section) {
	sectionObserver.observe(section);
	section.classList.add('section--hidden');
});
