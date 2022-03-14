export class Section {
    constructor({items, renderer},targetSelector) {
        this._items=items;
        this._renderer=renderer;
        this._domTarget=document.querySelector(targetSelector);
    }

    updateItems(newItems) {
        this._items=newItems;
    }
    

    addItem(newDom) {
        this._domTarget.prepend(newDom);
    }

    renderItems() {
        console.log('Section.renderItems')
        this._items.forEach(item => {
            this._renderer(item);
        });
    }
}
/*
//Section

function addToDom (dom,newDom) {
    dom.prepend(newDom);
}
  function addElement (item, domTarget) {
    const element = createCard (item)
    addToDom(domTarget, element);  
} 

function addElements(objData, domTarget) {
    objData.forEach(item => {
        addElement(item, domTarget);
    });
}

addElements(initialCards, elements); */