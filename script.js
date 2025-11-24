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
const basket = document.getElementById("basket");

let slideIndex = 0;
let intervalId = null;

const toggleBasketVisibility = () => {
  // Toggle the visible state on the basket container

  basket.classList.toggle("open");
  // Visual feedback on the cart icon when open
  if (basket.classList.contains("open")) {
    cartIcon.style.filter = "brightness(0)";
  } else {
    cartIcon.style.filter = "";
  }
};

// RENDER CART ITEM FROM product.js
const totalItemsEl = document.querySelector(".total-items-in-cart");
let cartState = {}; // { [productId]: quantity }

const renderItem = () => {
  const cartItemContainer = document.getElementById("cart-item");
  const checkoutBtn = document.getElementById("checkout");

  const totalQty = Object.values(cartState).reduce((a, b) => a + b, 0);
  if (totalItemsEl) totalItemsEl.textContent = totalQty;

  if (totalQty === 0) {
    if (cartItemContainer)
      cartItemContainer.innerHTML = '<p class="empty">Your cart is empty.</p>';
    if (checkoutBtn) checkoutBtn.style.display = "none";
    return;
  }

  if (checkoutBtn) checkoutBtn.style.display = "";

  // Rebuild the cart items markup from cartState and products array
  if (!cartItemContainer) return;
  cartItemContainer.innerHTML = "";

  Object.entries(cartState).forEach(([id, qty]) => {
    const product = products.find((p) => String(p.id) === String(id));
    if (!product) return;
    const totalPrice = (product.price * qty).toFixed(2);
    const itemHTML = `
      <div class="cart-item">
     <div id="product-info">
     <div class="item-details">
        <div class="item-img"><img src="${product.imgSrc}" alt="${
      product.name
    }" /></div>
       
          <div id="product-name"><h4>${product.name}</h4>
           <div id="details">
            <span class="unit-price"><small>$</small>${product.price.toFixed(
              2
            )}</span>
            <div class="units">
              <span class="quantity">x ${qty}</span>
              <span class="total-by-quantity">$${totalPrice}</span>
            </div>
          </div>
          </div>

          <div class="delete"><img src="images/icon-delete.svg" alt="remove-item" data-id="${
            product.id
          }" class="delete-btn" /></div>
    </div>
          
        </div>
       
      </div>
    `;
    cartItemContainer.insertAdjacentHTML("beforeend", itemHTML);
  });

  // Attach delete handlers
  cartItemContainer.querySelectorAll(".delete-btn").forEach((btn) => {
    btn.addEventListener("click", function () {
      const id = Number(this.dataset.id);
      delete cartState[id];
      renderItem();
    });
  });
};

// Update cart by adding `quantity` units of product at `productIndex` in `products`
function updateCart(quantity, productIndex) {
  const product = products[productIndex];
  if (!product) return;

  if (quantity <= 0) {
    delete cartState[product.id];
  } else {
    cartState[product.id] = (cartState[product.id] || 0) + Number(quantity);
    // Do not exceed available stock
    if (cartState[product.id] > product.instock) {
      cartState[product.id] = product.instock;
    }
  }

  renderItem();
}

// Wire the Add to cart button to use the current `data` (counter) value.
const addToCartBtn = document.getElementById("add-to-cart");
if (addToCartBtn) {
  addToCartBtn.addEventListener("click", () => {
    const qtyToAdd = Number(data) || 0;
    if (qtyToAdd > 0) {
      // default to first product (index 0) — adjust if multiple products exist
      updateCart(qtyToAdd, 0);
      // reset displayed counter after adding
      data = 0;
      updateDisplay();
    }
  });
}

cartIcon.addEventListener("click", (ev) => {
  ev.stopPropagation(); // avoid the document click handler immediately closing it
  // render current cart contents then toggle visibility
  // renderItem();
  toggleBasketVisibility();
});

// Close basket when clicking outside
document.addEventListener("click", (ev) => {
  const target = ev.target;
  if (
    !basket.contains(target) &&
    target !== cartIcon &&
    basket.classList.contains("open")
  ) {
    basket.classList.remove("open");
    cartIcon.style.filter = "";
  }
});

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
