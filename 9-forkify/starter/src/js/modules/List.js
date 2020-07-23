// shopping list
import uniqid from "uniqid";

export default class List {
    constructor() {
        this.items = []; // empty array

    }

    // creta a method to add elem to list
    addItem(count, unit, ingredient) {
        const item = {
            id : uniqid(),
            count, // not is necessary if the name and value are the same count : count
            unit,
            ingredient
        }
        this.items.push(item);
        return item;
    }

    deleteItem(id) {
        const index = this.items.findIndex(el => el.id === id);
        // https://developer.mozilla.org/it/docs/Web/JavaScript/Reference/Global_Objects/Array/splice
        // [2,4,8] splice (1,1) -- > return [4] and mutate orignal array in [2,8]
        //  insteadof
        // [2,4,8] plice (1,1) -- > return [4] and NOT mutate orignal array in [2,4,8]
        this.items.splice(index, 1); // we want only remove one element
    }

    updateCount(id, newCount) {
        // this methos retuner ELEMENT and not index
        this.items.find(el => el.id === id).count = newCount;

    }

}