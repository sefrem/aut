
const listItem = document.querySelectorAll(".services__list-item");
const services = document.querySelector(".services");
const servicesDescription = document.querySelectorAll(".services__description");
const contactPhone = document.querySelector('.contact__phone');
const arrows = document.querySelectorAll('.reviews__arrow');
const header = document.querySelector('.header');
const hamburgerCheckbox = document.getElementById("menu__toggle");
const main = document.querySelector(".main");
const reviews = document.querySelectorAll('.reviews__review');

let activeItem = listItem[0]; //The active selection by default is the first one
let activeDescription = servicesDescription[0];
activeDescription.style.visibility = "visible" //The active description by default is the first one
let activeReviewId = 1;
let activeReview = document.getElementById(activeReviewId); //The visible review by default is the first one.
activeReview.style.visibility = "visible";
let mapsInitialized = false;
let x0 = null; //The first point of touch event.

function onChangeSelect(e){ //Here we change the background and add class "active" to a current selected option.
    services.style.background = `url('./img/services/${e.target.dataset.name}.jpg') 0% 0% / cover no-repeat`;
    activeItem.classList.remove('services__list-item_active')
    this.classList.add('services__list-item_active')
    activeItem = this;
    changeDescription();
}

function changeDescription() {  //Also changing the description to match the selected service option.
    activeDescription.style.visibility = "hidden";
    servicesDescription.forEach(item => {
        if(item.dataset.name === activeItem.dataset.name) {
            activeDescription = item
        }
        if(activeItem.dataset.name === "carWash") {
            contactPhone.innerHTML = "8 (905) 042-3355";
        } else {
            contactPhone.innerHTML = "8 (951) 313-2122"
        }
    });
    activeDescription.style.visibility = "visible";
 }

 function arrowSelect(e) {
     e.target.dataset.name === "arrow-next" ? flipReview(activeReviewId++) : 
                                                flipReview(activeReviewId--);
 }

 function flipReview() {
     if (activeReviewId < 1) activeReviewId = 5;
     if (activeReviewId > 5) activeReviewId = 1;
     activeReview.style.visibility = "hidden";
     activeReview = document.getElementById(activeReviewId);
     activeReview.style.visibility = "visible";
 }

 function initMap() {   //Adding Yandex maps.
    const myMap = new ymaps.Map("map", {
        center: [51.76595957, 36.22226938],
        zoom: 17
    }, {
        iconLayout: "default#image"
    });
    myGeoObject = new ymaps.GeoObject({
        geometry: {
            type: "Point",
            coordinates: [51.76595957, 36.22226938]
        },
    });
    myMap.geoObjects.add(myGeoObject);
}

function throttle(func, delay) {   //Throttle for the mouse event.
    let inThrottle;
    return function() {
        if(!inThrottle) {
            func.apply(this, arguments);
            inThrottle = true;
            setTimeout(() => inThrottle = false, delay);
        }
    }
}

function checkHeader() {    //After some scrolling we make the header sticky and after some more scrolling we render it in view. 2 steps needed in order to set the transformation property for the transition.
    let scrollPosition = Math.round(window.scrollY);
    if (scrollPosition >= 400) {
        header.classList.add('header_sticky');
    } else {
        header.classList.remove('header_sticky');
    };
    if (scrollPosition >= 801 ) {
        header.classList.add('header_sticky-inView')
    } else {
        header.classList.remove('header_sticky-inView');
    }
    if (scrollPosition >= 3500 && !mapsInitialized) {
        ymaps.ready(initMap);
        mapsInitialized = true;
    }
} 

const throttledCheck = throttle(checkHeader, 50);

function closeHamburgerMenu() { //This function is for closing the hamburger menu if it's open by clocking anywhere within the window.
    if(hamburgerCheckbox.checked) hamburgerCheckbox.checked = false;
}


function lock(e) { //remembering the first point of the touchevent.
    e.preventDefault();
    x0 = e.changedTouches[0].clientX;
}

function move(e) { //calculating the difference between the first and the last point of the touch event. And change the review accorfingly.
    e.preventDefault();
    if(x0 || x0 === 0) {
        let diff = e.changedTouches[0].clientX - x0;
        if (diff < 0) {
            flipReview(activeReviewId++);
        } else { 
            flipReview(activeReviewId--);
        }
        diff = null;
    }
}

listItem.forEach(item => item.addEventListener('click', onChangeSelect));
arrows.forEach(item => item.addEventListener('click', arrowSelect));
window.addEventListener('scroll', throttledCheck);
main.addEventListener('click', closeHamburgerMenu)
reviews.forEach(review => {
    review.addEventListener('touchstart', lock);
    review.addEventListener('touchend', move);
}
    );