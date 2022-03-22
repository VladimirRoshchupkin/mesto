export class Api {
    constructor({baseUrl, headers}) {
        this._headers=headers;
        this._baseUrl=baseUrl;
    }

    getProfile() {
        return fetch(`${this._baseUrl}/users/me`, {
            headers: this._headers
        }).then((res)=> {
            if (res.ok) {
                return res.json()  
            }
            else {
                Promise.reject(res.status)
            }
        }
        )
        .catch(()=> {
            console.log()
        })
    }

    getInitialCards() {
        return fetch(`${this._baseUrl}/cards`, {
            headers: this._headers
        }).then((res)=> {
            if (res.ok) {
                return res.json()  
            }
            else {
                Promise.reject(res.status)
            }
        }
        )
        .catch(()=> {
            console.log()
        })
    }

    editProfile(item) {
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                name: item.name,
                about: item.about
              })
        }).then((res)=> {
            if (res.ok) {
                return res.json()  
            }
            else {
                Promise.reject(res.status)
            }
        }
        )
        .catch(()=> {
            console.log()
        })
    }

    addCard(item) {
        return fetch(`${this._baseUrl}/cards`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                name: item.name,
                link: item.link
              })
        }).then((res)=> {
            if (res.ok) {
                return res.json()  
            }
            else {
                Promise.reject(res.status)
            }
        }
        )
        .catch(()=> {
            console.log()
        })
    }

    deleteCard(item) {
        return fetch(`${this._baseUrl}/cards/${item.id}`, {
            method: 'DELETE',
            headers: this._headers
        }).then((res)=> {
            if (res.ok) {
                return res.json()  
            }
            else {
                Promise.reject(res.status)
            }
        }
        )
        .catch(()=> {
            console.log()
        })
    }

    toggleLike(item) {
        const typeRequest = item.isLiked ? 'DELETE' : 'PUT'
        return fetch(`${this._baseUrl}/cards/${item.id}/likes`, {
            method: typeRequest,
            headers: this._headers
        }).then((res)=> {
            if (res.ok) {
                return res.json()  
            }
            else {
                Promise.reject(res.status)
            }
        }
        )
        .catch(()=> {
            console.log()
        })
    }

    editAvatar(item) {
        return fetch(`${this._baseUrl}/users/me/avatar`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                avatar: item.avatar
              })
        }).then((res)=> {
            if (res.ok) {
                return res.json()  
            }
            else {
                Promise.reject(res.status)
            }
        }
        )
        .catch(()=> {
            console.log()
        })
    }

  }
  
  const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-37',
    headers: {
      authorization: '2ac160e3-289e-41a6-a18f-46d80731db29',
      'Content-Type': 'application/json'
    }
  });