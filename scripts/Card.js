import { openPopup,popupPhoto } from "./utils.js";
export class Card {
    constructor(item, cardTemplateSelector) {
        this._item=item;
        this._templElement = document.querySelector(cardTemplateSelector).content;//'.template_element'
        this._popupImg = popupPhoto.querySelector('.popup__img');
        this._popupImgName = popupPhoto.querySelector('.popup__figcap');
    }

    _openPopupPhoto () {
        this._popupImg.src = this._item.link;
        this._popupImg.alt = 'фотография ' + this._item.name;
        this._popupImgName.textContent = this._item.name;
        openPopup(popupPhoto);
    }

    _setEvtList() {
        this._elementImg.addEventListener('click',() => this._openPopupPhoto(this._item));
        this._elementHeart.addEventListener('click',() => this._elementHeart.classList.toggle('element__btn-heart_active'));
        this._elementDelete.addEventListener('click',() => this._elementDelete.parentElement.remove());
    }

    createElement() {
        const element = this._templElement.cloneNode(true);
        this._elementImg = element.querySelector('.element__img');
        const elementTitle = element.querySelector('.element__title');
        this._elementHeart = element.querySelector('.element__btn-heart');
        this._elementDelete = element.querySelector('.element__btn-delete');
        this._elementImg.src = this._item.link;
        this._elementImg.alt = 'фотография ' + this._item.name;
        elementTitle.textContent=this._item.name;
        this._setEvtList();
        return element;
    }
}