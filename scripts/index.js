
const listItem = document.querySelectorAll(".services__list-item");
const services = document.querySelector(".services");
const servicesDescription = document.querySelectorAll(".services__description");

let activeItem = listItem[0]; //The active selection by default is the first one
let activeDescription = servicesDescription[0];
activeDescription.style.visibility = "visible" //The active description by default is the first one

function onChangeSelect(e) {
    services.style.background = `url('./images/services/${e.target.dataset.name}.jpg') no-repeat`;
    activeItem.classList.remove('services__list-item_active')
    this.classList.add('services__list-item_active')
    activeItem = this;
    changeDescription()
}

function changeDescription() {
    activeDescription.style.visibility = "hidden";
    servicesDescription.forEach(item => {
        if(item.dataset.name === activeItem.dataset.name) {
            activeDescription = item
        }
        if(activeItem.dataset.name === "carWash") {
            document.querySelector('.contacts__phone').innerHTML = "8 (905) 042-3355";
        } else {
            document.querySelector('.contacts__phone').innerHTML = "8 (951) 313-2122"
        }
    })
    activeDescription.style.visibility = "visible"
 }


listItem.forEach(item => item.addEventListener('click', onChangeSelect))



