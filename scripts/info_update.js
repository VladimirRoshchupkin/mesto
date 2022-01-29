//block\form
const popupProfile = document.querySelector('.popup_profile_js');
const popupElement = document.querySelector('.popup_element_js');
const popupPhoto = document.querySelector('.popup_photo_js');
const popupProfileForm = popupProfile.querySelector('.popup__form');
const popupElementForm = popupElement.querySelector('.popup__form');
const templElement = document.querySelector('.template_element').content;
const elements = document.querySelector('.elements')
//btn
const profileBtnEdit = document.querySelector('.profile__btn-edit');
const profileBtnAdd = document.querySelector('.profile__btn-add');

const profileBtnClose = popupProfile.querySelector('.popup__btn-close');
const profileBtnSave = popupProfile.querySelector('.popup__btn-save');

const elementBtnClose = popupElement.querySelector('.popup__btn-close');
const elementBtnSave = popupElement.querySelector('.popup__btn-save');

const PhotoBtnClose = popupPhoto.querySelector('.popup__btn-close');

//element
const profileUserName = document.querySelector('.profile__user-name');
const profileUserDescription = document.querySelector('.profile__user-description');

const popupProfileInputName = popupProfile.querySelector('.popup__input_name_js');
const popupProfileAbout = popupProfile.querySelector('.popup__input_about_js');
const popupElementInputName = popupElement.querySelector('.popup__input_name_js');
const popupElementLink = popupElement.querySelector('.popup__input_link_js');

const popupImg = popupPhoto.querySelector('.popup__img');
const popupImgName = popupPhoto.querySelector('.popup__figcap');

const ValidationConstants = {
    formSelector: '.popup__form',//
    inputSelector: '.popup__input',//
    submitButtonSelector: '.popup__btn-save',//не использую, легко ищется по типу submit
    inactiveButtonClass: 'popup__btn-save_disabled',//не использую, заменено на псведокласс
    inputErrorClass: 'popup__input_error', //без _type т.к. модификатора _type_normal или иного нет, можно вообще удалить и перейти на псевдокласс.
    errorClass: 'popup__error_visible'//
  }

enableValidation(ValidationConstants); 

function AddEvLiToForm (form, inputSelector, errorVisible, inputErrorClass) {
//function AddEvLiToForm (form, inputSelector, validateForm) {
    console.log('AddEvLiToForm')
    const inputs=getInputsFromForm(form, inputSelector)
    console.log(inputs)
    inputs.forEach(input => {
        console.log('AddEvLiToinput')
        input.addEventListener('input',() => {validateForm(form, inputSelector, errorVisible, inputErrorClass)})
  });
}



  function enableValidation (vc) {
    const pforms = Array.from(document.querySelectorAll(vc.formSelector))
    //console.log(pforms)
    pforms.forEach(form => {
        //можно добавлять слушатели при открытии окна, и удалять при закрытии. Будет возможно прирост в быстродействи или не будет???
        //но ведь форма может быть не всплывающая, а постоянно видимая, и тогда для неё придется писать отдельную ветку. так что идем по пути универсальности.
        AddEvLiToForm(form, vc.inputSelector,vc.errorClass, vc.inputErrorClass)
        //Валидация на случай, если при загрузке страницы какие-то формы уже отрисованны.
        //validateForm(form, vc.inputSelector,vc.errorClass, vc.inputErrorClass) временно удаляем.
        console.log('forma')
        console.log(form)
    });
  }

  function validateForm(form, inputSelector, errorVisible, inputErrorClass) {
      console.log('validateForm')
      const inputs=getInputsFromForm(form, inputSelector)
      console.log('inputs');
      console.log(inputs);
      //Много думал над тем стоит ли при прослушке передавать  TargetInput, чтобы не перебирать весь массив инпутов, и пришел к решению что не стоит
      //т.к. и проект маленький - не помешает это, так и с точки зрения универсальности - если второе поле валидируется основываясь на результатах первого - для таких полей необходимо будет проверить валдацию одновременно.
      //да, можно будет повесить валидацию второго поля по изменению себя и того(тех) от которого оно зависит, но ведь это уже будет не универсально а адаптированно под конкретную задачу.  
      inputs.forEach(input => {
      validateInput(form,input,errorVisible, inputErrorClass)
    });
      formValid = inputs.every(validateInputs);
      const submitBtn = form.querySelector('[type=submit]')
      toggleButtonState(submitBtn, formValid)
/*       if (formValid) {
        submitBtn.removeAttribute("disabled");
      } else {
        submitBtn.setAttribute("disabled", "disabled");
      } */
  }

  function toggleButtonState (button, validity) {
      if (validity) {
        button.removeAttribute("disabled");
      } else {
        button.setAttribute("disabled", "disabled");
      }
  }

  function getInputsFromForm (form, inputSelector) {
      return Array.from(form.querySelectorAll(inputSelector));
  }

  function validateInputs(input,) {
    return input.validity.valid;
  }
  
  function validateInput(form, input, errorVisible, inputErrorClass) {
    //console.log('input')
    const valid = input.validity.valid
    //console.log(`.${input.id}_error_js`)
    const error_msg = form.querySelector(`.${input.id}_error_js`)
    if (valid) {
        console.log('valid')
        error_msg.classList.remove(errorVisible)
        error_msg.textContent=""
        input.classList.remove(inputErrorClass)
        console.log('removedisabled')
        
        //submitBtn.setAttribute("disabled", "disabled");
    } else {
      console.log('not valid')
      //console.log(error_msg)
      error_msg.classList.add(errorVisible)
      error_msg.textContent=input.validationMessage
      input.classList.add(inputErrorClass)
    }
    return valid;
}


addElements(initialCards,elements)

//надеюсь ничего не сломал пока переделывал. 20 раз переделал 20 раз проверил, вроде всё работает
function addElements(objData,domTarget) {
    objData.reverse().forEach(item => {
        addElement(item,domTarget)
    });
}

function addElement (item,domTarget) {
    const element = createElement (item);
    addToDom(domTarget,element);  
}

function createElement (item) {//
    const element = templElement.cloneNode(true);
    const elementImg = element.querySelector('.element__img');
    const elementTitle = element.querySelector('.element__title');
    const elementHeart = element.querySelector('.element__btn-heart');
    const elementDelete = element.querySelector('.element__btn-delete');
    elementImg.src=item.link;
    elementImg.alt='фотография ' + item.name;
    elementImg.addEventListener('click',() => openPopupPhoto(item))
    elementTitle.textContent=item.name;
    elementHeart.addEventListener('click',() => elementHeart.classList.toggle('element__btn-heart_active'));
    elementDelete.addEventListener('click',() => elementDelete.parentElement.remove());
    return element
}

function addToDom (dom,newDom,type = 'prepend') {
    switch (type) {
        case 'prepend'://остальное допишется\добавится когда будет необходимо
            dom.prepend(newDom);
            break;
    }
}

function openPopupPhoto (item) {
    popupImg.src=item.link;
    popupImg.alt='фотография ' + item.name;
    popupImgName.textContent=item.name 
    switchVisible(popupPhoto)
}

function switchVisible (obj) {
    //console.log('switch')
    //console.log(obj)
    obj.classList.toggle('popup_visible')
     if (obj.classList.contains('popup_visible')) {
        obj.addEventListener('mousedown',closePopupsByOverlay)
    } else {
        obj.removeEventListener('mousedown',closePopupsByOverlay)
    }
}

function closeActivePopup () {
    switchVisible(document.querySelector('.popup_visible'));
}

function openPopupEdit () {
    popupProfileInputName.value=profileUserName.textContent
    popupProfileAbout.value=profileUserDescription.textContent
    
    switchVisible(popupProfile)
}

function handlerSubmitProfileForm (event) {
    event.preventDefault();
    profileUserName.textContent=popupProfileInputName.value
    profileUserDescription.textContent=popupProfileAbout.value
    switchVisible(popupProfile)
}

function handlerSubmitElementForm (event) {
    event.preventDefault();
    
    addElement({name: popupElementInputName.value, link: popupElementLink.value},elements);
    switchVisible(popupElement);
    popupElementForm.reset()
}

function closePopupsByEsc(event) {
    //console.log(event.key);
    //console.log(event.target);
    //console.log(event);
    if (event.key==='Escape') { //&& event.target.classList.contains('.popup')
        console.log('escape')
        closeActivePopup();
        //switchVisible(document.querySelector('.popup_visible'));
        //if (!popup.classList.contains('visible')) {
          //  formSubmitHandler(event);
        //}  
    }
}

function closePopupsByOverlay(event) {
    //console.log(event.target);
    //console.log(event.currentTarget);
    if (event.target===event.currentTarget) {
        //console.log(event.target)
        //console.log(event.currenttarget)
        //switchVisible(document.querySelector('.popup_visible'));
        closeActivePopup();
    }
}



profileBtnClose.addEventListener('click',closeActivePopup) //() => switchVisible(popupProfile)
profileBtnEdit.addEventListener('click',openPopupEdit)
popupProfileForm.addEventListener('submit',handlerSubmitProfileForm)

profileBtnAdd.addEventListener('click',() => switchVisible(popupElement))
elementBtnClose.addEventListener('click',closeActivePopup) //() => switchVisible(popupElement)
popupElementForm.addEventListener('submit',handlerSubmitElementForm)

PhotoBtnClose.addEventListener('click',closeActivePopup)    //() => switchVisible(popupPhoto)

document.addEventListener('keydown',closePopupsByEsc)
//document.addEventListener('click',closePopupsByOverlay)
