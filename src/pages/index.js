import './index.css'
import {FormValidator} from '../components/FormValidator.js'
import { Card } from '../components/Card.js';
import {initialCards, validationConstants} from '../utils/constants.js'
import { Section } from '../components/Section.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { UserInfo } from '../components/UserInfo.js'; 
import { Api } from '../components/Api.js'; 

//block\form.
const popupProfile = document.querySelector('.popup_js_profile');
//btn
const profileBtnEdit = document.querySelector('.profile__btn-edit');
const profileBtnAdd = document.querySelector('.profile__btn-add');
const profileImgEdit = document.querySelector('.profile__avatar-cont');
//element
const popupProfileInputName = popupProfile.querySelector('.popup__input_js_name');
const popupProfileAbout = popupProfile.querySelector('.popup__input_js_about');

const editForm = document.querySelector('.popup__form_type_edit-js');
const addCardForm  = document.querySelector('.popup__form_type_add-card-js');
const avatarUpdateForm  = document.querySelector('.popup__form_type_avatar-update-js');

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
        console.log(res.avatar)
        userProfile.setUserAvatar({avatar: res.avatar})
    })
  }
  refreshProfile()

  //Почему я не использую renderItems
  //1. В текущем задание (к ПР9) я не видел требований делать вставку карточек полученых с сервера именно через renderItems, если не пропустил ничего. Проверял в т.ч. поиском и в задании и в чек-листе..
  //2. метод AddItem внешний, т.е. публичный, т.е. его использование разрешено по умолчанию во внешних файлах
  //3. Класс Selection должен принимать дом элемент и вставлять его разметку, именно этим он и занимается
  //4. Не использую Section как мусорку (а в ПР9 в отличии от ПР8 в массиве карт куда больше данных, и 98% из них не нужны для отрисовки карточки) для хранения данных карточек, они там не нужны, это не хранилище загруженных карточек, к тому же после любой вставки и удаления массив в Section и фактический будут отличаться. плюсом там и данные по лайкам и по пользователю, зачем эти данные в section?
  //5. Если не делать реверс массива, то карточки вставляются сверху а при обновлении страницы улетают вниз, это неправильно...ну это не аргумент, реверсированный массив можно было и в сектион-мусорку кинуть. повторно добавил функционал, ранее реверс заставили удалить, но без него страничка бесит!!!
  //6. В данном виде обработка массива более гибкая и прозрачная, нежели жесткий перебор в Section, либо будет необходимо готовить отдельный массив и несколько раз перебирать вначале первый потом результирующий.
  //7. Не хочу юзать renderItems, поэтому если без него прям совсем совсем никак, прошу обосновать почему я не могу напрямую использовать addItem если это не запрещено, а более того это разрешено раз метод публичный по заданию, в рамках добавления отдельной карточки все юзаем addItem напрямую, хотя там тоже можно отрисовать через renderItems обновив _items для новой карточки (в данной работе мы не обрабатываем позже стартовый массив карточек, т.е. перезатирать его не запрещено, и ссылок на запрет нет).
  //8. Работать с легкой связью я умею, в остальных местах где она нужна везде сделана, в одном месте даже не через конструктор а через функцию, что на мой взгляд более универсально, т.к. конструктор мы обычно не меняем, а если меняем, то другой разработчик может не заметить этого и расчитывать на статический метод в рамках всего кода.
  function refreshCards() {
    api.getInitialCards().then((ServerCardList)=> {
        console.log('ответ cards',ServerCardList);
        ServerCardList.reverse().forEach(cardData => {
            cardSection.addItem(createCard({name: cardData.name , link: cardData.link, likes: cardData.likes, id: cardData._id, idUser: userProfile.id, idCardOwner: cardData.owner._id}))        
        });
    })
  }
  refreshCards(); //хотел рефрешить после вставки все карточки разом, но мы же не не переопределяем весь массив карт, и карточки не удалялись((, бегать по массиву текущих карт и удалять те которых нет в ответе списка от сервера - в задании нет и лень, может как-то это можно обновлять через функции, но пока не знаю как, а делать полный рефреш страницы это моргания.



const editFormValidator = new FormValidator (validationConstants, editForm)
const addCardFormValidator = new FormValidator (validationConstants, addCardForm)
const avatarUpdateFormValidator = new FormValidator (validationConstants, avatarUpdateForm)

editFormValidator.enableValidation()
addCardFormValidator.enableValidation()
avatarUpdateFormValidator.enableValidation()

const popupWithImages = new PopupWithImage('.popup_js_photo')
popupWithImages.setEventListeners();

function createCard (item) {
    console.log('createCard', item.idUser, item.IdCardOwner)
    const newCard = new Card(
        item,
        '.template_element',
        () => {popupWithImages.open(item)},

        (item) => {
            console.log('try open delete popup', item); 
            confirmPopup.open(); 
            confirmPopup.anyFunction(()=> {console.log('any function body');
            confirmPopup.displayWaitingText(true);
            api.deleteCard(item)
            .then(() => {newCard.deleteCard()})
            .then(()=>{confirmPopup.close()})
            .finally(()=> {confirmPopup.displayWaitingText(false);})
        })

        }, 
            //refreshCards()тут всё таки рефрешу все карты, т.к. если удалить локально состояние локальное не будет соответствовать состоянию обновления с сервера.
        () => {
            console.log('set like handler'); 
            return api.toggleLike({isLiked: newCard._isLiked, id: item.id})
        }  //.then.newCard.toggleLike()
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
    addCardPopup.displayWaitingText(true);
    api.addCard({name: item.popup_name, link: item.popup_link})
    .then((res)=>{cardSection.addItem(createCard({name: res.name, link: res.link, likes: res.likes, id: res._id, idUser: userProfile.id, idCardOwner: res.owner._id}));})
    .then(()=>{addCardPopup.close()})
    .finally(()=> {addCardPopup.displayWaitingText(false);})
    //cardSection.addItem(createCard({name: item['popup_name'], link: item['popup_link']}));
}})
addCardPopup.setEventListeners()

const userProfile = new UserInfo({
    nameSelector: '.profile__user-name', 
    aboutSelector: '.profile__user-description',
    photoSelector: '.profile__avatar'
    });
const editUserPopup = new PopupWithForm('.popup_js_profile', {handlerSubmitForm: (item) => {
    console.log(item)
    editUserPopup.displayWaitingText(true);
    api.editProfile({name: item.popup_name, about: item.popup_about})
    .then((res)=>{userProfile.setUserInfo({name: res.name, about: res.about})})
    .then(()=>{editUserPopup.close()})    //then(refreshProfile())-это надёжнее и даже правильнеев нашем случае, но доп запрос на сервер, но можем не увидеть свою карту, если на сервере будут добавлять по 30карточек за время обновления данных с сервера
    .finally(()=> {editUserPopup.displayWaitingText(false);}) //userProfile.setUserInfo({name: item['popup_name'], about: item['popup_about']})
}
}   )
editUserPopup.setEventListeners();

const confirmPopup = new PopupWithForm('.popup_js_delete',{handlerSubmitForm: (item) => {
    confirmPopup.displayWaitingText(true);
    console.log('delete popup', item); 
    confirmPopup.anySavedFunction() }}); //api.deleteCard(item)
confirmPopup.setEventListeners();

const editAvatarPopup = new PopupWithForm('.popup_js_avatar-update',{handlerSubmitForm: (item) => {
    editAvatarPopup.displayWaitingText(true);
    console.log('update-avatar popup', item); 
    api.editAvatar({avatar: item['popup_link-update']})
    .then((res)=>{userProfile.setUserAvatar({avatar: res.avatar})})
    .then(()=>{editAvatarPopup.close()})
    .finally(()=> {editAvatarPopup.displayWaitingText(false);})
}}); //api.deleteCard(item)
editAvatarPopup.setEventListeners();

function setPopupUserInfo(data) {
    popupProfileInputName.value=data.name;
    popupProfileAbout.value=data.about;
}

profileBtnEdit.addEventListener('click', ()=> {
    setPopupUserInfo(userProfile.getUserInfo());
    editFormValidator.checkFormValidity();
    editUserPopup.open();
})

profileImgEdit.addEventListener('click', ()=> {
    //setPopupUserInfo(userProfile.getUserInfo());
    //avatarUpdateFormValidator.checkFormValidity();////////////
    avatarUpdateFormValidator.cleanInputErrors();
    editAvatarPopup.open();
})

profileBtnAdd.addEventListener('click', () => {
    //popupElementForm.reset();//всё таки при закрытии формы надо её ресетить, иначе можно закрыть с заполненными полями, и при открытии получить неактивную кнопку сабмита 
    addCardPopup.open();//так же исхожу из того, что запретили проверять инпуты на валидность при открытии формы, чтобы не пугать пользователя.
    //addCardFormValidator.disableSubmitButton();//
    addCardFormValidator.cleanInputErrors();
})


