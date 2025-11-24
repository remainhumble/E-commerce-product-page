const hamburgerBtn = document.getElementById("hamburger");
const closeBtn = document.getElementById("closeSidebar");
const overlay = document.getElementById("overlay");
const mobileMenu = document.getElementById("mobile-menu");
const slides = document.querySelectorAll("#display img, .display img");
const pageThumbs = document.querySelectorAll(".slideshow .small");
const lightboxThumbs = document.querySelectorAll("#lightBox .small");
const slideshow = document.querySelectorAll(".slideshow");
const lightBox = document.getElementById("lightBox");
const lightboxImages = document.querySelectorAll(
  "#lightBox #lightboxDisplay img"
);
const lightboxContainer = document.getElementById("lightboxContainer");
const closeLightbox = document.getElementById("close-lightbox");
const cartIcon = document.getElementById("shopping-cart");

let slideIndex = 0;
let intervalId = null;

cartIcon.addEventListener("click", () => {
  console.log("Cart icon clicked");
})

const initializeSlider = () => {
  // To avoid displaying an image if there aren't any
  if (slides.length > 0) {
    slides[slideIndex].classList.add("displaySlide");
    intervalId = setInterval(nextSlide, 5000);
  }
};

const initializeLightboxSlider = () => {
  // Only initialize the lightbox slider on large screens where the
  // lightbox is intended to be used (matches CSS breakpoint).
  if (!window.matchMedia("(min-width: 1025px)").matches) return;

  // To avoid displaying an image if there aren't any
  if (lightboxImages.length > 0) {
    lightboxImages[slideIndex].classList.add("displaySlide");
    intervalId = setInterval(nextSlide, 5000);
  }
};

// Show slide by index
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

const showSlideInLightbox = (index) => {
  if (index >= lightboxImages.length) {
    slideIndex = 0;
  } else if (index < 0) {
    slideIndex = lightboxImages.length - 1; // set it to the end.
  }

  lightboxImages.forEach((slide) => {
    slide.classList.remove("displaySlide");
  });

  lightboxImages[slideIndex].classList.add("displaySlide");
};

const prevSlide = () => {
  clearInterval(intervalId); // allow user to take some time to view an image
  slideIndex--;
  showSlide(slideIndex);
  showSlideInLightbox(slideIndex);
};

const nextSlide = () => {
  slideIndex++;
  showSlide(slideIndex);
  showSlideInLightbox(slideIndex);
};

const currentSlide = (n) => {
  slideIndex = n - 1; // slides are 0-based
  showSlide(slideIndex);
  showSlideInLightbox(slideIndex);
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
  // Prevent the lightbox from appearing on small screens. The lightbox
  // UI is designed for larger viewports; on smaller screens we simply
  // don't open it and keep the inline page image interaction instead.
  if (!window.matchMedia("(min-width: 1025px)").matches) return;

  lightBox.style.display = "flex"; // show the lightbox
};

// Loop through each image
slides.forEach((item) => {
  item.addEventListener("click", showLightBox);
});

// Helper to update thumbnail styles
const updateThumbnailStyles = (thumbList, activeIndex) => {
  thumbList.forEach((s, i) => {
    s.style.border = i === activeIndex ? "3px solid orange" : "none";
    s.style.opacity = i === activeIndex ? 0.5 : "1";
  });
};

// Click handlers for page thumbnails
pageThumbs.forEach((img, idx) => {
  img.addEventListener("click", () => {
    slideIndex = idx;
    showSlide(slideIndex);
    showSlideInLightbox(slideIndex);
    updateThumbnailStyles(pageThumbs, slideIndex);
    updateThumbnailStyles(lightboxThumbs, slideIndex);
    clearInterval(intervalId); // allow user to take some time to view an image
  });
});

// Click handlers for lightbox thumbnails (keep both in sync)
lightboxThumbs.forEach((img, idx) => {
  img.addEventListener("click", () => {
    slideIndex = idx;
    showSlide(slideIndex);
    showSlideInLightbox(slideIndex);
    updateThumbnailStyles(pageThumbs, slideIndex);
    updateThumbnailStyles(lightboxThumbs, slideIndex);
    clearInterval(intervalId);
  });
});

hamburgerBtn.addEventListener("click", sideBar);
closeBtn.addEventListener("click", closeSideBar);
closeLightbox.addEventListener("click", closeLightBox);
initializeSlider();
initializeLightboxSlider();
