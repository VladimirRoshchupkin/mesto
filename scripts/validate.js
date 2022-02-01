const validationConstants = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__btn-save',
    inactiveButtonClass: 'popup__btn-save_disabled',//не использую, заменено на псведокласс
    inputErrorClass: 'popup__input_type_error', //popup__input_error   без _type т.к. модификатора _type_normal или иного нет, можно вообще удалить и перейти на псевдокласс.
    errorClass: 'popup__error_visible'//
}

function validateInput(form, input, vc) { //errorVisible, inputErrorClass
    const valid = input.validity.valid;
    const error_msg = form.querySelector(`.popup__error_js_${input.id}`);
    if (valid) {
        error_msg.classList.remove(vc.errorClass);
        error_msg.textContent="";
        input.classList.remove(vc.inputErrorClass);
    } else {
      error_msg.classList.add(vc.errorClass);
      error_msg.textContent=input.validationMessage;
      input.classList.add(vc.inputErrorClass);
    }
    return valid;
}

function disableSubmitButton (button, vc) {
    button.setAttribute("disabled", "disabled");
    button.classList.add(vc.inactiveButtonClass);
}

function enableSubmitButton (button, vc) {
    button.removeAttribute("disabled");
    button.classList.remove(vc.inactiveButtonClass);
}

function toggleButtonState (button, validity, vc) {
    validity ? enableSubmitButton (button, vc) : disableSubmitButton (button, vc);
}

function validateInputs(input) {
  return input.validity.valid;
}

function getInputsFromForm (form, inputSelector) {
    return Array.from(form.querySelectorAll(inputSelector));
}

function validateForm(form, vc) { //inputSelector, errorVisible, inputErrorClass
    const inputs=getInputsFromForm(form, vc.inputSelector);
    inputs.forEach(input => {
        validateInput(form, input, vc) //errorVisible, inputErrorClass
    });
    formValid = inputs.every(validateInputs);
    const submitBtn = form.querySelector(vc.submitButtonSelector);
    toggleButtonState(submitBtn, formValid, vc);
}

function AddEvLiToForm (form, vc) {//inputSelector, errorVisible, inputErrorClass
    const inputs=getInputsFromForm(form, vc.inputSelector)
    inputs.forEach(input => {
        input.addEventListener('input',() => {validateForm(form, vc)}) //inputSelector, errorVisible, inputErrorClass
    });
}

function enableValidation (vc) {
    const pforms = Array.from(document.querySelectorAll(vc.formSelector))
    pforms.forEach(form => {
        AddEvLiToForm(form, vc);  //vc.inputSelector, vc.errorClass, vc.inputErrorClass
        //Валидация на случай, если при загрузке страницы какие-то формы уже отрисованны. а так же для первой загрузки скрытого окна с значениями по умолчанию. далее проверка будет по изменению.
        //validateForm(form, vc.inputSelector, vc.errorClass, vc.inputErrorClass); удаляем, раз не валидируем до тех пор пока пользователь не начнет вводить данные.
    });
  }

enableValidation(validationConstants); 







