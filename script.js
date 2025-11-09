const hamburgerBtn = document.getElementById("hamburger");
const closeBtn = document.getElementById("close");
const mobileMenu = document.getElementById("mobile-menu");

const sideBar = () => {
  mobileMenu.style.width = "250px";
};

const closeSideBar = () => {
  mobileMenu.style.width = "0";
};

hamburgerBtn.addEventListener("click", sideBar);
closeBtn.addEventListener("click", closeSideBar);
