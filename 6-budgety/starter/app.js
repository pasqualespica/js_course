// IIFE - Budget Controller

// *****************************************
// DATA MODEL
// *****************************************
var budgetController = ( function() {
    console.log("budgetController ...");

    // function Constructor
    var Expense = function (id, desc, value) {
        this.id = id;
        this.desc = desc;
        this.value = value;
        // add new field
        this.percentage = -1;
    };

    // add method to prototype 
    Expense.prototype.calcPercent  = function(totalIncome) {

        if (totalIncome > 0 ) {
            this.percentage = Math.round ((this.value / totalIncome) * 100);
        } else {
            this.percentage = -1;
        }
    };

    Expense.prototype.getPercent = function () {
        return this.percentage;
    };



    var Income = function (id, desc, value) {
        this.id = id;
        this.desc = desc;
        this.value = value;
    };


    // store structures

    // var allExpenses = [];
    // var allIncomes = [];
    // var totalExpenses = 0;

    var calculateTotal = function(type) {
        var sum = 0;

        // this.data.allItems[tyep].forEach(function(currValue, index, completeArray÷){
        data.allItems[type].forEach(function(currValue){
            sum += currValue.value;
        });

        // add to GLOBAL DATA STRUCTURE
        data.totals[type] = sum;
    };

    // put all of this data - BETTER !!! - GLOBAL DATA STRUCTURE !!!
    var data = {
        allItems : {
            exp: [],
            inc: []
        },
        totals : {
            exp : 0,
            inc : 0
        },
        budget : 0,
        percentage : -1 // -1 DEFAULT values (not exists)
    };


    // Create o public method for all OTHER module to controls data structures

    // obejct with all public methods - PUBLIC !!!!
    return {
        addItem : function(type, desc, value) {

            var newItem, ID;

            // Create new ID based fron latest ID + 1 or 'exp' or 'inc'
            if (data.allItems[type].length > 0) {
                ID = data.allItems[type][data.allItems[type].length - 1].id + 1;  
            } else {
                ID = 0;
            }

            if (type === "exp") {
                newItem = new Expense(ID, desc, value);
            } else if (type === "inc") {
                newItem = new Income(ID, desc, value);
            }
         
            // add elemnt to 'DB'
            data.allItems[type].push(newItem);


            // return newItem
            return newItem;
        },

        deleteItem : function(type, id) {
            var ids, index;

            // map return a new array ) a differenza di forEach 
            ids = data.allItems[type].map(function(elem){
                return elem.id;
            });
            index = ids.indexOf(id);

            if (index !== -1){ 
                // https://developer.mozilla.org/it/docs/Web/JavaScript/Reference/Global_Objects/Array/splice
                data.allItems[type].splice(index, 1); // remove 1 element start from index

            }

        },

        calculateBudget  : function() {

            // calculate totale income and expenses
            calculateTotal('exp');
            calculateTotal('inc');

            // calculate the budget : income - expenses
            data.budget = data.totals.inc - data.totals.exp;

            // calculate the percentage of income that we spent
            if (data.budget > 0 ) {
                data.percentage = Math.round((data.totals.exp / data.totals.inc) * 100);
            } else {
                data.percentage = -1;
            }


        },

        calculatePercentages: function() {
            // calculate % for each expense 

            data.allItems.exp.forEach( function(curreElem) {
                curreElem.calcPercent(data.totals.inc); // update perceent

            });

        },

        getPercentages : function(){

            // map return a container array
            var allPerc = data.allItems.exp.map(function(cur){
                return cur.getPercent();
            })

            return allPerc;

        },

        getBudget : function() {
            return {
                budget : data.budget,
                totalInc : data.totals.inc,
                totalExp : data.totals.exp,
                percentage : data.percentage
            }
        },

        testing: function() {

            console.log(data);
        },


    }


})();

/*
    with IIFE we can obtains `separate concerns` !!!
    UI Controller
*/
// *****************************************
// View
// *****************************************
var UIController = ( function() {

    console.log("UIController ...");

    var DOMstrings = {
        inputType: ".add__type",
        inputDescription: ".add__description",
        inputValue: ".add__value",
        inputBtn: ".add__btn",
        incomeContainer: ".income__list",
        expenseContainer: ".expenses__list",
        budgetLabel: ".budget__value",
        budgetIncomeValueLabel: ".budget__income--value",
        budgetExpenseValueLabel: ".budget__expenses--value",
        budgetPercLabel: ".budget__expenses--percentage",
        container : ".container",
        expPercLabel : ".item__percentage",
        dateLabel: ".budget__title--month",

    };

    // PRIVATE 
    var formatNumber = function(num, type) {

        var num, numSplit;
        /*
            1.      + or - before the number
            2.      exactly 2 decimal points
            3.      comma separating the thousands

            Ex: 
            2310.4576   -> + 2,310.46
            2000        -> + 2,000.00
        */

        num = Math.abs(num);
        // Number of digits after the decimal point. 
        // Must be in the range 0 - 20, inclusive.
        // 2.67888.toFixed(2)
        // "2.68"
        num = num.toFixed(2)

        numSplit = num.split(".")

        int = numSplit[0];
        if (int.length > 3) { // thousand check
            int = int.substr(0, int.length - 3) + "," + int.substr(int.length - 3, 3)
        }

        dec = numSplit[1];

        return (type === "exp" ? "-" : "+") + " " + int + "." + dec;

    };


    // Array.prototype.slice.call(fields)
    var nodeListForEach = function (lista, callbackfunction) {
        for (var i = 0; i < lista.length; i++) {
            callbackfunction(lista[i], i)
        }
    };


    // return an Object - PUBLIC !!!!!!!!
    return {
        getinput : function() {

            return {
                type : document.querySelector(DOMstrings.inputType).value, // will be "inc" or "exp"
                description : document.querySelector(DOMstrings.inputDescription).value,
                value : parseFloat(document.querySelector(DOMstrings.inputValue).value)
            }

        },

        // ADD new object to list items
        addListItem: function(obj, type) {

            var html, newHtml;

            // 1. create HTML string with placeholder text

            if (type === "exp") {
                element = DOMstrings.expenseContainer;
                html = '<div class="item clearfix" id="exp-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            } else if (type === "inc") {
                element = DOMstrings.incomeContainer;
                html = '<div class="item clearfix" id="inc-%id%"> <div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div> <div class="item__delete"> <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            }          

            // 2. Replace the placeholder text qith some actual data
            newHtml = html.replace("%id%", obj.id);
            newHtml = newHtml.replace("%description%", obj.desc);
            newHtml = newHtml.replace("%value%", formatNumber(obj.value, type));

            // 3. Insert the HTML into the DOM
            // https://developer.mozilla.org/it/docs/Web/API/Element/insertAdjacentHTML
            /*
                <!-- beforebegin -->
                <p>
                    <!-- afterbegin -->
                    foo
                    <!-- beforeend -->
                </p>
                <!-- afterend -->
            */
            document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);


        },

        deleteListItem : function(selectDomId) {
            var parent, elem;

            // https://blog.garstasio.com/you-dont-need-jquery/dom-manipulation/
            elem = document.getElementById(selectDomId);
            elem.parentNode.removeChild(elem);

        },

        clearFields: function(){
            var fields, fieldsArr;
            
            fields = document.querySelectorAll(DOMstrings.inputDescription + "," + DOMstrings.inputValue);

            // Il metodo slice() ritorna la copia di una porzione dell'array contenente gli elementi compresi tra inzio e fine (fine escluso). Il metodo slice() ritorna la 
            // copia dell'intero array se non  contiene gli elementi di inizio e fine.L'array di partenza non viene modificato.
            
            // Copy from LIST to ARRAY 
            fieldsArr = Array.prototype.slice.call(fields);

            fieldsArr.forEach( function(current, index, array){
                current.value = "";
            });

            // focus
            fieldsArr[0].focus();

        },

        displayBudget : function(obj) {
            var type;
            obj.budget>0 ? type = "inc" : type = "exp";

            document.querySelector(DOMstrings.budgetLabel).textContent = formatNumber(obj.budget, type);
            document.querySelector(DOMstrings.budgetIncomeValueLabel).textContent = formatNumber(obj.totalInc, "inc");
            document.querySelector(DOMstrings.budgetExpenseValueLabel).textContent = formatNumber(obj.totalExp, "exp");

            if (obj.percentage > 0 ){
                document.querySelector(DOMstrings.budgetPercLabel).textContent = obj.percentage+"%";
            } else {
                document.querySelector(DOMstrings.budgetPercLabel).textContent = "---";
            }
        },

        displayPercetages : function(percemtages) {

            // return NODE list
            var fields = document.querySelectorAll(DOMstrings.expPercLabel);

            nodeListForEach(fields, function(current, index){
                if (percemtages[index] > 0){
                    current.textContent = percemtages[index] + "%";
                } else {
                    current.textContent = "---";
                }
                    
            });


        },

        displayMonth: function() {

            var now, year, month, months;

            now = new Date(); // return the date of today
            // var christmas = new Date(2020,12,25);

            months = ["January","February","March","April","May","June","July","August","September","October","November","December"];            
            month = now.getMonth();
            year = now.getFullYear();

            document.querySelector(DOMstrings.dateLabel).textContent = months[month] + " " + year;

        },

        changeType: function() {

            var fields = document.querySelectorAll(
                DOMstrings.inputType + "," + 
                DOMstrings.inputDescription + "," +
                DOMstrings.inputValue);

            nodeListForEach(fields, function(curreElem) {
               curreElem.classList.toggle("red-focus"); // add or remove automatically
            });

            document.querySelector(DOMstrings.inputBtn).classList.toggle("red");
        },

        // expose DOMstrings to public
        getDOMstrings : function() {
            return DOMstrings;
        }

    }

})();


/*
    ---------------------------
    GLOBAL APP CONTROLLER !!!!
    ---------------------------
*/
// *****************************************
// Controller
// *****************************************
var controller = (function(budgetCtrl, UICtrl) {

    console.log("GLOBAL APP CONTROLLER ...");
    var DOM = UICtrl.getDOMstrings();

    var setUpEventListner = function() {
        console.log("setUpEventListner ...");

        document.querySelector(DOM.inputBtn).addEventListener("click", ctrlAddItem);


        // https://developer.mozilla.org/it/docs/Web/API/KeyboardEvent
        /*
            The event type (keydown, keypress, or keyup) 
            identifies what kind of keyboard activity occurred
        */
        document.addEventListener("keypress", function (event) {

            // console.log(event)

            // add ALSO event.which because NOT all  browser have "KEYCODE"
            if (event.keyCode === 13 || event.which === 13) { // ENTER
                // console.log("ENTER!!!!!")
                ctrlAddItem();
            }
        });

        document.querySelector(DOM.container).addEventListener("click", ctrlDeleteItem);

        document.querySelector(DOM.inputType).addEventListener("change", UIController.changeType );
    };

    var udapteBudget = function() {

        // 1. Caclculate the budget
        budgetController.calculateBudget();

        // 2. Return the budget
        var budget = budgetController.getBudget();
        console.log(budget);

        // 3. Display the budget on the UI
        UIController.displayBudget(budget);

    };

    var udpatePercentages = function() {

        // 1. Calculate %
        budgetController.calculatePercentages();

        // 2. REad percemtages from the budget controller
        var allPerc;
        
        allPerc = budgetController.getPercentages();

        // 3. Update the UI with new percentages
        console.log("allPerc>>>>>", allPerc);

        UICtrl.displayPercetages(allPerc);

    };

    // for DRY principle !!!!
    var ctrlAddItem = function() {
        // 1. Get the field input data
        var input, newItem;
        
        input = UICtrl.getinput();
        console.log(input)

        if (input.description !== "" && !isNaN(input.value) && input.value > 0) {

            // 2. Add the item to th ebudget controller
            newItem = budgetCtrl.addItem(input.type, input.description, input.value);
            // budgetController.testing();

            // 3. Add the item to the UI
            UICtrl.addListItem(newItem, input.type);

            // 4. Clear fileds 
            UICtrl.clearFields();

            // 5. Caclculate and Upadate the budget
            udapteBudget();  

            // 6. Update percentages
            udpatePercentages();

        }

        console.log("ctrlAddItem END !!!")

    };

    // DELETE ITEM 
    var ctrlDeleteItem = function(event) {
        var itemID, splitID, type, ID;
        // console.log(event.target);

        // pareteNode (4 indietro) to bring "id="income-0""
        // console.log(event.target.parentNode.parentNode.parentNode.parentNode);
        // console.log(event.target.parentNode.parentNode.parentNode.parentNode.id);
        itemID = event.target.parentNode.parentNode.parentNode.parentNode.id;

        if (itemID ) { // works becouse is coerce to true or false
            console.log(itemID, typeof(itemID));

            // get TYPE and ID 
            splitID = itemID.split("-");
            type = splitID[0];
            ID = parseInt(splitID[1]);
            
            console.log(type,ID);
            // 1. delete item from data structure
            budgetController.deleteItem(type, ID);

            // 2. Delete the item in the UI
            UICtrl.deleteListItem(itemID);

            // 3. Update and show the new budget
            udapteBudget();

            // 4. Update percentages
            udpatePercentages();
        }

    };


    return {
        init : function () {
            console.log("Application start ...");

            UIController.displayMonth();

            UIController.displayBudget({
                budget : 0,
                totalInc : 0,
                totalExp : 0,
                percentage : 0
            });

            setUpEventListner();


        }
    };



})(budgetController, UIController);


// INIT main
controller.init();