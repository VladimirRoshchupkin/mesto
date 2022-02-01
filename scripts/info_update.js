//block\form
const popupProfile = document.querySelector('.popup_js_profile');
const popupElement = document.querySelector('.popup_js_element');
const popupPhoto = document.querySelector('.popup_js_photo');
const popupProfileForm = popupProfile.querySelector('.popup__form');
const popupElementForm = popupElement.querySelector('.popup__form');
const templElement = document.querySelector('.template_element').content;
const elements = document.querySelector('.elements');
//btn
const profileBtnEdit = document.querySelector('.profile__btn-edit');
const profileBtnAdd = document.querySelector('.profile__btn-add');

const profileBtnClose = popupProfile.querySelector('.popup__btn-close');
const elementBtnClose = popupElement.querySelector('.popup__btn-close');
const photoBtnClose = popupPhoto.querySelector('.popup__btn-close');

const profileBtnSave = popupProfile.querySelector('.popup__btn-save');//уже используется
const elementBtnSave = popupElement.querySelector('.popup__btn-save');//уже используется
//element
const profileUserName = document.querySelector('.profile__user-name');
const profileUserDescription = document.querySelector('.profile__user-description');

const popupProfileInputName = popupProfile.querySelector('.popup__input_js_name');
const popupProfileAbout = popupProfile.querySelector('.popup__input_js_about');
const popupElementInputName = popupElement.querySelector('.popup__input_js_name');
const popupElementLink = popupElement.querySelector('.popup__input_js_link');

const popupImg = popupPhoto.querySelector('.popup__img');
const popupImgName = popupPhoto.querySelector('.popup__figcap');

let activePopup = undefined;

function closePopupByEsc (event) {
    if (event.key === 'Escape') {
        closePopup(activePopup);
    }
}

function closePopupsByOverlay (event) {
    if (event.target === event.currentTarget) {
        closePopup(event.target);
    }
}

function openPopup (obj) {
    if (obj !== null) { //не помешает, и для однотипности.
        obj.classList.add('popup_visible');
        document.addEventListener('keydown', closePopupByEsc);
        activePopup = obj
    }
}

function closePopup (obj) {
    if (obj !== null) { //если не проверить, то пока идет плавное закрытие окна можно понажимать на крестик и словить ошибку
        obj.classList.remove('popup_visible');
        document.removeEventListener('keydown', closePopupByEsc);
    }
}

function openPopupPhoto (item) {
    popupImg.src = item.link;
    popupImg.alt = 'фотография ' + item.name;
    popupImgName.textContent = item.name;
    openPopup(popupPhoto);
}

function handlerSubmitProfileForm (event) {
    event.preventDefault();
    profileUserName.textContent = popupProfileInputName.value;
    profileUserDescription.textContent = popupProfileAbout.value;
    closePopup(popupProfile);
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

function addToDom (dom,newDom) {
    dom.prepend(newDom);
}

function addElement (item, domTarget) {
    const element = createElement (item);
    addToDom(domTarget, element);  
}

function addElements(objData, domTarget) {
    objData.forEach(item => {
        addElement(item, domTarget);
    });
}

addElements(initialCards, elements);


function openPopupEdit () {
    popupProfileInputName.value=profileUserName.textContent;
    popupProfileAbout.value=profileUserDescription.textContent;
    disableSubmitButton (profileBtnSave, validationConstants);
    openPopup(popupProfile);
}

function handlerSubmitElementForm (event) {
    event.preventDefault();
    addElement({name: popupElementInputName.value, link: popupElementLink.value},elements);
    closePopup(popupElement);
    popupElementForm.reset();
}

profileBtnClose.addEventListener('click', () => closePopup(popupProfile)) 
profileBtnEdit.addEventListener('click', openPopupEdit)
popupProfileForm.addEventListener('submit', handlerSubmitProfileForm)
profileBtnAdd.addEventListener('click', () => {openPopup(popupElement); disableSubmitButton (elementBtnSave, validationConstants)})
elementBtnClose.addEventListener('click', () => closePopup(popupElement)) 
popupElementForm.addEventListener('submit', handlerSubmitElementForm)
photoBtnClose.addEventListener('click', () => closePopup(popupPhoto))    


popupProfile.addEventListener('mousedown', closePopupsByOverlay);
popupElement.addEventListener('mousedown', closePopupsByOverlay);
popupPhoto.addEventListener('mousedown', closePopupsByOverlay);