import { Popup } from "./Popup.js";
export class PopupWithImage extends Popup {
    constructor(Selector) {
        super(Selector);
        this._popupImg = this._popup.querySelector('.popup__img'); //пока не пойму почему this а не super, ведь объект объявлен в классе popup
        this._popupImgName = this._popup.querySelector('.popup__figcap'); //или считается что конструктор уже унаследовался хм хм хм 
    }

    open(item) {
        super.open();
        this._popupImg.src = item.link;
        this._popupImg.alt = 'фотография ' + item.name;
        this._popupImgName.textContent = item.name;
    }
}