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
const popupInputName = document.querySelector('.popup__input-name');
const popupAbout = document.querySelector('.popup__about');

function swithPopupVisible (event) {
    popup.classList.toggle('visible')
}
function openPopupEdit (event) {
    popupInputName.value=profileUserName.textContent
    popupAbout.value=profileUserDescription.textContent
    popup.classList.toggle('visible')
}
function formSubmitHandler (event) {
    event.preventDefault();
    profileUserName.textContent=popupInputName.value
    profileUserDescription.textContent=popupAbout.value
    popup.classList.toggle('visible')
}
/*function check_key (event) { Если убрать, то не срабатывает Enter пока не перейдешь в форму. 
    В задании уточнений не было как правильно. Первоначально добивался закрытия в любой ситуации
    if (event.key==='Enter') {
        if (!popup.classList.contains('visible')) {
            formSubmitHandler(event);
        }  
    }
}*/

popupBtnClose.addEventListener('mousedown',swithPopupVisible)
profileBtnEdit.addEventListener('mousedown',openPopupEdit)
popupForm.addEventListener('submit',formSubmitHandler)
//document.addEventListener('keypress',check_key)