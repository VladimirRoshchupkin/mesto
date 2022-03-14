export class UserInfo {
    constructor({nameSelector, aboutSelector}) {
        this._name=document.querySelector(nameSelector);
        this._about=document.querySelector(aboutSelector);
/*         console.log('UserInfo')
        console.log(nameSelector)
        console.log(aboutSelector)
        console.log(this._name)
        console.log(this._about) */
    };

    getUserInfo() {
        //console.log('getUserInfo ' + this._name.textContent)
        return {name: this._name.textContent, about: this._about.textContent};
    }

    setUserInfo(Info) {
        console.log('SetUserInfo' + Info)
        console.log(Info)
        this._name.textContent=Info.name;
        this._about.textContent=Info.about;
    }



}