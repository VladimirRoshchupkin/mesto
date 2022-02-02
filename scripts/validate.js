const validationConstants = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__btn-save',
    inactiveButtonClass: 'popup__btn-save_disabled',
    inputErrorClass: 'popup__input_type_error', 
    errorClass: 'popup__error_visible'
}

function validateInput(form, input, vc) { 
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

function validateForm(form, inputs, input, vc) { 
    validateInput(form, input, vc);
    formValid = inputs.every(validateInputs);
    const submitBtn = form.querySelector(vc.submitButtonSelector);
    toggleButtonState(submitBtn, formValid, vc);
}

function AddEvLiToForm (form, vc) {
    const inputs=getInputsFromForm(form, vc.inputSelector)
    inputs.forEach(input => {
        input.addEventListener('input',() => {validateForm(form, inputs, input, vc)});//исправил, хоть и не было сказано в задании что нельзя валидировать сразу оба поля по изменению любого.
    });
}

function enableValidation (vc) {
    const pforms = Array.from(document.querySelectorAll(vc.formSelector))
    pforms.forEach(form => {
        AddEvLiToForm(form, vc);  
    });
  }

enableValidation(validationConstants); 







