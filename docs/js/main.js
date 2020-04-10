const listItem = document.querySelectorAll(".services__list-item");
const services = document.querySelector(".services");
const servicesDescription = document.querySelectorAll(".services__description");
const contactPhone = document.querySelector(".contact__phone");
const arrows = document.querySelectorAll(".reviews__arrow");
const header = document.querySelector(".header");
const hamburgerCheckbox = document.getElementById("menu__toggle");
const main = document.querySelector(".main");
const reviews = document.querySelectorAll(".reviews__review");

let activeItem = listItem[0]; 
let prevActiveitem;
let activeDescription = servicesDescription[0];
activeDescription.style.visibility = "visible"; 
let activeReviewId = 1;
let activeReview = document.getElementById(activeReviewId);
activeReview.style.visibility = "visible";
let mapsInitialized = false;
let x0 = null;
let y0 = null;

function onChangeSelect(e) {
  services.style.background = `url('./img/services/${e.target.dataset.name}.jpg') center center / cover no-repeat`;
  activeItem.classList.remove("services__list-item_active");
  this.classList.add("services__list-item_active");
  prevActiveitem = activeItem;
  activeItem = this;
  changeDescription();
}

function changeDescription() {
  activeDescription.style.visibility = "hidden";
  servicesDescription.forEach((item) => {
    if (item.dataset.name === activeItem.dataset.name) {
      activeDescription = item;
    }
    if (
      activeItem.dataset.name === "alignment" ||
      activeItem.dataset.name === "headlights"
    ) {
      contactPhone.innerHTML = "8 (951) 313-2122";
    }
    if (
      prevActiveitem.dataset.name === "alignment" ||
      prevActiveitem.dataset.name === "headlights"
    ) {
      contactPhone.innerHTML = "8 (905) 042-3355";
    }
  });
  activeDescription.style.visibility = "visible";
}

function arrowSelect(e) {
  e.target.dataset.name === "arrow-next"
    ? flipReview(activeReviewId++)
    : flipReview(activeReviewId--);
}

function flipReview() {
  if (activeReviewId < 1) activeReviewId = 5;
  if (activeReviewId > 5) activeReviewId = 1;
  activeReview.style.visibility = "hidden";
  activeReview = document.getElementById(activeReviewId);
  activeReview.style.visibility = "visible";
}

const throttledCheckHeader = throttle(checkHeader, 50);

function throttle(func, delay) {
  let inThrottle;
  return function () {
    if (!inThrottle) {
      func.apply(this, arguments);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), delay);
    }
  };
}

function checkHeader() {
  let scrollPosition = Math.round(window.scrollY);
  if (scrollPosition >= 400 && window.innerWidth > 1200) {
    header.classList.add("header_sticky");
  } else {
    header.classList.remove("header_sticky");
  }
  if (scrollPosition >= 801 && window.innerWidth > 1200) {
    header.classList.add("header_sticky-inView");
  } else {
    header.classList.remove("header_sticky-inView");
  }
  initializeMapIfScrolledToPosition();
}

function initializeMapIfScrolledToPosition() {
  let scrollPosition = Math.round(window.scrollY);
  if (scrollPosition >= 3500 && !mapsInitialized) {
    ymaps.ready(initMap);
    mapsInitialized = true;
  }
}

function initMap() {
  const myMap = new ymaps.Map(
    "map",
    {
      center: [51.76595957, 36.22226938],
      zoom: 17,
    },
    {
      iconLayout: "default#image",
    }
  );
  myGeoObject = new ymaps.GeoObject({
    geometry: {
      type: "Point",
      coordinates: [51.76595957, 36.22226938],
    },
  });
  myMap.geoObjects.add(myGeoObject);
  myMap.behaviors.disable('drag');
}

function closeHamburgerMenu() {
  if (hamburgerCheckbox.checked) hamburgerCheckbox.checked = false;
}

function lock(e) {
  x0 = e.changedTouches[0].screenX;
  y0 = e.changedTouches[0].screenY;
}

function move(e) {
  let diffX = e.changedTouches[0].screenX - x0;
  let diffY = e.changedTouches[0].screenY - y0;
  if (Math.abs(diffY) < 40) {
    diffX < 0 ? flipReview(activeReviewId++) : flipReview(activeReviewId--);
  }
}

listItem.forEach((item) => item.addEventListener("click", onChangeSelect));
arrows.forEach((item) => item.addEventListener("click", arrowSelect));
window.addEventListener("scroll", throttledCheckHeader);
main.addEventListener("click", closeHamburgerMenu);
reviews.forEach((review) => {
  review.addEventListener("touchstart", lock);
  review.addEventListener("touchend", move);
});