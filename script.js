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
const belowCartTitle = document.getElementById("below-cart-title");
const discountedPrice = document.getElementById("discounted-price");
const addToCartBtn = document.getElementById("add-to-cart"); 

let slideIndex = 0;
let intervalId = null;
const renderItem = () => {
  // Render the contents of the `cart` array into the basket element.
  basket.innerHTML = '';

  if (!Array.isArray(cart) || cart.length === 0) {
    basket.innerHTML = `
      <h4 id="cart-title">Cart</h4>
      <div id="cart-empty" style="padding:16px;">Your cart is empty.</div>
    `;
    return;
  }

  // Render all items (supports multiple items)
  let html = `<h4 id="cart-title">Cart</h4>`;
  cart.forEach((item, idx) => {
    const unitPrice = typeof item.price === 'number' ? item.price : 0;
    html += `
      <div class="cart-row" data-id="${item.id}">
        <div class="item-img"><img src="${item.imgSrc || 'images/image-product-1-thumbnail.jpg'}" alt="${item.name || ''}"></div>
        <div id="product-info">
          <div id="product-name"><h4>${item.name || ''}</h4></div>
          <div id="details">
            <span class="unit-price"><small>$</small>${unitPrice.toFixed(2)}</span>
            <div class="units">
              <span class="quantity">x ${item.numberOfUnits}</span>
              <span class="total-by-quantity">$${(unitPrice * item.numberOfUnits).toFixed(2)}</span>
            </div>
          </div>
        </div>
        <div class="delete"><button class="delete-item" data-id="${item.id}" style="background:none;border:none;cursor:pointer;"><img src="images/icon-delete.svg" alt="remove-item"></button></div>
      </div>
    `;
  });

  html += `<button id="checkout">Checkout</button>`;
  basket.innerHTML = html;

  // attach delete handlers
  basket.querySelectorAll('.delete-item').forEach((btn) => {
    btn.addEventListener('click', () => {
      const id = Number(btn.dataset.id);
      removeFromCart(id);
    });
  });
};

// CART ARRAY
let cart = JSON.parse(localStorage.getItem("CART")) || [];

// Remove an item from the cart (by id)
const removeFromCart = (id) => {
  cart = cart.filter((it) => it.id !== id);
  updateCart();
};

// Add to cart: supports two modes
// - called with an `id` to add a single unit of that product
// - called with no args (from the page Add-to-cart button) to add `data` units of the first product
const addToCart = (id) => {
  // Helper to read the source product entry safely
  const sourceProduct = (typeof products !== 'undefined' && Array.isArray(products) && products[0])
    ? products[0]
    : { id: 0, name: 'Fall Limited Edition Sneakers', price: 125, imgSrc: 'images/image-product-1-thumbnail.jpg', instock: 3 };

  // Mode A: add by id (single unit)
  if (typeof id === 'number') {
    const existing = cart.find((item) => item.id === id);
    if (existing) {
      existing.numberOfUnits = (existing.numberOfUnits || 0) + 1;
    } else {
      const productItem = (typeof products !== 'undefined' && Array.isArray(products))
        ? products.find((p) => p.id === id)
        : null;
      if (!productItem) return;
      cart.push({ id: productItem.id, name: productItem.name, price: productItem.price, imgSrc: productItem.imgSrc, numberOfUnits: 1 });
    }
    updateCart();
    return;
  }

  // Mode B: page Add-to-cart button: add `data` units of the first product
  const qtyToAdd = Number(data) || 0;
  if (qtyToAdd <= 0) return;

  const prod = sourceProduct;
  const existing = cart.find((it) => it.id === prod.id);
  const alreadyInCart = existing ? existing.numberOfUnits : 0;
  const available = typeof prod.instock === 'number' ? prod.instock - alreadyInCart : Infinity;
  const toAdd = Math.min(qtyToAdd, Math.max(0, available));
  if (toAdd <= 0) return;

  if (existing) {
    existing.numberOfUnits = (existing.numberOfUnits || 0) + toAdd;
  } else {
    cart.push({ id: prod.id, name: prod.name, price: prod.price, imgSrc: prod.imgSrc, numberOfUnits: toAdd });
  }

  // reset selection
  data = 0;
  updateDisplay();

  updateCart();
  // open basket to show user
  basket.classList.add('open');
  cartIcon.style.filter = 'brightness(0)';
};

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

cartIcon.addEventListener("click", (ev) => {
  ev.stopPropagation(); // avoid the document click handler immediately closing it
  // render current cart contents then toggle visibility
  renderItem();
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

const updateCart = () => {
  renderItem();
  // renderSubtotal();

  // SAVE CART TO LOCAL STORAGE
  localStorage.setItem("CART", JSON.stringify(cart));
};

hamburgerBtn.addEventListener("click", sideBar);
closeBtn.addEventListener("click", closeSideBar);
closeLightbox.addEventListener("click", closeLightBox);
if (addToCartBtn) {
  // call without id so the page selection (`data`) is used
  addToCartBtn.addEventListener('click', () => addToCart());
}
initializeSlider();
initializeLightboxSlider();
