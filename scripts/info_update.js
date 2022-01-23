//block\form
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

addElements(initialCards)
//Надеюсь в будущем пойму зачем разбивали функцию.
//по сути там и так использовалась строчная функция т.е. без объявления. С объявлением и разбивкой конечно универсальнее, не поспоришь, 
//тут наверно проект маленький, не оценить. 

function addElements(objData) {
    objData.reverse().forEach(item => {
        createElement(item)
    });
}

function createElement (item) {//
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
    domPrepend (elements,element)
}
//И эта из одного действия........
function domPrepend (dom,newDom) {
    dom.prepend(newDom);
}

function openPopupPhoto (item) {
    popupImg.src=item.link;
    popupImg.alt='фотография ' + item.name;
    popupImgName.textContent=item.name
    //Ранее забыл, что мы при открытии блокируем экран, думал что можно подряд перещелкивать фото без закрытия, поэтому не использовал toggle
    //ну и попробовал привязаться к родителю через уже имеющийся в функции объект и класс его родителя,  
    switchVisible(popupImg.closest('.popup_photo_js'))
}

function switchVisible (obj) {
    obj.classList.toggle('popup_invisible')
}

function openPopupEdit () {
    popupProfileInputName.value=profileUserName.textContent
    popupProfileAbout.value=profileUserDescription.textContent
    switchVisible(popupProfile)
}

function submitHandlerProfileForm (event) {
    event.preventDefault();
    profileUserName.textContent=popupProfileInputName.value
    profileUserDescription.textContent=popupProfileAbout.value
    switchVisible(popupProfile)
}

function submitHandlerElementForm (event) {
    event.preventDefault();
    
    addElements([{name: popupElementInputName.value, link: popupElementLink.value}]);
    switchVisible(popupElement);
    popupElementForm.reset()
}

profileBtnClose.addEventListener('click',() => switchVisible(popupProfile))
profileBtnEdit.addEventListener('click',openPopupEdit)
popupProfileForm.addEventListener('submit',submitHandlerProfileForm)

profileBtnAdd.addEventListener('click',() => switchVisible(popupElement))
elementBtnClose.addEventListener('click',() => switchVisible(popupElement))
popupElementForm.addEventListener('submit',submitHandlerElementForm)

PhotoBtnClose.addEventListener('click',() => switchVisible(popupPhoto))

