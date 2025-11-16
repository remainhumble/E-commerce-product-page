const hamburgerBtn = document.getElementById("hamburger");
const closeBtn = document.getElementById("close");
const overlay = document.getElementById("overlay");
const mobileMenu = document.getElementById("mobile-menu");
const slides = document.querySelectorAll(".display img");
const small = document.querySelectorAll(".small");
const slideshow = document.querySelectorAll(".slideshow");
const lightBox = document.getElementById("lightBox");
const lightboxImages = document.querySelectorAll("#lightBox .display img");
const lightboxContainer = document.getElementById("lightboxContainer");
const close = document.getElementById("close");
const closeLightbox = document.getElementById("close-lightbox");

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

const sideBar = () => {
  mobileMenu.style.width = "250px";
  overlay.style.display = "block";
};

const closeSideBar = () => {
  mobileMenu.style.width = "0";
  overlay.style.display = "none";
};

const closeLightBox = () => {
  lightBox.style.display = "none";
};

const incrementBtn = document.getElementById("increment");
const decrementBtn = document.getElementById("decrement");

let data = 0;
// Update the displayed count and disable decrement if at zero
function updateDisplay() {
  document.getElementById("counting").innerText = data;
  decrementBtn.disabled = data === 0;
}

//printing default value of data that is 0 in h2 tag
document.getElementById("counting").innerText = data;

//creation of increment function
function increment() {
  data = data + 1;
  document.getElementById("counting").innerText = data;
  updateDisplay();
}

//creation of decrement function
function decrement() {
  data = data - 1;
  document.getElementById("counting").innerText = data;
  updateDisplay();
}

const showLightBox = () => {
  lightBox.style.display = "flex"; // show the lightbox
  lightboxContainer.src = item.src; // update image
};

// Loop through each image
slides.forEach((item) => {
  item.addEventListener("click", showLightBox);
});

// Loop through each one
small.forEach((img) => {
  img.addEventListener("click", () => {
    // Change the big image
    document.querySelector(".displaySlide").src = img.src;
    lightboxContainer.src = img.src;

    // Remove border from all thumbnails
    small.forEach((s) => (s.style.border = "none"));
    small.forEach((s) => (s.style.opacity = "1"));

    // Add styles to the clicked one
    img.style.opacity = 0.5;
    img.style.border = "3px solid orange";
    clearInterval(intervalId); // allow user to take some time to view an image
  });
});

hamburgerBtn.addEventListener("click", sideBar);
closeBtn.addEventListener("click", closeSideBar);
closeLightbox.addEventListener("click", closeLightBox);
initializeSlider();
