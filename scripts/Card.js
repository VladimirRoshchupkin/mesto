import { openPopup,popupPhoto } from "./utils.js";
export class Card {
    constructor(item, cardTemplateSelector) {
        this._item=item;
        this._cardTemplateSelector=cardTemplateSelector;
        //this._templElement = document.querySelector(cardTemplateSelector).content;//перенес. а данный вид был показан в разборе задания.
        this._popupImg = popupPhoto.querySelector('.popup__img');
        this._popupImgName = popupPhoto.querySelector('.popup__figcap');
    }

    _copyTemplateElement() {
        this._templElement = document.querySelector(this._cardTemplateSelector).content 
        //хотя можно без создания отдельной функции/ можно вернть через return или через this, 
        //не совсем понял как именно требуется, но если уже используется this и всё происходит внутри класса, то ограничиваюсь им.
    }

    _openPopupPhoto () {
        this._popupImg.src = this._item.link;
        this._popupImg.alt = 'фотография ' + this._item.name;
        this._popupImgName.textContent = this._item.name;
        openPopup(popupPhoto);
    }

    //ок. для каждого слушателя отдельный метод.
    _setEventListenerImg() {
        this._elementImg.addEventListener('click',() => this._openPopupPhoto(this._item));
    }

    _setEventListenerLike() {
        this._elementHeart.addEventListener('click',() => this._elementHeart.classList.toggle('element__btn-heart_active'));
    }

    _setEventListenerDelete() {
        this._elementDelete.addEventListener('click',() => this._element.remove());
    }

    _setEventListeners() {
        this._setEventListenerImg()
        this._setEventListenerLike()
        this._setEventListenerDelete()
    }

    createElement() {
        this._copyTemplateElement()
        this._element = this._templElement.querySelector('.element').cloneNode(true);
        this._elementImg = this._element.querySelector('.element__img');
        this._elementTitle = this._element.querySelector('.element__title');//за компанию для отнотипности пусть будет в this
        this._elementHeart = this._element.querySelector('.element__btn-heart');
        this._elementDelete = this._element.querySelector('.element__btn-delete');
        this._elementImg.src = this._item.link;
        this._elementImg.alt = 'фотография ' + this._item.name;
        this._elementTitle.textContent=this._item.name;
        this._setEventListeners();
        return this._element;
    }
}