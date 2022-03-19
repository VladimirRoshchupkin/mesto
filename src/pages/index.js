import './index.css'
import {FormValidator} from '../components/FormValidator.js'
import { Card } from '../components/Card.js';
import {initialCards, validationConstants} from '../utils/constants.js'
import { Section } from '../components/Section.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { UserInfo } from '../components/UserInfo.js';

//block\form.
const popupProfile = document.querySelector('.popup_js_profile');
//btn
const profileBtnEdit = document.querySelector('.profile__btn-edit');
const profileBtnAdd = document.querySelector('.profile__btn-add');
//element
//const profileUserName = document.querySelector('.profile__user-name');
//const profileUserDescription = document.querySelector('.profile__user-description');

const popupProfileInputName = popupProfile.querySelector('.popup__input_js_name');
const popupProfileAbout = popupProfile.querySelector('.popup__input_js_about');

const editForm = document.querySelector('.popup__form_type_edit-js');
const addCardForm  = document.querySelector('.popup__form_type_add-card-js');

const editFormFalidator = new FormValidator (validationConstants, editForm)
const addCardFormFalidator = new FormValidator (validationConstants, addCardForm)

editFormFalidator.enableValidation()
addCardFormFalidator.enableValidation()

const popupWithImages = new PopupWithImage('.popup_js_photo')
popupWithImages.setEventListeners();

function createCard (item) {
    const newCard = new Card(item, '.template_element',() => {popupWithImages.open(item)}); //хмммм интересный момент, если не взять в {}, то сразу идут открытия окна, при этом функция открытия не работает на слушателе.
    const element = newCard.createElement()
    return element
}

const cardSection = new Section ({items: initialCards, renderer: (item)=> {
    cardSection.addItem(createCard(item));
}
},'.elements')
cardSection.renderItems()

const addCardPopup = new PopupWithForm('.popup_js_element', {handlerSubmitForm: (item)=> {
    cardSection.addItem(createCard({name: item['popup_name'], link: item['popup_link']}));
}})
addCardPopup.setEventListeners()

const userProfile = new UserInfo({nameSelector: '.profile__user-name', aboutSelector: '.profile__user-description'});
const editUserPopup = new PopupWithForm('.popup_js_profile', {handlerSubmitForm: (item) => {
    userProfile.setUserInfo({name: item['popup_name'], about: item['popup_about']})
}
}   )
editUserPopup.setEventListeners();

function setPopupUserInfo(data) {
    popupProfileInputName.value=data.name;
    popupProfileAbout.value=data.about;
}

profileBtnEdit.addEventListener('click', ()=> {
    setPopupUserInfo(userProfile.getUserInfo());
    editFormFalidator.checkFormValidity();
    editUserPopup.open();
})

profileBtnAdd.addEventListener('click', () => {
    //popupElementForm.reset();//всё таки при закрытии формы надо её ресетить, иначе можно закрыть с заполненными полями, и при открытии получить неактивную кнопку сабмита 
    addCardPopup.open();//так же исхожу из того, что запретили проверять инпуты на валидность при открытии формы, чтобы не пугать пользователя.
    //addCardFormFalidator.disableSubmitButton();//
    addCardFormFalidator.cleanInputErrors();
})

