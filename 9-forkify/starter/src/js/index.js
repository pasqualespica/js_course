// **************************
// **************************
//      CONTROLLER 
// **************************
// **************************

// when we import MODULEs don't specify `.js`

// 3 way ...

// 1. DEFAULT EXPORT
import stringa from "./modules/Search"

// 2. NAMED EXPORT
import {add as somma, multiply, ID} from "./views/searchView"

console.log(`Using imported function ${somma(ID,22)} and ${multiply(3,5)} ${stringa} `)

// 3. ALL with alias
import * as se from "./views/searchView"
console.log(`Using imported function ${se.add(se.ID, 22)} and ${se.multiply(3, 5)} ${stringa} `)
