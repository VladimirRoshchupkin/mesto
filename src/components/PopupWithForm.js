import { Popup } from "./Popup.js";
export class PopupWithForm extends Popup {
    constructor(Selector, {handlerSubmitForm}) {
        super(Selector);
        this._handlerSubmitForm=handlerSubmitForm;
        this._form=this._popup.querySelector('.popup__form')
        this._inputs=this._form.querySelectorAll('.popup__input');
    }

    _getInputValues() {
        this._inputValues = {};
        this._inputs.forEach((input) => {
            this._inputValues[input.name]=input.value;
        })
        return this._inputValues;
    }

    setEventListeners() {
        super.setEventListeners()
        this._form.addEventListener('submit', () => {
            this._handlerSubmitForm(this._getInputValues());
            this.close()
        })
    }

    close() {
        super.close();
        this._form.reset();
    }
}
