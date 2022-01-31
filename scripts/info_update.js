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

function addToDom (dom,newDom) {//,type = 'prepend' удалю/закоментирую, но не считаю что оператор case здесь лишний, это поможет в будущем нарастить конструкцию на выбор из 5-ти вариантов. Вы сами указываете что необходимо удалить у входного массива реверс и если хочется, то добавить append. выходит не зря оператор то прописан, если добавится третий вариант то тернальный оператор не подойдет. а всего возможных аргументов 5.
    //switch (type) {
        //case 'prepend'://остальное допишется\добавится когда будет необходимо
    dom.prepend(newDom);
            //break;
    //}
}

function addElement (item, domTarget) {
    const element = createElement (item);
    addToDom(domTarget, element);  
}

function addElements(objData, domTarget) {
    objData.forEach(item => {//.reverse() удален. т.к. использование append было указано по желанию, то нет, такого желания нет до тех пор пока это не будет указано в задании или чек-листе, использовать его не буду. Считаю что реверс был универсальнее для данного задания, тем более без case во вставке.
        addElement(item, domTarget);
    });
}

addElements(initialCards, elements);


function openPopupEdit () {
    popupProfileInputName.value=profileUserName.textContent;
    popupProfileAbout.value=profileUserDescription.textContent;
    //validateForm(popupProfile, vc.inputSelector, vc.errorClass, vc.inputErrorClass); 
    openPopup(popupProfile);
}

//после сброса формы необходима валидация. т.к. функция открытия пустая и сброс делается при закрытии, то и валидация сделана при закрытии.
function handlerSubmitElementForm (event) {
    event.preventDefault();
    addElement({name: popupElementInputName.value, link: popupElementLink.value},elements);
    closePopup(popupElement);
    popupElementForm.reset()
    //validateForm(popupElementForm, vc.inputSelector, vc.errorClass, vc.inputErrorClass);
}

profileBtnClose.addEventListener('click', () => closePopup(popupProfile)) 
profileBtnEdit.addEventListener('click', openPopupEdit)
popupProfileForm.addEventListener('submit', handlerSubmitProfileForm)
profileBtnAdd.addEventListener('click', () => openPopup(popupElement))
elementBtnClose.addEventListener('click', () => closePopup(popupElement)) 
popupElementForm.addEventListener('submit', handlerSubmitElementForm)
photoBtnClose.addEventListener('click', () => closePopup(popupPhoto))    


popupProfile.addEventListener('mousedown', closePopupsByOverlay);
popupElement.addEventListener('mousedown', closePopupsByOverlay);
popupPhoto.addEventListener('mousedown', closePopupsByOverlay);