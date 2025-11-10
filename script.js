const hamburgerBtn = document.getElementById("hamburger");
const closeBtn = document.getElementById("close");
const mobileMenu = document.getElementById("mobile-menu");
const slides = document.querySelectorAll(".display img");
let slideIndex = 0;
let intervalId = null;

const initializeSlider = () => {
  // To avoid displaying an image if there aren't any
  if (slides.length > 0) {
    slides[slideIndex].classList.add("displaySlide");
    intervalId = setInterval(nextSlide, 5000);
  }
};

const showSlide = (index) => {
  if (index >= slides.length) {
    slideIndex = 0;
  } else if (index < 0) {
    slideIndex = slides.length - 1; // set it to the end.
  }

  slides.forEach((slide) => {
    slide.classList.remove("displaySlide");
  });

  slides[slideIndex].classList.add("displaySlide");
};

const prevSlide = () => {
  slideIndex--;
  showSlide(slideIndex);
};

const nextSlide = () => {
  slideIndex++;
  showSlide(slideIndex);
};

const currentSlide = (n) => {
  slideIndex = n - 1; // slides are 0-based
  showSlide(slideIndex);
};

const sideBar = () => {
  mobileMenu.style.width = "250px";
};

const closeSideBar = () => {
  mobileMenu.style.width = "0";
};

hamburgerBtn.addEventListener("click", sideBar);
closeBtn.addEventListener("click", closeSideBar);
initializeSlider();
