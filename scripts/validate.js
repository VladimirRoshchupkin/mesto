const ValidationConstants = {
    formSelector: '.popup__form',//
    inputSelector: '.popup__input',//
    //submitButtonSelector: '.popup__btn-save',//не использую, легко ищется по типу submit
    //inactiveButtonClass: 'popup__btn-save_disabled',//не использую, заменено на псведокласс
    inputErrorClass: 'popup__input_error', //без _type т.к. модификатора _type_normal или иного нет, можно вообще удалить и перейти на псевдокласс.
    errorClass: 'popup__error_visible'//
}

function validateInput(form, input, errorVisible, inputErrorClass) {
    const valid = input.validity.valid;
    const error_msg = form.querySelector(`.${input.id}_errorJs`);
    if (valid) {
        error_msg.classList.remove(errorVisible);
        error_msg.textContent="";
        input.classList.remove(inputErrorClass);
    } else {
      error_msg.classList.add(errorVisible);
      error_msg.textContent=input.validationMessage;
      input.classList.add(inputErrorClass);
    }
    return valid;
}

function toggleButtonState (button, validity) {
    if (validity) {
      button.removeAttribute("disabled");
    } else {
      button.setAttribute("disabled", "disabled");
    }
}

function validateInputs(input,) {
  return input.validity.valid;
}

function getInputsFromForm (form, inputSelector) {
    return Array.from(form.querySelectorAll(inputSelector));
}

function validateForm(form, inputSelector, errorVisible, inputErrorClass) {
    const inputs=getInputsFromForm(form, inputSelector);
    //Много думал над тем стоит ли при прослушке передавать  TargetInput, чтобы не перебирать весь массив инпутов, и пришел к решению что не стоит
    //т.к. и проект маленький - не помешает это, так и с точки зрения универсальности - если второе поле валидируется основываясь на результатах первого - для таких полей необходимо будет проверить валдацию одновременно.
    //да, можно будет повесить валидацию второго поля по изменению себя и того(тех) от которого оно зависит, но ведь это уже будет не универсально а адаптированно под конкретную задачу.  
    inputs.forEach(input => {
        validateInput(form, input, errorVisible, inputErrorClass)
    });
    formValid = inputs.every(validateInputs);
    const submitBtn = form.querySelector('[type=submit]');
    toggleButtonState(submitBtn, formValid);
}

function AddEvLiToForm (form, inputSelector, errorVisible, inputErrorClass) {
    const inputs=getInputsFromForm(form, inputSelector)
    inputs.forEach(input => {
        input.addEventListener('input',() => {validateForm(form, inputSelector, errorVisible, inputErrorClass)})
    });
}

function enableValidation (vc) {
    const pforms = Array.from(document.querySelectorAll(vc.formSelector))
    pforms.forEach(form => {
        //можно добавлять слушатели при открытии окна, и удалять при закрытии. Будет возможно прирост в быстродействи или не будет???
        //но ведь форма может быть не всплывающая, а постоянно видимая, и тогда для неё придется писать отдельную ветку. так что идем по пути универсальности.
        AddEvLiToForm(form, vc.inputSelector,vc.errorClass, vc.inputErrorClass);
        //Валидация на случай, если при загрузке страницы какие-то формы уже отрисованны. а так же для первой загрузки скрытого окна с значениями по умолчанию. далее проверка будет по изменению.
        validateForm(form, vc.inputSelector, vc.errorClass, vc.inputErrorClass);
    });
  }

enableValidation(ValidationConstants); 

//Ниже две функции содержащие в себе валидацию

function openPopupEdit (vc) {//необходима валидация при открытии формы, т.к. есть вероятность что старая информация не пройдет  валидацию, которая допустим изменилась, а на загрузку данных скриптом слушатель input не срабатывает, хотя написано что должен сработать при любом изменении поля.
    popupProfileInputName.value=profileUserName.textContent;
    popupProfileAbout.value=profileUserDescription.textContent;
    validateForm(popupProfile, vc.inputSelector, vc.errorClass, vc.inputErrorClass);
    switchVisible(popupProfile);
}

//после сброса формы необходима валидация. т.к. функция открытия пустая и сброс делается при закрытии, то и валидация сделана при закрытии.
function handlerSubmitElementForm (event, vc) {
    event.preventDefault();
    addElement({name: popupElementInputName.value, link: popupElementLink.value},elements);
    switchVisible(popupElement);
    popupElementForm.reset()
    validateForm(popupElementForm, vc.inputSelector, vc.errorClass, vc.inputErrorClass);
}





