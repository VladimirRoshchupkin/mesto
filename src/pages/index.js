import './index.css'
import {FormValidator} from '../components/FormValidator.js'
import { Card } from '../components/Card.js';
import {initialCards, validationConstants} from '../utils/constants.js'
import { Section } from '../components/Section.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { UserInfo } from '../components/UserInfo.js'; 
import { Api } from '../components/Api.js'; 

const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-37',
    headers: {
      authorization: '2ac160e3-289e-41a6-a18f-46d80731db29',
      'Content-Type': 'application/json'
    }
  });

  function refreshProfile() {
    api.getProfile().then((res)=> {
        console.log('ответ профиль',res);
        userProfile.setUserInfo({name: res.name, about: res.about})
        userProfile.setUserId(res._id)
    })
  }
  refreshProfile()

  function refreshCards() {
    api.getInitialCards().then((ServerCardList)=> {
        console.log('ответ cards',ServerCardList);
        ServerCardList.forEach(cardData => {
            cardSection.addItem(createCard({name: cardData.name , link: cardData.link, likes: cardData.likes, id: cardData._id, idUser: userProfile.id, idCardOwner: cardData.owner._id}))        
        });
    })
  }
  refreshCards();

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
    console.log('createCard', item.idUser, item.IdCardOwner)
    const newCard = new Card(
        item,
        '.template_element',
        () => {popupWithImages.open(item)},
        (item) => {console.log('try open delete popup', item); confirmPopup.open(); confirmPopup.anyFunction(()=> {console.log('any function body'); api.deleteCard(item).then(refreshCards())})}, //тут всё таки рефрешу все карты, т.к. если удалить локально состояние локальное не будет соответствовать состоянию обновления с сервера.
        () => {console.log('set like handler'); return api.toggleLike({isLiked: newCard._isLiked, id: item.id})}  //.then.newCard.toggleLike()
        ); //хмммм интересный момент, если не взять в {}, то сразу идут открытия окна, при этом функция открытия не работает на слушателе.
    const element = newCard.createElement()
    return element
}

/* const cardSection = new Section ({items: initialCards, renderer: (item)=> {
    cardSection.addItem(createCard(item));
}
},'.elements')
cardSection.renderItems() */
const cardSection = new Section ({items: [], renderer: (item)=> {
    cardSection.addItem(createCard(item));
}
},'.elements')


const addCardPopup = new PopupWithForm('.popup_js_element', {handlerSubmitForm: (item)=> {
    api.addCard({name: item.popup_name, link: item.popup_link})
    .then((res)=>{cardSection.addItem(createCard({name: res.name, link: res.link, likes: res.likes, id: res._id, idUser: userProfile.id, idCardOwner: res.owner._id}));})
    //cardSection.addItem(createCard({name: item['popup_name'], link: item['popup_link']}));
}})
addCardPopup.setEventListeners()

const userProfile = new UserInfo({nameSelector: '.profile__user-name', aboutSelector: '.profile__user-description'});
const editUserPopup = new PopupWithForm('.popup_js_profile', {handlerSubmitForm: (item) => {
    console.log(item)
    api.editProfile({name: item.popup_name, about: item.popup_about}).then((res)=>{userProfile.setUserInfo({name: res.name, about: res.about})})    //then(refreshProfile())-это надёжнее и даже правильнеев нашем случае, но доп запрос на сервер, но можем не увидеть свою карту, если на сервере будут добавлять по 30карточек за время обновления данных с сервера
    //userProfile.setUserInfo({name: item['popup_name'], about: item['popup_about']})
}
}   )
editUserPopup.setEventListeners();

const confirmPopup = new PopupWithForm('.popup_js_delete',{handlerSubmitForm: (item) => { console.log('delete popup', item); confirmPopup.anySavedFunction() }}); //api.deleteCard(item)
confirmPopup.setEventListeners();

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


