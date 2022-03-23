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

  //Почему я не использую renderItems в ПР9
  //1. В текущем задание (к ПР9) я нет требований делать вставку карточек полученых с сервера именно через renderItems. Проверял в т.ч. поиском и в задании и в чек-листе..
  //2. метод AddItem внешний, т.е. публичный, т.е. его использование разрешено по умолчанию во внешних (в других) файлах
  //3. Класс Selection должен принимать дом элемент и вставлять его разметку, именно этим он и занимается
  //4. Не использую Section как мусорку (а в ПР9 в отличии от ПР8 в массиве карт куда больше данных, и 98% из них не нужны для отрисовки карточки) для хранения данных карточек, они там не нужны, это не хранилище загруженных карточек, к тому же после любой вставки и удаления массив в Section и фактический будут отличаться. плюсом там и данные по лайкам и по пользователю, зачем эти данные в section?
  //5. Если не делать реверс массива, то карточки вставляются сверху а при обновлении страницы улетают вниз, это неправильно...ну это не аргумент, реверсированный массив можно было и в сектион-мусорку кинуть. повторно добавил функционал, ранее реверс заставили удалить, но без него страничка бесит!!!
  //6. В данном виде обработка массива более гибкая и прозрачная, нежели жесткий перебор в Section, либо будет необходимо готовить отдельный массив и несколько раз перебирать вначале первый потом результирующий.
  //7. Работать со слабой связью я умею, в остальных местах где она нужна везде сделана, в одном месте даже не через конструктор а через функцию, что на мой взгляд более универсально, т.к. конструктор мы обычно не меняем, а если меняем, то другой разработчик может не заметить этого и расчитывать на статический метод в рамках всего кода.
  //8. Не хочу юзать renderItems в ущерб коду, поэтому если без него прям совсем совсем никак, прошу обосновать почему я не могу напрямую использовать addItem если это не запрещено, а более того это разрешено раз метод публичный по заданию, в рамках добавления отдельной карточки все юзаем addItem напрямую, хотя там тоже можно отрисовать через renderItems обновив _items для новой карточки (в данной работе мы не обрабатываем позже стартовый массив карточек, т.е. перезатирать его не запрещено, и ссылок на запрет нет).
  function refreshCards() {
    return api.getInitialCards().then((serverCardList)=> {
        serverCardList.reverse().forEach(cardData => {
            cardSection.addItem(createCard({
                name: cardData.name, 
                link: cardData.link, 
                likes: cardData.likes, 
                id: cardData._id, 
                idUser: userProfile.id, 
                idCardOwner: cardData.owner._id
            }))        
        });
    })
    .catch((error)=> {console.log(error)})
  }

  function refreshProfile() {
    return api.getProfile().then((res)=> {
        //отдельно - универсальнее, чтобы где требуется обновить только ту часть, которая обновилась
        userProfile.setUserInfo({name: res.name, about: res.about});
        userProfile.setUserId(res._id);
        userProfile.setUserAvatar({avatar: res.avatar});
    })
    .catch((error)=> {console.log(error)})
  }
  //refreshProfile().then(()=> {refreshCards();})//карточки загружаются после получения id пользователя
  Promise.all([refreshProfile(),refreshCards()])
   

const editFormValidator = new FormValidator (validationConstants, editForm)
const addCardFormValidator = new FormValidator (validationConstants, addCardForm)
const avatarUpdateFormValidator = new FormValidator (validationConstants, avatarUpdateForm)

editFormValidator.enableValidation()
addCardFormValidator.enableValidation()
avatarUpdateFormValidator.enableValidation()

const popupWithImages = new PopupWithImage('.popup_js_photo')
popupWithImages.setEventListeners();

function createCard (item) {
    const newCard = new Card(
        item,
        '.template_element',
        () => {popupWithImages.open(item)},

        (item) => { 
            confirmPopup.open(); 
            confirmPopup.anyFunction(()=> {
                confirmPopup.displayWaitingText(true);
                api.deleteCard(item)
                .then(() => {newCard.deleteCard()})
                .then(()=>{confirmPopup.close()})
                .catch((error)=> {console.log(error)})
                .finally(()=> {
                    confirmPopup.displayWaitingText(false);
                })
            })
        }, 
        () => { 
            return api.toggleLike({isLiked: newCard._isLiked, id: item.id})
            .catch((error)=> {console.log(error)})
        }  
    ); 
    const element = newCard.createElement()
    return element
}

/* const cardSection = new Section ({items: initialCards, renderer: (item)=> { //да, после ответа от сервера с массивом карт, можно было создать класс Section и просто передать массив карт которые вернул сервер и ни с кем не спорить, но считаю это плохим способом хоть и более легким, чем отстаивать свою точку зрения.
    cardSection.addItem(createCard(item));
}
},'.elements')
cardSection.renderItems() */
const cardSection = new Section ({
    items: [], renderer: (item)=> {
        cardSection.addItem(createCard(item));
    }
},'.elements')


const addCardPopup = new PopupWithForm('.popup_js_element', {handlerSubmitForm: (item)=> {
    addCardPopup.displayWaitingText(true);
    api.addCard({name: item.popup_name, link: item.popup_link})
    .then((res)=>{
        cardSection.addItem(createCard({
            name: res.name, link: 
            res.link, likes: 
            res.likes, 
            id: res._id, 
            idUser: userProfile.id, 
            idCardOwner: res.owner._id}));})
    .then(()=>{addCardPopup.close()})
    .catch((error)=> {console.log(error)})
    .finally(()=> {addCardPopup.displayWaitingText(false);})
}})
addCardPopup.setEventListeners()

const userProfile = new UserInfo({
    nameSelector: '.profile__user-name', 
    aboutSelector: '.profile__user-description',
    photoSelector: '.profile__avatar'
    });
const editUserPopup = new PopupWithForm('.popup_js_profile', {handlerSubmitForm: (item) => {
    editUserPopup.displayWaitingText(true);
    api.editProfile({name: item.popup_name, about: item.popup_about})
    .then((res)=>{userProfile.setUserInfo({name: res.name, about: res.about})})
    .then(()=>{editUserPopup.close()})
    .catch((error)=> {console.log(error)})   
    .finally(()=> {editUserPopup.displayWaitingText(false);}) 
    }
})
editUserPopup.setEventListeners();

const confirmPopup = new PopupWithForm('.popup_js_delete',{handlerSubmitForm: (item) => {
    confirmPopup.displayWaitingText(true); 
    confirmPopup.anySavedFunction()}
}); 
confirmPopup.setEventListeners();

const editAvatarPopup = new PopupWithForm('.popup_js_avatar-update',{handlerSubmitForm: (item) => {
    editAvatarPopup.displayWaitingText(true); 
    api.editAvatar({avatar: item['popup_link-update']})
    .then((res)=>{userProfile.setUserAvatar({avatar: res.avatar})})
    .then(()=>{editAvatarPopup.close()})
    .catch((error)=> {console.log(error)})
    .finally(()=> {editAvatarPopup.displayWaitingText(false);})
}}); 
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
    avatarUpdateFormValidator.cleanInputErrors();
    editAvatarPopup.open();
})

profileBtnAdd.addEventListener('click', () => { 
    addCardPopup.open();
    addCardFormValidator.cleanInputErrors();
})


