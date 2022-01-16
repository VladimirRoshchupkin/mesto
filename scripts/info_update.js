//btn
const popup__btn_close = document.querySelector('.popup__btn-close');
const profile__btn_edit = document.querySelector('.profile__btn-edit');
const popup__btn_save = document.querySelector('.popup__btn-save');
//window
const popup = document.querySelector('.popup');
const popup__form = document.querySelector('.popup__form');
//const popup__form = document.querySelector('.popup__form');
//element
const profile__user_name = document.querySelector('.profile__user-name');
const profile__user_description = document.querySelector('.profile__user-description');
const popup__input_name = document.querySelector('.popup__input-name');
const popup__about = document.querySelector('.popup__about');

function swith_popup_visible (event) {
    popup.classList.toggle('visible')
}
function open_popup_edit (event) {
    popup__input_name.value=profile__user_name.textContent
    popup__about.value=profile__user_description.textContent
    popup.classList.toggle('visible')
}
//function save_popup_changes (event) {
//    profile__user_name.textContent=popup__input_name.value
//    profile__user_description.textContent=popup__about.value
//    popup.classList.toggle('visible')
//}
function formSubmitHandler (event) {
    event.preventDefault();
    profile__user_name.textContent=popup__input_name.value
    profile__user_description.textContent=popup__about.value
    popup.classList.toggle('visible')
}
function check_key (event) {
    if (event.key==='Enter') {
        if (!popup.classList.contains('visible')) {
            formSubmitHandler(event);
        }  
    }
}






popup__btn_close.addEventListener('mousedown',swith_popup_visible)
profile__btn_edit.addEventListener('mousedown',open_popup_edit)
//popup__btn_save.addEventListener('mousedown',save_popup_changes)
popup__form.addEventListener('submit',formSubmitHandler)
document.addEventListener('keypress',check_key)