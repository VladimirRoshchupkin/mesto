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
        this._items.forEach(item => {
            this._renderer(item);
        });
    }
}