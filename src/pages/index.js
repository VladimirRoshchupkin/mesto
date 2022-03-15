import './index.css'
import {FormValidator} from '../components/FormValidator.js'
//import { openPopup,popupPhoto } from "./utils.js";
import { Card } from '../components/Card.js';
import {initialCards, validationConstants} from '../components/initialData.js'
import { Section } from '../components/Section.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { UserInfo } from '../components/UserInfo.js';

//const PopupWithForm = new PopupWithForm(,)

//block\form
const popupProfile = document.querySelector('.popup_js_profile');
//const popupElement = document.querySelector('.popup_js_element');
//const popupProfileForm = popupProfile.querySelector('.popup__form');
//const popupElementForm = popupElement.querySelector('.popup__form');
//const elements = document.querySelector('.elements');//need delete after
//btn
const profileBtnEdit = document.querySelector('.profile__btn-edit');
const profileBtnAdd = document.querySelector('.profile__btn-add');

//const profileBtnClose = popupProfile.querySelector('.popup__btn-close');
//const elementBtnClose = popupElement.querySelector('.popup__btn-close');
//const photoBtnClose = popupPhoto.querySelector('.popup__btn-close');
//const profileBtnSave = popupProfile.querySelector('.popup__btn-save');//уже используется
//const elementBtnSave = popupElement.querySelector('.popup__btn-save');//уже используется
//element
const profileUserName = document.querySelector('.profile__user-name');
const profileUserDescription = document.querySelector('.profile__user-description');

const popupProfileInputName = popupProfile.querySelector('.popup__input_js_name');
const popupProfileAbout = popupProfile.querySelector('.popup__input_js_about');
//const popupElementInputName = popupElement.querySelector('.popup__input_js_name');
//const popupElementLink = popupElement.querySelector('.popup__input_js_link');



const editForm = document.querySelector('.popup__form_type_edit-js');
const addCardForm  = document.querySelector('.popup__form_type_add-card-js');

const editFormFalidator = new FormValidator (validationConstants, editForm)
const addCardFormFalidator = new FormValidator (validationConstants, addCardForm)

editFormFalidator.enableValidation()
addCardFormFalidator.enableValidation()


/*  export function closePopupByEsc (event) {
    if (event.key === 'Escape') {
        closePopup(document.querySelector('.popup_visible')); 
    }
} */
/*
function closePopupsByOverlay (event) {
    if (event.target === event.currentTarget) {
        closePopup(event.target);
    }
}

function closePopup (obj) {
    obj.classList.remove('popup_visible');
    document.removeEventListener('keydown', closePopupByEsc);
}
 */

function handlerSubmitProfileForm () {
    profileUserName.textContent = popupProfileInputName.value;
    profileUserDescription.textContent = popupProfileAbout.value;
    closePopup(popupProfile);
}

/* function addToDom (dom,newDom) {
    dom.prepend(newDom);
} */

const PopupWithImages = new PopupWithImage('.popup_js_photo')
PopupWithImages.setEventListeners();

function createCard (item) {
    const NewCard = new Card(item, '.template_element',() => {PopupWithImages.open(item)}); //хмммм интересный момент, если не взять в {}, то сразу идут открытия окна, при этом функция открытия не работает на слушателе.
    const element = NewCard.createElement()
    return element
}

const cardSection = new Section ({items: initialCards, renderer: (item)=> {
    cardSection.addItem(createCard(item));
}
},'.elements')
cardSection.renderItems()

const addCardPopup = new PopupWithForm('.popup_js_element', {handlerSubmitForm: (item)=> {
    console.log(item)
    cardSection.addItem(createCard({name: item['popup_name'], link: item['popup_link']}));
}})
addCardPopup.setEventListeners()

const userProfile = new UserInfo({nameSelector: '.profile__user-name', aboutSelector: '.profile__user-description'});
const editUserPopup = new PopupWithForm('.popup_js_profile', {handlerSubmitForm: (item) => {
    userProfile.setUserInfo({name: item['popup_name'], about: item['popup_about']})
}
}   )
editUserPopup.setEventListeners();
// 

//cardSection.renderItems()
//Section
/*  function addElement (item, domTarget) {
    const element = createCard (item)
    addToDom(domTarget, element);  
} 

function addElements(objData, domTarget) {
    objData.forEach(item => {
        addElement(item, domTarget);
    });
}

addElements(initialCards, elements); */


/* function openPopupEdit () {
    popupProfileInputName.value=profileUserName.textContent;
    popupProfileAbout.value=profileUserDescription.textContent;
    editFormFalidator.checkFormValidity(); 
    openPopup(popupProfile);
}
 */
/* function handlerSubmitElementForm () {
    addElement({name: popupElementInputName.value, link: popupElementLink.value},elements);
    closePopup(popupElement);
    popupElementForm.reset();
    addCardFormFalidator.disableSubmitButton();
} */

//profileBtnClose.addEventListener('click', () => closePopup(popupProfile)) 
//profileBtnEdit.addEventListener('click', openPopupEdit)
function SetPopupUserInfo(Data) {
    popupProfileInputName.value=Data.name;
    popupProfileAbout.value=Data.about;
}

profileBtnEdit.addEventListener('click', ()=> {
    SetPopupUserInfo(userProfile.getUserInfo())
    editFormFalidator.checkFormValidity()
    editUserPopup.open();
    console.log('profilrBtnEdit');
    //popupProfileInputName.value='123'
    //console.log(userProfile.getUserInfo())
    //editUserPopup.setInputValues(userProfile.getUserInfo())
})

profileBtnAdd.addEventListener('click', () => {
    //popupElementForm.reset();//всё таки при закрытии формы надо её ресетить, иначе можно закрыть с заполненными полями, и при открытии получить неактивную кнопку сабмита 
    addCardPopup.open();//так же исхожу из того, что запретили проверять инпуты на валидность при открытии формы, чтобы не пугать пользователя.
    addCardFormFalidator.disableSubmitButton();
})

//popupProfileForm.addEventListener('submit', handlerSubmitProfileForm)
//profileBtnAdd.addEventListener('click', () => {
//    popupElementForm.reset();//всё таки при закрытии формы надо её ресетить, иначе можно закрыть с заполненными полями, и при открытии получить неактивную кнопку сабмита 
//    openPopup(popupElement);//так же исхожу из того, что запретили проверять инпуты на валидность при открытии формы, чтобы не пугать пользователя.
//    addCardFormFalidator.disableSubmitButton();
//})
//elementBtnClose.addEventListener('click', () => closePopup(popupElement)) 
//popupElementForm.addEventListener('submit', handlerSubmitElementForm)
//photoBtnClose.addEventListener('click', () => closePopup(popupPhoto))    


//popupProfile.addEventListener('mousedown', closePopupsByOverlay);
//popupElement.addEventListener('mousedown', closePopupsByOverlay);
//popupPhoto.addEventListener('mousedown', closePopupsByOverlay);

