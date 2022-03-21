import { Popup } from "./Popup.js";
export class PopupWithForm extends Popup {
    constructor(Selector, {handlerSubmitForm}) {
        super(Selector);
        this._handlerSubmitForm=handlerSubmitForm;
        this._form=this._popup.querySelector('.popup__form');
        this._inputs=this._form.querySelectorAll('.popup__input');
        this._submit=this._form.querySelector('button[type="submit"]');
        this._submitText=this._submit.textContent;
        //this._setEventListeners = this._setEventListeners().bind(this);
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
        this._form.addEventListener('submit', (event) => {
            event.preventDefault();
            this._handlerSubmitForm(this._getInputValues());
            //this.close()
        })
    }

    close() {
        super.close();
        this._form.reset();
    }

    displayWaitingText(isWaiting) {
        isWaiting ? this._submit.textContent='Сохранение...' : this._submit.textContent=this._submitText;
    }
}
