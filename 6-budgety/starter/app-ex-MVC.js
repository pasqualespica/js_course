// IIFE
var budgetController = ( function() {

    var x = 23;

    // Work THANKS to  CLOSURE !!!
    // remember a INNER fuction accesss variable of OUTER function
    var add = function(a) {
        return x + a;
    }

    // retrun an Objcet
    return {
        publicTest : function(b) {
            // console.log(add(b));
            return add(b);
        },

        // publicTest1: function (b) {
        //     console.log(add(b));
        // },

    }

})();

/*
    with IIFE we can obtains `separate concerns` !!!
*/

var UIController = ( function() {
    // some code 

    
})();


/*
    ---------------------------
    THIS is the CONTROLLER !!!!
    ---------------------------
*/
var controller = (function(budgetCtrl, UICtrl) {

    // budgetController.publicTest();
    var z = budgetCtrl.publicTest(100);

    // another PUBLIC method 
    return {
        anotherPublic : function() {
            console.log(z);
        }
    }

})(budgetController, UIController);
