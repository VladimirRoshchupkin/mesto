export class Popup {
    constructor(Selector) {
        this._popup=document.querySelector(Selector)
        this._btnClose=this._popup.querySelector('.popup__btn-close')//
    }

    open() {
        this._popup.classList.add('popup_visible');
        document.addEventListener('keydown', this._handleEscClose.bind(this));
    }

    close() {
        this._popup.classList.remove('popup_visible');
        document.removeEventListener('keydown', this._handleEscClose.bind(this));
    }

    _handleEscClose (event) {
        if (event.key === 'Escape') {
            this.close(); 
        }
    }

    //все функции закрытия вынесены отдельно
    _closePopupByOverlay = (event) => {
            if (event.target === event.currentTarget) {
                this.close();
            }
    }

    _closePopubByCloseBtn = () => {
        this.close()
    }

    setEventListeners() {
        this._popup.addEventListener('mousedown', this._closePopupByOverlay);//.bind(this)
        this._btnClose.addEventListener('click', this._closePopubByCloseBtn);
    }
}
