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
//"Это не очень надежная история. Порядок полей может поменяться, и тогда функция не будет работать как должна."
//Не согласен, порядок полей значения не имеет как и их количество, т.к. устроен перебор всех class='.popup__input' а в них уже поиск по атрибуту "name"
//Присвоение идет через [i] по перебору, жесткого указания номера полей не использовал.
//Но исправлю
//"искать можно по селектору атрибута name" - тогда напрямую по нему, чтобы не писать лишнего. Показалось как будто ID не по феншую яндекса, не буду его умышленно вводить, а по имени ранее не использовал как писал из за неподдежки или не полной поддержки в edge/ie.
/*const popupInputs = document.querySelectorAll('.popup__input');
for (let i=0; i<popupInputs.length; i++) {
    if (popupInputs[i].name==="popup_name") {
        popupInputName=popupInputs[i]
    }
    if (popupInputs[i].name==="popup_about") {
        popupAbout=popupInputs[i]
    }
}*/
const popupInputName = document.getElementById('popup_name');
const popupAbout = document.getElementById('popup_about');
console.log(popupInputName)

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
