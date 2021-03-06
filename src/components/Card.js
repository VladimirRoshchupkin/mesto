export class Card {
    constructor(item, cardTemplateSelector, handleCardClick, handleDeleteClick, handleLikeClick) {
        this._item=item;
        this._cardTemplateSelector=cardTemplateSelector;
        this._popupImg = document.querySelector('.popup_js_photo').querySelector('.popup__img');//popupPhoto.querySelector('.popup__img');
        this._popupImgName = document.querySelector('.popup_js_photo').querySelector('.popup__figcap');//popupPhoto.querySelector('.popup__figcap');
        this._openPopupPhoto = handleCardClick;
        this._handleDeleteClick = handleDeleteClick;
        this._isOwner = item.idUser===item.idCardOwner;
        this._handleLikeClick = handleLikeClick
    }

    _copyTemplateElement() {
        return this._templElement = document.querySelector(this._cardTemplateSelector).content.querySelector('.element').cloneNode(true);
    }

    _setEventListenerImg() {
        this._elementImg.addEventListener('click',() => this._openPopupPhoto(this._item));
    }

    activateLike() {
        this._elementHeart.classList.add('element__btn-heart_active')
    }

    deactivateLike() {
        this._elementHeart.classList.remove('element__btn-heart_active')
    }

    checkLikers() {
        this._isLiked = this._item.likes.some(user => 
            user._id===this._item.idUser     
        )
    }

    _updateLikeMassive(res) {
        this._item.likes=res.likes
    }

    _setLikeProperty() {
        this.checkLikers()
        this._isLiked ? this.activateLike() : this.deactivateLike();
        this._setLikes()
    }

    updateLikeStatus(res) {
        this._updateLikeMassive(res)
        this._setLikeProperty()
    }

    _setEventListenerLike() {
        this._elementHeart.addEventListener('click',() => this._handleLikeClick().then((res)=>{this.updateLikeStatus(res) 
        }));
    }

    _setLikes() {
        this._likeCountElement.textContent = this._item.likes.length;
    }

    _setEventListenerDelete() {
        this._elementDelete.addEventListener('click',() => this._handleDeleteClick(this._item));
    }

    deleteCard() {
        this._element.remove()
    }

    _setEventListeners() {
        this._setEventListenerImg()
        this._setEventListenerLike()
        this._setEventListenerDelete()
    }

    _hideDeleteButton() {
        if (this._isOwner===false) {
            this._elementDelete.style.display = 'none'
        }
    }

    createElement() {
        this._element =  this._copyTemplateElement()
        this._elementImg = this._element.querySelector('.element__img');
        this._elementTitle = this._element.querySelector('.element__title');
        this._elementHeart = this._element.querySelector('.element__btn-heart');
        this._elementDelete = this._element.querySelector('.element__btn-delete');
        this._elementImg.src = this._item.link;
        this._elementImg.alt = '???????????????????? ' + this._item.name;
        this._elementTitle.textContent=this._item.name;
        this._likeCountElement = this._element.querySelector('.element__like-count');
        this._setLikeProperty()
        this._setEventListeners();
        this._hideDeleteButton();
        return this._element;
    }
}