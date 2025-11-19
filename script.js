const hamburgerBtn = document.getElementById("hamburger");
const overlay = document.getElementById("overlay");
const mobileMenu = document.getElementById("mobile-menu");
const slides = document.querySelectorAll(".display img");
const small = document.querySelectorAll(".small");
const lightBox = document.getElementById("lightBox");
const lightboxImages = document.querySelectorAll(
  "#lightBox #lightboxDisplay img"
);
const closeBtn = document.getElementById("close");
const closeLightbox = document.getElementById("close-lightbox");

let mainIndex = 0;
let lightboxIndex = 0;

// MAIN SLIDER
function showMainSlide(i) {
  if (i >= slides.length) mainIndex = 0;
  else if (i < 0) mainIndex = slides.length - 1;
  else mainIndex = i;

  slides.forEach((s) => s.classList.remove("displaySlide"));
  slides[mainIndex].classList.add("displaySlide");
}

// LIGHTBOX SLIDER
function showLightboxSlide(i) {
  if (i >= lightboxImages.length) lightboxIndex = 0;
  else if (i < 0) lightboxIndex = lightboxImages.length - 1;
  else lightboxIndex = i;

  lightboxImages.forEach((s) => s.classList.remove("displaySlide"));
  lightboxImages[lightboxIndex].classList.add("displaySlide");
}

// Thumbnail click
small.forEach((img, idx) => {
  img.addEventListener("click", () => {
    showMainSlide(idx);
    showLightboxSlide(idx);

    small.forEach((s) => {
      s.style.border = "none";
      s.style.opacity = "1";
    });
    img.style.opacity = "0.5";
    img.style.border = "3px solid orange";
  });
});

slides.forEach((img, idx) => {
  img.addEventListener("click", () => {
    lightBox.style.display = "flex";
    showLightboxSlide(idx);
  });
});

// SIDEBAR
function sideBar() {
  mobileMenu.style.width = "250px";
  overlay.style.display = "block";
}

function closeSideBar() {
  mobileMenu.style.width = "0";
  overlay.style.display = "none";
}

function closeLightBox() {
  lightBox.style.display = "none";
}

// NAV
function prevSlide() {
  showMainSlide(mainIndex - 1);
  showLightboxSlide(lightboxIndex - 1);
}

function nextSlide() {
  showMainSlide(mainIndex + 1);
  showLightboxSlide(lightboxIndex + 1);
}

hamburgerBtn.addEventListener("click", sideBar);
closeBtn.addEventListener("click", closeSideBar);
closeLightbox.addEventListener("click", closeLightBox);

function initializeSlider() {
  showMainSlide(0);
}

function initializeLightboxSlider() {
  showLightboxSlide(0);
}

initializeSlider();
initializeLightboxSlider();
