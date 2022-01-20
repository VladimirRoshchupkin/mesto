//btn
const popupBtnClose = document.querySelector('.popup__btn-close');
const profileBtnEdit = document.querySelector('.profile__btn-edit');
const popupBtnSave = document.querySelector('.popup__btn-save');
//window
const popup = document.querySelector('.popup');
const popupForm = document.querySelector('.popup__form');
//element
const profileUserName = document.querySelector('.profile__user-name');
const profileUserDescription = document.querySelector('.profile__user-description');
//это конечно сложнее чем вписать два левых модификатора и к ним привязаться, но зато не создано никаких пустышек
//и это может даже быстрее чем ломать голову над именами двух пустых модификаторов, создавать им папки, привязывать, потом в 10-ти местах переименовывать если не угадал с именем.
//getElementsByName() еще заманчиво, но поддержка ниже и даже не везде про него пишут по умолчанию в методах
const popupInputs = document.querySelectorAll('.popup__input');
for (let i=0; i<popupInputs.length; i++) {
    if (popupInputs[i].name==="popup_name") {
        popupInputName=popupInputs[i]
    }
    if (popupInputs[i].name==="popup_about") {
        popupAbout=popupInputs[i]
    }
}

function swithPopupVisible () {
    popup.classList.toggle('popup_invisible')
}
function openPopupEdit () {
    popupInputName.value=profileUserName.textContent
    popupAbout.value=profileUserDescription.textContent
    swithPopupVisible ()
}
function formSubmitHandler (event) {
    event.preventDefault();
    profileUserName.textContent=popupInputName.value
    profileUserDescription.textContent=popupAbout.value
    swithPopupVisible ()
}

popupBtnClose.addEventListener('click',swithPopupVisible)
profileBtnEdit.addEventListener('click',openPopupEdit)
popupForm.addEventListener('submit',formSubmitHandler)
