export class UserInfo {
    constructor({nameSelector, aboutSelector, photoSelector}) {
        this._name=document.querySelector(nameSelector);
        this._about=document.querySelector(aboutSelector);
        this._photo=document.querySelector(photoSelector);
    };

    getUserInfo() {
        return {name: this._name.textContent, about: this._about.textContent};
    }


    setUserInfo(Info) {
        this._name.textContent=Info.name;
        this._about.textContent=Info.about;
    }

    setUserAvatar(Info) {
        console.log('qqweqee',Info)
        this._photo.src=Info.avatar;
        
    }

    setUserId(id) {
        console.log('userInfoId', id)
        this.id=id;
    }
}