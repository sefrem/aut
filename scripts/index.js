
const listItem = document.querySelectorAll(".services__list-item");
const services = document.querySelector(".services");
const servicesDescription = document.querySelectorAll(".services__description");
const contactPhone = document.querySelector('.contact__phone');
const arrows = document.querySelectorAll('.reviews__arrow');


let activeItem = listItem[0]; //The active selection by default is the first one
let activeDescription = servicesDescription[0];
activeDescription.style.visibility = "visible" //The active description by default is the first one
let activeReviewId = 1;
let activeReview = document.getElementById(activeReviewId); //The visible review by default is the firest one.
activeReview.style.visibility = "visible";

function onChangeSelect(e) {
    services.style.background = `url('./images/services/${e.target.dataset.name}.jpg') no-repeat`;
    activeItem.classList.remove('services__list-item_active')
    this.classList.add('services__list-item_active')
    activeItem = this;
    changeDescription();
}

function changeDescription() {
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

 function flipReview(e) {
     e.target.dataset.name === "arrow-next" ? activeReviewId++ : activeReviewId--;
     if (activeReviewId < 1) activeReviewId = 5;
     if (activeReviewId > 5) activeReviewId = 1;
     activeReview.style.visibility = "hidden";
    //  activeReview.style.transform = "translateX(-50%)";
     activeReview = document.getElementById(activeReviewId);
     activeReview.style.visibility = "visible";
    //  activeReview.style.transform = "translateX(0%)";
 }

listItem.forEach(item => item.addEventListener('click', onChangeSelect));
arrows.forEach(item => item.addEventListener('click', flipReview));


