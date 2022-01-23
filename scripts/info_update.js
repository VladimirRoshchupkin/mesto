//window
const popupProfile = document.querySelector('.popup_profile_js');
const popupElement = document.querySelector('.popup_element_js');
const popupPhoto = document.querySelector('.popup_photo_js');
const popupProfileForm = popupProfile.querySelector('.popup__form');
const popupElementForm = popupElement.querySelector('.popup__form');
const templElement = document.querySelector('.template_element').content;
const elements = document.querySelector('.elements')
//btn
const profileBtnEdit = document.querySelector('.profile__btn-edit');
const profileBtnAdd = document.querySelector('.profile__btn-add');

const profileBtnClose = popupProfile.querySelector('.popup__btn-close');
const profileBtnSave = popupProfile.querySelector('.popup__btn-save');

const elementBtnClose = popupElement.querySelector('.popup__btn-close');
const elementBtnSave = popupElement.querySelector('.popup__btn-save');

const PhotoBtnClose = popupPhoto.querySelector('.popup__btn-close');

//element
const profileUserName = document.querySelector('.profile__user-name');
const profileUserDescription = document.querySelector('.profile__user-description');

const popupProfileInputName = popupProfile.querySelector('.popup__input_name_js');
const popupProfileAbout = popupProfile.querySelector('.popup__input_about_js');
const popupElementInputName = popupElement.querySelector('.popup__input_name_js');
const popupElementLink = popupElement.querySelector('.popup__input_link_js');

const popupImg = popupPhoto.querySelector('.popup__img');
const popupImgName = popupPhoto.querySelector('.popup__figcap');

addElement(initialCards)

function addElement(objData) {
    objData.reverse().forEach(item => {//
        const element = templElement.cloneNode(true);
        const elementImg = element.querySelector('.element__img');
        const elementTitle = element.querySelector('.element__title');
        const elementHeart = element.querySelector('.element__btn-heart');
        const elementDelete = element.querySelector('.element__btn-delete');
        elementImg.src=item.link;
        elementImg.alt='фотография ' + item.name;
        elementImg.addEventListener('click',() => openPopupPhoto(item))
        elementTitle.textContent=item.name;
        elementHeart.addEventListener('click',() => elementHeart.classList.toggle('element__btn-heart_active'));
        elementDelete.addEventListener('click',() => elementDelete.parentElement.remove());
        elements.prepend(element);
    });
}

function openPopupPhoto (item) {
    popupImg.src=item.link;
    popupImg.alt='фотография ' + item.name;
    popupImgName.textContent=item.name
    popupPhoto.classList.remove('popup_invisible')
}



function switchVisible (obj) {
    obj.classList.toggle('popup_invisible')
}
function openPopupEdit () {
    popupProfileInputName.value=profileUserName.textContent
    popupProfileAbout.value=profileUserDescription.textContent
    switchVisible(popupProfile)
}

function profileFormSubmitHandler (event) {
    event.preventDefault();
    profileUserName.textContent=popupProfileInputName.value
    profileUserDescription.textContent=popupProfileAbout.value
    switchVisible(popupProfile)
}
function openPopupAdd () {
    popupElementForm.reset()
    switchVisible(popupElement)
}
function elementFormSubmitHandler (event) {
    event.preventDefault();
    
    addElement([{name: popupElementInputName.value, link: popupElementLink.value}]);
    switchVisible(popupElement);
}


profileBtnClose.addEventListener('click',() => switchVisible(popupProfile))
profileBtnEdit.addEventListener('click',openPopupEdit)
popupProfileForm.addEventListener('submit',profileFormSubmitHandler)

profileBtnAdd.addEventListener('click',openPopupAdd)
elementBtnClose.addEventListener('click',() => switchVisible(popupElement))
popupElementForm.addEventListener('submit',elementFormSubmitHandler)

PhotoBtnClose.addEventListener('click',() => switchVisible(popupPhoto))

