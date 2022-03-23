export class Api {
    constructor({baseUrl, headers}) {
        this._headers=headers;
        this._baseUrl=baseUrl;
    }

    _getResponseData(res) {
        if (!res.ok) {
            return Promise.reject(`Ошибка: ${res.status}`);//точно, else можно было не писать, если if сработал то return же оборвет дальнейшее выполнение.
        }
        return res.json();
    }

    getProfile() {
        return fetch(`${this._baseUrl}/users/me`, {
            headers: this._headers
        }).then((res)=> {return this._getResponseData(res);})
    }

    getInitialCards() {
        return fetch(`${this._baseUrl}/cards`, {
            headers: this._headers
        }).then((res)=> {return this._getResponseData(res);})
    }

    editProfile(item) {
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                name: item.name,
                about: item.about
              })
        }).then((res)=> {return this._getResponseData(res);})
    }

    addCard(item) {
        return fetch(`${this._baseUrl}/cards`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                name: item.name,
                link: item.link
              })
        }).then((res)=> {return this._getResponseData(res);})
    }

    deleteCard(item) {
        return fetch(`${this._baseUrl}/cards/${item.id}`, {
            method: 'DELETE',
            headers: this._headers
        }).then((res)=> {return this._getResponseData(res);})
    }

    toggleLike(item) {
        const typeRequest = item.isLiked ? 'DELETE' : 'PUT'
        return fetch(`${this._baseUrl}/cards/${item.id}/likes`, {
            method: typeRequest,
            headers: this._headers
        }).then((res)=> {return this._getResponseData(res);})
    }

    editAvatar(item) {
        return fetch(`${this._baseUrl}/users/me/avatar`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                avatar: item.avatar
            })
        }).then((res)=> {return this._getResponseData(res);})

    }

}
  
/*         .catch((error)=> {console.log(error)}) */