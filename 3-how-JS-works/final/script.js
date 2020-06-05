/////////////////////////////////////
// Lecture: Hoisting

console.log("*******************************");
console.log("***\t Hoisting");
console.log("*******************************");
// functions
calculateAge(1965);

function calculateAge(year) {
    console.log(2016 - year);
}

// WORKS .. ONLY for function declaration !!!!

// non funzione perche a differenza della funzioni le variabili non pre-caricate
// ma sono "undefined" nel Goobal 
// retirement(1956);
var retirement = function(year) {
    console.log(65 - (2016 - year));
}


// variables

console.log("variables 1 ",age);
var age = 23;

function foo() {
    console.log("variables 2 ", age);
    var age = 65;
    console.log("variables 3", age);
}
foo();
console.log(age);




/////////////////////////////////////
// Lecture: Scoping

console.log("*******************************");
console.log("***\t Scoping");
console.log("*******************************");

console.log("Ex-1");
// First scoping example
var a = 'Hello!';
first();

function first() {
    var b = 'Hi!';
    second();

    function second() {
        var c = 'Hey!';
        console.log(a + b + c);
    }
}

console.log("Ex-2");
// Example to show the differece between execution stack and scope chain
var a = 'Hello!';
first();

function first() {
    var b = 'Hi!';
    second();

    function second() {
        var c = 'Hey!';
        third()
    }
}

function third() {
    var d = 'John';
    // console.log(c); // undefined
    console.log(a+d);
}



/////////////////////////////////////
// Lecture: The this keyword

console.log("*******************************");
console.log("***\t Scoping");
console.log("*******************************");

console.log("Ex-1 global this = ", this); // Window - default Object

calculateAge(1985);

function calculateAge(year) { // is attached to GLOBAL object
    console.log(2016 - year);
    console.log("Ex-2 inner 'calculateAge' this = ", this);
}

var john = {
    name: 'John',
    yearOfBirth: 1990,
    calculateAge: function() {
        console.log("Ex-3 inner . obeject this = ", this);
        console.log(2016 - this.yearOfBirth);
        
        function innerFunction() { // this is a REGULAR FUNCTION
            console.log("Ex-4 inne . obeject and its 'innerFunction' this = ", this);
        }
        innerFunction();
    }
}
console.log("------- 1")
john.calculateAge();

var mike = {
    name: 'Mike',
    yearOfBirth: 1984
};

console.log("------- 2")
mike.calculateAge = john.calculateAge;
mike.calculateAge();

