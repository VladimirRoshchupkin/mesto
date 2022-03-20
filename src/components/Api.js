export class Api {
    constructor({baseUrl, headers}) {
        this._headers=headers;
        this._baseUrl=baseUrl;
      // тело конструктора
    }

    getProfile() {
        console.log('Api.getProfile')
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
        console.log('Api.getInitialCards')
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
        console.log('Api.editProfile')
        console.log(item.name, item.about)
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                name: item.name,//'Marie Skłodowska Curie',
                about: item.about//'Physicist and Chemist'
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
        console.log('Api.addCard')
        console.log(item.name, item.about)
        return fetch(`${this._baseUrl}/cards`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                name: item.name,//'Marie Skłodowska Curie',
                link: item.link//'Physicist and Chemist'
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








  
    // другие методы работы с API
  }
  
  const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-37',
    headers: {
      authorization: '2ac160e3-289e-41a6-a18f-46d80731db29',
      'Content-Type': 'application/json'
    }
  });