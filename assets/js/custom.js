//////////////////////////////////////////////////
// DETECT SCROLL AND ADD WHITE BG TO NAV

const nav = document.querySelector('.navbar');

let scrollPos = window.scrollY;
const scrollLength = 1;

const onScrollAbove = () => {
  nav.classList.add('bg-white');
  nav.classList.remove('bg-transparent');
};

const onScrollBelow = () => {
  nav.classList.remove('bg-white');
  nav.classList.add('bg-transparent');
};

window.addEventListener('scroll', function () {
  scrollPos = window.scrollY;

  if (scrollPos > scrollLength) {
    onScrollAbove();
  } else {
    onScrollBelow();
  }
});

///////////////////////////////////////////////
// REVEAL SECTIONS WITH TRANSITION

const allSections = document.querySelectorAll('.section');

const revealSection = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

allSections.forEach(function (section) {
  sectionObserver.observe(section);
  section.classList.add('section--hidden');
});

//////////////////////////////////////////////////
// GALLERY DRAG AND SCROLL

const scroller = document.querySelector('.gallery__wrapper__images');
const imageBox = document.querySelectorAll('.gallery__wrapper__images__box');

let isGrabbed = false;
let initialPos;
let scrollTop;

const initializeDrag = (e) => {
  scroller.classList.add('active');
  imageBox.forEach((box) => {
    box.classList.add('shadow');
  });

  isGrabbed = true;
  initialPos = e.pageY - scroller.offsetTop;
  scrollTop = scroller.scrollTop;
};

const handleDragging = (e) => {
  if (!isGrabbed) return;
  e.preventDefault();
  const yPos = e.pageY - scroller.offsetTop;
  const walk = (yPos - initialPos) * 2;
  scroller.scrollTop = scrollTop - walk;
};

const deInitializeDrag = () => {
  isGrabbed = false;
  scroller.classList.remove('active');
  imageBox.forEach((box) => {
    box.classList.remove('shadow');
  });
};

scroller.addEventListener('mousedown', initializeDrag);
scroller.addEventListener('mousemove', handleDragging);
scroller.addEventListener('mouseleave', deInitializeDrag);
scroller.addEventListener('mouseup', deInitializeDrag);

///////////////////////////////////////////////
// MODAL

const allModals = document.querySelectorAll('.mb-modal');
const overlay = document.querySelector('.overlay');
const btnsCloseModal = document.querySelectorAll('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function (e) {
  e.preventDefault();
  let modal = e.target.id;
  selectedModal = document.querySelector(`.${modal}`);
  selectedModal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function (e) {
  let modal = e.target.id;
  selectedModal = document.querySelector(`.${modal}`);
  selectedModal.classList.add('hidden');
  overlay.classList.add('hidden');
};

const closeAllModals = function () {
  allModals.forEach((modal) => modal.classList.add('hidden'));
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach((btn) => btn.addEventListener('click', openModal));
btnsCloseModal.forEach((btn) => btn.addEventListener('click', closeModal));
overlay.addEventListener('click', closeAllModals);

document.addEventListener('keydown', function (e) {
  allModals.forEach((modal) => {
    if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
      closeAllModals();
    }
  });
});
