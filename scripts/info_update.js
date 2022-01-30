//block\form
const popupProfile = document.querySelector('.popup_profile_js');
const popupElement = document.querySelector('.popup_element_js');
const popupPhoto = document.querySelector('.popup_photo_js');
const popupProfileForm = popupProfile.querySelector('.popup__form');
const popupElementForm = popupElement.querySelector('.popup__form');
const templElement = document.querySelector('.template_element').content;
const elements = document.querySelector('.elements');
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

function closeActivePopup () {
    switchVisible(document.querySelector('.popup_visible'));
}

function closePopupsByEsc (event) {
    if (event.key === 'Escape') { 
        closeActivePopup();
    }
}

function closePopupsByOverlay (event) {
    if (event.target === event.currentTarget) {
        closeActivePopup();
    }
}

function switchVisible (obj) {
    if (obj !== null) { //если не проверить, то пока идет плавное закрытие окна можно понажимать на крестик и словить ошибку
        obj.classList.toggle('popup_visible')
        if (obj.classList.contains('popup_visible')) {
           obj.addEventListener('mousedown', closePopupsByOverlay);
           document.addEventListener('keydown', closePopupsByEsc);
       } else {
           obj.removeEventListener('mousedown', closePopupsByOverlay);
           document.removeEventListener('keydown', closePopupsByEsc);
       }
    }
}

function openPopupPhoto (item) {
    popupImg.src = item.link;
    popupImg.alt = 'фотография ' + item.name;
    popupImgName.textContent = item.name;
    switchVisible(popupPhoto);
}



function handlerSubmitProfileForm (event) {
    event.preventDefault();
    profileUserName.textContent = popupProfileInputName.value;
    profileUserDescription.textContent = popupProfileAbout.value;
    switchVisible(popupProfile);
}

function createElement (item) {//
    const element = templElement.cloneNode(true);
    const elementImg = element.querySelector('.element__img');
    const elementTitle = element.querySelector('.element__title');
    const elementHeart = element.querySelector('.element__btn-heart');
    const elementDelete = element.querySelector('.element__btn-delete');
    elementImg.src = item.link;
    elementImg.alt = 'фотография ' + item.name;
    elementImg.addEventListener('click',() => openPopupPhoto(item));
    elementTitle.textContent=item.name;
    elementHeart.addEventListener('click',() => elementHeart.classList.toggle('element__btn-heart_active'));
    elementDelete.addEventListener('click',() => elementDelete.parentElement.remove());
    return element;
}

function addToDom (dom,newDom,type = 'prepend') {
    switch (type) {
        case 'prepend'://остальное допишется\добавится когда будет необходимо
            dom.prepend(newDom);
            break;
    }
}

function addElement (item, domTarget) {
    const element = createElement (item);
    addToDom(domTarget, element);  
}

function addElements(objData, domTarget) {
    objData.reverse().forEach(item => {
        addElement(item, domTarget);
    });
}

addElements(initialCards, elements);

profileBtnClose.addEventListener('click', closeActivePopup) 
profileBtnEdit.addEventListener('click', () => openPopupEdit(ValidationConstants))
popupProfileForm.addEventListener('submit', handlerSubmitProfileForm)
profileBtnAdd.addEventListener('click', () => switchVisible(popupElement))
elementBtnClose.addEventListener('click', closeActivePopup) 
popupElementForm.addEventListener('submit', (event) => handlerSubmitElementForm(event, ValidationConstants))
PhotoBtnClose.addEventListener('click', closeActivePopup)    
