
const listItem = document.querySelectorAll(".services__list-item");
const services = document.querySelector(".services");
const servicesDescription = document.querySelectorAll(".services__description");
const contactPhone = document.querySelector('.contact__phone');
const arrows = document.querySelectorAll('.reviews__arrow');
const header = document.querySelector('.header');

let activeItem = listItem[0]; //The active selection by default is the first one
let activeDescription = servicesDescription[0];
activeDescription.style.visibility = "visible" //The active description by default is the first one
let activeReviewId = 1;
let activeReview = document.getElementById(activeReviewId); //The visible review by default is the firest one.
activeReview.style.visibility = "visible";

function onChangeSelect(e){
    services.style.background = `url('./images/services/${e.target.dataset.name}.jpg') no-repeat`;
    activeItem.classList.remove('services__list-item_active')
    this.classList.add('services__list-item_active')
    activeItem = this;
    changeDescription();
}

const changeDescription = () => {
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

 const flipReview = e => {
     e.target.dataset.name === "arrow-next" ? activeReviewId++ : activeReviewId--;
     if (activeReviewId < 1) activeReviewId = 5;
     if (activeReviewId > 5) activeReviewId = 1;
     activeReview.style.visibility = "hidden";
     activeReview = document.getElementById(activeReviewId);
     activeReview.style.visibility = "visible";
 }

const initMap = () => {
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

const throttle = (func, delay) => {
    let inThrottle;
    return function() {
        if(!inThrottle) {
            func.apply(this, arguments);
            inThrottle = true;
            setTimeout(() => inThrottle = false, delay);
        }
    }
}

const checkHeader = () => {
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
} 

const throttledCheck = throttle(checkHeader, 50);





listItem.forEach(item => item.addEventListener('click', onChangeSelect));
arrows.forEach(item => item.addEventListener('click', flipReview));
window.addEventListener('scroll', throttledCheck);
ymaps.ready(initMap);



