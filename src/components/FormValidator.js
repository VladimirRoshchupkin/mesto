export class FormValidator {
    constructor (settings, form) {
        this._form = form;
        this._formSelector = settings.formSelector
        this._inputSelector = settings.inputSelector
        this._submitButtonSelector = settings.submitButtonSelector
        this._inactiveButtonClass = settings.inactiveButtonClass
        this._inputErrorClass = settings.inputErrorClass
        this._errorClass = settings.errorClass
    }

    _setInputError(error_msg, input) {
        error_msg.classList.add(this._errorClass);
        error_msg.textContent=input.validationMessage;
        input.classList.add(this._inputErrorClass);
    }

    _resetInputError(error_msg, input) {
        error_msg.classList.remove(this._errorClass);
        error_msg.textContent="";
        input.classList.remove(this._inputErrorClass);
    }

    _validateInput(input) { 
        const valid = input.validity.valid;
        const error_msg = this._form.querySelector(`.popup__error_js_${input.id}`);
        if (valid) {
            this._resetInputError(error_msg, input)
        } else {
            this._setInputError(error_msg, input)
        }
        return valid;
    }

    _cleanInputError(input) { 
        const error_msg = this._form.querySelector(`.popup__error_js_${input.id}`);
        this._resetInputError(error_msg, input)
    }

    disableSubmitButton () {
        this._submitBtn.setAttribute("disabled", "disabled");
        this._submitBtn.classList.add(this._inactiveButtonClass);
    }
    
    _enableSubmitButton (button, vc) {
        this._submitBtn.removeAttribute("disabled");
        this._submitBtn.classList.remove(this._inactiveButtonClass);
    }

    _toggleButtonState () {
        this._formValid ? this._enableSubmitButton () : this.disableSubmitButton ();
    }
    
    _validateInputs(input) {
        return input.validity.valid;
    }

    _getInputsFromForm () {
        return Array.from(this._form.querySelectorAll(this._inputSelector));
    }
    
    _validateForm(input) { 
        this._validateInput(input);
        this._formValid = this._inputs.every(this._validateInputs);
        this._toggleButtonState();
    }

    checkFormValidity() {
        this._inputs.forEach(input => {
            this._validateForm(input);
        });
    }

    cleanInputErrors() {//как нехотелось создавать, т.к. добавлены 4 новые функции, одна переделана, но жаль было терять этот функционал, в ПР7 он работал, вроде проверял тогда хоть и немного с другой логикой.
        this._inputs.forEach(input => {
            this._cleanInputError(input);
        });
        this.disableSubmitButton();
    }

    _addEventListenersToForm () {
        this._inputs=this._getInputsFromForm()   
        this._inputs.forEach(input => {
            this._submitBtn = this._form.querySelector(this._submitButtonSelector);
            input.addEventListener('input',() => {this._validateForm(input)});
        });
    }

    enableValidation () {
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();//не из вредности, а из лени оставлю пока здесь. ранее специально перенёс сюда, т.к. увидел это в разборе задания.
        });
        this._addEventListenersToForm();
    }


}
