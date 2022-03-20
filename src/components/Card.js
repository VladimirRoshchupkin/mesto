export class Card {
    constructor(item, cardTemplateSelector, handleCardClick) {
        this._item=item;
        this._cardTemplateSelector=cardTemplateSelector;
        this._popupImg = document.querySelector('.popup_js_photo').querySelector('.popup__img');//popupPhoto.querySelector('.popup__img');
        this._popupImgName = document.querySelector('.popup_js_photo').querySelector('.popup__figcap');//popupPhoto.querySelector('.popup__figcap');
        this._openPopupPhoto = handleCardClick;
    }

    _copyTemplateElement() {
        return this._templElement = document.querySelector(this._cardTemplateSelector).content.querySelector('.element').cloneNode(true);
    }

    _setEventListenerImg() {
        this._elementImg.addEventListener('click',() => this._openPopupPhoto(this._item));
    }

    _setEventListenerLike() {
        this._elementHeart.addEventListener('click',() => this._elementHeart.classList.toggle('element__btn-heart_active'));
    }

    _setLikes() {
        console.log('likesmass', this._item.likes, this._item.likes.length)
        const likeCountElement = this._element.querySelector('.element__like-count');
        likeCountElement.textContent = this._item.likes.length;
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
        this._element =  this._copyTemplateElement()
        this._elementImg = this._element.querySelector('.element__img');
        this._elementTitle = this._element.querySelector('.element__title');
        this._elementHeart = this._element.querySelector('.element__btn-heart');
        this._elementDelete = this._element.querySelector('.element__btn-delete');
        this._elementImg.src = this._item.link;
        this._elementImg.alt = 'фотография ' + this._item.name;
        this._elementTitle.textContent=this._item.name;
        this._setLikes();
        this._setEventListeners();
        return this._element;
    }
}