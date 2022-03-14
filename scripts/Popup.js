export class Popup {
    constructor(Selector) {
        console.log('popup Selector popup btn')
        console.log(Selector)
        this._popup=document.querySelector(Selector)
        console.log(this._popup)
        this._btnClose=this._popup.querySelector('.popup__btn-close')//
        console.log(this._btnClose)
        //this._handleEscClose=this._handleEscClose.bind(this)
    }

    open() {
        console.log('open')
        this._popup.classList.add('popup_visible');
        document.addEventListener('keydown', this._handleEscClose.bind(this));
    }

    close() {
        this._popup.classList.remove('popup_visible');
        document.removeEventListener('keydown', this._handleEscClose.bind(this));
    }

/*     _handleEscClose = (event) => {
        console.log('close by esc')
        console.log(event)
        if (event.key === 'Escape') {
            this.close(); 
        }
    }
 */
    _handleEscClose (event) {
        console.log('close by esc')
        console.log(event)
        console.log(event.key)
        if (event.key === 'Escape') {
            console.log('пытаюсь закрыть')
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
        console.log('close from btn')
        this.close()
    }

    setEventListeners() {
        console.log('POPUP SEL______________')
        console.log(this._popup)
        this._popup.addEventListener('mousedown', this._closePopupByOverlay);//.bind(this)
        this._btnClose.addEventListener('click', this._closePopubByCloseBtn);
    }
}

/* 
export function closePopupByEsc (event) {
    if (event.key === 'Escape') {
        closePopup(document.querySelector('.popup_visible')); 
    }
}

function closePopupsByOverlay (event) {
    if (event.target === event.currentTarget) {
        closePopup(event.target);
    }
}


export function openPopup (obj) {
    obj.classList.add('popup_visible');
    document.addEventListener('keydown', closePopupByEsc);
}

function closePopup (obj) {
    obj.classList.remove('popup_visible');
    document.removeEventListener('keydown', closePopupByEsc);
}

 */