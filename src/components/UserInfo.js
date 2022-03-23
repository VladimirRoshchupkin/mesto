export class UserInfo {
    constructor({nameSelector, aboutSelector, photoSelector}) {
        this._name=document.querySelector(nameSelector);
        this._about=document.querySelector(aboutSelector);
        this._photo=document.querySelector(photoSelector);
    };

    getUserInfo() {
        return {name: this._name.textContent, about: this._about.textContent};
    }


    setUserInfo(info) {
        this._name.textContent=info.name;
        this._about.textContent=info.about;
    }

    setUserAvatar(info) {
        this._photo.src=info.avatar;
        
    }

    setUserId(id) {
        this.id=id;
    }
}