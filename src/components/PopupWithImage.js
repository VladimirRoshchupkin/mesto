import { Popup } from "./Popup.js";
export class PopupWithImage extends Popup {
    constructor(Selector) {
        super(Selector);
        this._popupImg = this._popup.querySelector('.popup__img'); 
        this._popupImgName = this._popup.querySelector('.popup__figcap');  
    }

    open(item) {
        super.open();
        this._popupImg.src = item.link;
        this._popupImg.alt = 'фотография ' + item.name;
        this._popupImgName.textContent = item.name;
    }
}