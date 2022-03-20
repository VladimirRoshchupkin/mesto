export class UserInfo {
    constructor({nameSelector, aboutSelector}) {
        this._name=document.querySelector(nameSelector);
        this._about=document.querySelector(aboutSelector);
    };

    getUserInfo() {
        return {name: this._name.textContent, about: this._about.textContent};
    }

    setUserInfo(Info) {
        this._name.textContent=Info.name;
        this._about.textContent=Info.about;
    }

    setUserId(id) {
        console.log('userInfoId', id)
        this.id=id;
    }
}