const hamburgerBtn = document.getElementById("hamburger");
const closeBtn = document.getElementById("close");
const mobileMenu = document.getElementById("mobile-menu");
const slides = document.querySelectorAll(".display img");
// Select all small images
const small = document.querySelectorAll(".small");
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
  clearInterval(intervalId); // allow user to take some time to view an image
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

// Loop through each one
small.forEach((img) => {
  img.addEventListener("click", () => {
    // Change the big image
    document.querySelector(".displaySlide").src = img.src;

    // Remove border from all thumbnails
    small.forEach((s) => (s.style.border = "none"));
    small.forEach((s) => (s.style.opacity = "1"));

    // Add styles to the clicked one
    img.style.opacity = 0.5;
    img.style.border = "3px solid orange";
    clearInterval(intervalId); // allow user to take some time to view an image
  });
});

const sideBar = () => {
  mobileMenu.style.width = "250px";
};

const closeSideBar = () => {
  mobileMenu.style.width = "0";
};

hamburgerBtn.addEventListener("click", sideBar);
closeBtn.addEventListener("click", closeSideBar);
initializeSlider();
