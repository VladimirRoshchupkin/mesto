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
        console.log('PWF._gIV');
        console.log(this._inputValues)
    }

/*     setInputValues(data) {
        console.log('SSetIV')
        console.log(Array.from(data))
        console.log(this._inputs)
        this._data=data;
        this._inputs.forEach((input) => {
            this._data.forEach((item) => {
                if (input.name=item.name) {
                    input.value=item.value;
                }
            })
        })
    } */


    setEventListeners() {
        super.setEventListeners()
        console.log(this._inputValues)
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
