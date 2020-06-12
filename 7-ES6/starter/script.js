/////////////////////////////////
// Lecture: let and const

console.log("/////////////////////////////////");
console.log("Lecture: let and const");
console.log("/////////////////////////////////");


// ES5
var name5 = 'Jane Smith';
var age5 = 23;
name5 = 'Jane Miller';
console.log(name5);

// ES6
const name6 = 'Jane Smith';
let age6 = 23;
// name6 = 'Jane Miller'; // its a constant
console.log(name6);


// ES5
// VAR is FUNCTION scope !!!
function driversLicence5(passedTest) {
    
    if (passedTest) {
        console.log(firstName);
        var firstName = 'John';
        var yearOfBirth = 1990;
    }
    
    
    console.log(firstName + ', born in ' + yearOfBirth + ', is now officially allowed to drive a car.');
}

driversLicence5(true);


// ES6
// LET is BLOCK scope !!!
function driversLicence6(passedTest) {
    
    // console.log(firstName); 
    let firstName;
    const yearOfBirth = 1990;
    
    if (passedTest) {
        let another_var = "DAjeeeee";
        firstName = 'John';
        console.log(another_var);
    }
    // console.log(another_var);
    console.log(firstName + ', born in ' + yearOfBirth + ', is now officially allowed to drive a car.');
}

driversLicence6(true);



console.log("For loop - let and var...");

let a = 23;
for (let a = 0; a < 5; a++) {
    console.log(a);
}
console.log(a);


var i = 23;
for (var i = 0; i < 5; i++) {
    console.log(i);
}
console.log(i);




/////////////////////////////////
// Lecture: Blocks and IIFEs
console.log("/////////////////////////////////");
console.log("Lecture: Blocks and IIFEs");
console.log("/////////////////////////////////");


// ES6
{
    const a = 1;
    let b = 2;
    var c = 3;
}

// console.log(a + b); // b is not define
console.log(c);


// ES5
(function() {
    let cc = 3;
})();

// console.log(cc);




/////////////////////////////////
// Lecture: Strings
console.log("/////////////////////////////////");
console.log("Lecture: Strings");
console.log("/////////////////////////////////");

let firstName = 'John';
let lastName = 'Smith';
const yearOfBirth = 1990;

function calcAge(year) {
    return new Date().getFullYear() - year;
    // return 2016 - year;
}

// ES5
console.log('This is ' + firstName + ' ' + lastName + '. He was born in ' + yearOfBirth + '. Today, he is ' + calcAge(yearOfBirth) + ' years old.');

// ES6 string `backticks` template literal 
console.log(`This is ${firstName} ${lastName}. He was born in ${yearOfBirth}. Today, he is ${calcAge(yearOfBirth)} years old.`);


const n = `${firstName} ${lastName}`;
// console.log(`n=${n}`);
console.log("startsWith",n.startsWith('j'));
console.log(n.startsWith('J'));
console.log(n.endsWith('Sm'));
console.log(n.includes('oh'));
console.log(`${firstName} `.repeat(5));


/////////////////////////////////
// Lecture: Arrow functions
console.log("/////////////////////////////////");
console.log("Lecture: Arrow functions");
console.log("/////////////////////////////////");

const years = [1990, 1965, 1982, 1937];

// ES5
var ages5 = years.map(function(el) {
    return 2016 - el;
});
console.log("Ages with ES5 map function ", ages5);


// ES6
let ages6 = years.map(el => 2016 - el);
console.log("Ages with ES6 arrow function ", ages6);

ages6 = years.map((el, index) => `Age element ${index + 1}: ${2016 - el}.`); // one line retuned automatically
console.log(ages6);

ages6 = years.map((el, index) => {
    const now = new Date().getFullYear();
    const age = now - el;
    return `Age element ${index + 1}: ${age}.`
});
console.log(ages6);


/////////////////////////////////
// Lecture: Arrow functions 2

console.log("/////////////////////////////////");
console.log("Lecture: Arrow functions 2");
console.log("/////////////////////////////////");

// https://developer.mozilla.org/it/docs/Web/JavaScript/Reference/Operators/this

// ES5
var box5 = {
    color: 'green',
    position: 1,
    clickMe: function() {
       
       var self = this; document.querySelector('.green').addEventListener('click', function() {
            var str = 'This is box number ' + self.position + ' and it is ' + self.color;
            alert(str);
        });
    }
}
// box5.clickMe();


// ES6
// Nella maggior parte dei casi, il valore di this è determinato da come la funzione viene 
// invocata(chiamata).Il valore di this non può essere impostato per assegnamento durante 
// l'esecuzione, e potrebbe essere differente ogni volta in cui la funzione viene chiamata.
// ES5 ha introdotto il metodo bind per impostare il valore di this indipendentemente da come 
// la funzione è invocata. ECMAScript 2015 ha introdotto le funzione a freccia ( arrow function ), 
// in cui la keyword this viene lessicalmente incorporata nello scope corrente 
// ( lo scope del contesto di esecuzione relativo al blocco corrente ).


const box6 = {
    color: 'green',
    position: 1,
    clickMe: function() {
        document.querySelector('.green').addEventListener('click', () => {
            var str = 'This is box number ' + this.position + ' and it is ' + this.color;
            alert(str);
        });
    }
}
box6.clickMe();


const box66 = {
    color: 'green',
    position: 1,
    clickMe: () => {
        document.querySelector('.green').addEventListener('click', () => {
            var str = 'This is box number ' + this.position + ' and it is ' + this.color;
            alert(str);
        });
    }
}
// box66.clickMe();


function Person(name) {
    this.name = name;
}

// ES5
Person.prototype.myFriends5 = function(friends) {
    
    var arr = friends.map(function(el) {
       return this.name + ' is friends with ' + el; 
    }.bind(this)); // bind call apply 
    
    console.log(arr);
}

var friends = ['Bob', 'Jane', 'Mark'];
new Person('ES5 John').myFriends5(friends);


// ES6
Person.prototype.myFriends6 = function(friends) {

    var arr = friends.map(el => `${this.name} is friends with ${el}`);

    console.log(arr);
}

new Person('ES6 Mike').myFriends6(friends);



/////////////////////////////////
// Lecture: Destructuring

console.log("/////////////////////////////////");
console.log("Lecture: Destructuring");
console.log("/////////////////////////////////");

// ES5
var john = ['John', 26]; // into ES5 only in this way
// var name = john[0];
// var age = john[1];

// ES6
const [name, age] = ['John', 26];
console.log(name);
console.log(age);

const obj = {
    firstName: 'John',
    lastName: 'Smith'
};

const {firstName_, lastName_} = obj;

console.log(firstName);
console.log(lastName);

const {firstName: aa, lastName: bb} = obj;
console.log(aa);
console.log(bb);


console.log("calcAgeRetirement");
function calcAgeRetirement(year) {
    const age = new Date().getFullYear() - year;
    return [age, 65 - age];
}


const [age2, retirement] = calcAgeRetirement(1990);
console.log(`age ${age2} retiremnet ${retirement}`);





/////////////////////////////////
// Lecture: Arrays
console.log("/////////////////////////////////");
console.log("Lecture: Arrays");
console.log("/////////////////////////////////");

const boxes = document.querySelectorAll('.box');

//ES5
var boxesArr5 = Array.prototype.slice.call(boxes);
boxesArr5.forEach(function(cur) {
    // cur.style.backgroundColor = 'dodgerblue';
    cur.style.backgroundColor = 'red';
});

//ES6
// https://developer.mozilla.org/it/docs/Web/JavaScript/Reference/Global_Objects/Array/from
const boxesArr6 = Array.from(boxes);
Array.from(boxes).forEach(cur => cur.style.backgroundColor = 'orange');


//ES5
for(var i = 0; i < boxesArr5.length; i++) {
    
    if(boxesArr5[i].className === 'box blue') {
        continue;
    }
    
    boxesArr5[i].textContent = 'I changed to blue!';
    
}


//ES6
for (const cur of boxesArr6) {
    if (cur.className.includes('blue')) {
        // cur.style.backgroundColor = "blue";
        continue;
    }
    cur.textContent = 'I changed to blue!';
}




//ES5
var ages = [12, 17, 8, 21, 14, 11];

var full = ages.map(function(cur) {
    return cur >= 18;
});
console.log(full);

console.log("full.indexOf(true)) " , full.indexOf(true));
console.log(ages[full.indexOf(true)]);


//ES6
// arr.findIndex(callback( element[, index[, array]] )[, thisArg])
/*
    The findIndex() method returns the index of the first element in the array that 
    satisfies the provided testing function. Otherwise, it returns -1, indicating 
    that no element passed the test.
*/
console.log("ages.findIndex" , ages.findIndex(cur => cur >= 18));

// arr.find(callback(element[, index[, array]])[, thisArg])
/*
    The find() method returns the value of the first element in the provided array 
    that satisfies the provided testing function
*/
console.log("ages.find", ages.find(cur => cur >= 18));


/////////////////////////////////
// Lecture: Spread operator

console.log("/////////////////////////////////");
console.log("Lecture: Spread operator: Arrays");
console.log("/////////////////////////////////");

function addFourAges (a, b, c, d) {
    return a + b + c + d;
}

var sum1 = addFourAges(18, 30, 12, 21);
console.log(sum1);

//ES5
var ages = [18, 30, 12, 21];
var sum2 = addFourAges.apply(null, ages);
console.log(sum2);

//ES6
const sum3 = addFourAges(...ages);
console.log(sum3);


const familySmith = ['John', 'Jane', 'Mark'];
const familyMiller = ['Mary', 'Bob', 'Ann'];
const bigFamily = [...familySmith, 'Lily', ...familyMiller];
console.log(bigFamily);


const h = document.querySelector('h1');
const boxes_ = document.querySelectorAll('.box');
const all = [h, ...boxes_];
console.log(`Change to purple using SPREAD operator, type ${typeof(all)}`)

Array.from(all).forEach(cur => cur.style.color = 'purple');


/////////////////////////////////
// Lecture: Rest parameters

console.log("/////////////////////////////////");
console.log("Lecture: Rest parameters ( opposite of Spread ... ) arguments ");
console.log("/////////////////////////////////");

function dajeee(){
    let local_arr = [1,2,2,2,2,2,2];
    let transf_arr_1 = Array.from(arguments);
    let transf_arr_2 = Array.prototype.slice.call(arguments);

    console.log(` arguments and type proto = ${arguments} : ${typeof (arguments)} : ${arguments.__proto__} `);
    console.log(` local_arr and type proto = ${local_arr} : ${typeof (local_arr)} ${local_arr.__proto__} `);
    console.log(` transf_arr_1 and type proto = ${transf_arr_1} : ${typeof (transf_arr_1)} ${transf_arr_1.__proto__}`);
    console.log(` transf_arr_2 and type proto = ${transf_arr_2} : ${typeof (transf_arr_2)} ${transf_arr_2.__proto__}`);

}

dajeee();

//ES5
function isFullAge5() {
    console.log(arguments);
    var argsArr = Array.prototype.slice.call(arguments);
    
    argsArr.forEach(function(cur) {
        console.log((2020 - cur) >= 18);
    })

}


isFullAge5(1990, 1999, 1965);
isFullAge5(1990, 1999, 1965, 2016, 1987);

//ES6
function isFullAge6(...years) { // years is an ARRAY
    console.log(` ...years and type proto = ${years} : ${typeof (years)} : ${years.__proto__} `);
    years.forEach(cur => console.log( (2016 - cur) >= 18));
}

console.log("isFullAge6 with ...years as argument");
isFullAge6(1990, 1999, 1965, 2016, 1987);


//ES5
console.log("isFullAge55");
function isFullAge55(limit) {
    console.log(limit);
    console.log(arguments)
    var argsArr = Array.prototype.slice.call(arguments, 1); // 1 start to avoid to take limint in ARGUEMNTS

    argsArr.forEach(function(cur) {
        console.log((2016 - cur) >= limit);
    })
}


//isFullAge5(16, 1990, 1999, 1965);
isFullAge55(1990, 1999, 1965, 2016, 1987);


//ES6
function isFullAge66(limit, ...years) {
    years.forEach(cur => console.log( (2016 - cur) >= limit));
}

isFullAge66(16, 1990, 1999, 1965, 2016, 1987);



/////////////////////////////////
// Lecture: Default parameters

console.log("/////////////////////////////////");
console.log("Lecture: Default parameters ");
console.log("/////////////////////////////////");

// ES5
function SmithPerson(firstName, yearOfBirth, lastName, nationality) {
    
    lastName === undefined ? lastName = 'Smith' : lastName = lastName;
    nationality === undefined ? nationality = 'american' : nationality = nationality;
    
    this.firstName = firstName;
    this.lastName = lastName;
    this.yearOfBirth = yearOfBirth;
    this.nationality = nationality;
}


//ES6
function SmithPerson(firstName, yearOfBirth, lastName = 'Smith', nationality = 'american') {
    this.firstName = firstName;
    this.lastName = lastName;
    this.yearOfBirth = yearOfBirth;
    this.nationality = nationality;
}


var john = new SmithPerson('John', 1990);
var emily = new SmithPerson('Emily', 1983, 'Diaz', 'spanish');

console.log(john,emily)

/////////////////////////////////
// Lecture: Maps

console.log("/////////////////////////////////");
console.log("Lecture: Maps ");
console.log("/////////////////////////////////");

const question = new Map();
question.set('question', 'What is the official name of the latest major JavaScript version?');
question.set(1, 'ES5');
question.set(2, 'ES6');
question.set(3, 'ES2015');
question.set(4, 'ES7');
question.set('correct', 3);
question.set(true, 'Correct answer :D');
question.set(false, 'Wrong, please try again!');

// question["daje"] = 100;
// question[1212] = 101;

console.log("......");
console.log(question.get('question'));
console.log(question.get('question?????'));
console.log(question.size); // NOT lenght as array !!!!

console.log("question", question)

if(question.has(4)) {
    //question.delete(4);
    console.log('>>>>> Answer 4 is here')
}

// To CLEAR
//question.clear();

console.log("Print MAP with forEach ...")
question.forEach((value, key) => console.log(`This is ${key}, and it's set to ${value}`));

/*
Map.prototype.keys()
Returns a new Iterator object that contains the keys for each element in the Map object in insertion order.

Map.prototype.values()
Returns a new Iterator object that contains the values for each element in the Map object in insertion order.
*/

console.log("Print MAP with forEach ...")
for (let key of question.keys()) {
    console.log("key",key);
}

// Map.prototype.entries()
// Returns a new Iterator object that contains an array of[key, value] 
// for each element in the Map object in insertion order.
for (let [key, value] of question.entries()) {
    if (typeof(key) === 'number') {
        console.log(`Answer ${key}: ${value}`);
    }
}

// const ans = parseInt(prompt('Write the correct answer'));
// console.log(question.get(ans === question.get('correct')));


/////////////////////////////////
// Lecture: Classes

console.log("/////////////////////////////////");
console.log("Lecture: Classes ");
console.log("/////////////////////////////////");

//ES5
var Person5 = function(name, yearOfBirth, job) {
    this.name = name;
    this.yearOfBirth = yearOfBirth;
    this.job = job;
}

Person5.prototype.calculateAge = function() {
    var age = new Date().getFullYear - this.yearOfBirth;
    console.log(age);
}

Person5.prototype.dajeeGreeting = function(strRaff="WEWE") {
    console.log(`Dajee ${strRaff} ${this.name}`)
}

var john5 = new Person5('John', 1990, 'teacher');
john5.dajeeGreeting()

//ES6
class Person6 {
    constructor (name, yearOfBirth, job) {
        this.name = name;
        this.yearOfBirth = yearOfBirth;
        this.job = job;
    }
    
    calculateAge() {
        var age = new Date().getFullYear - this.yearOfBirth;
        console.log(age);
    }
    
    // STATIC METHOD
    static greeting() {
        console.log('Hey there! - STATIC METHOD');
    }
}


const john6 = new Person6('John', 1990, 'teacher');

Person6.greeting();





/////////////////////////////////
// Lecture: Classes and subclasses

console.log("/////////////////////////////////");
console.log("Lecture: Classes and subclasses ");
console.log("/////////////////////////////////");

//ES5
var Person5 = function(name, yearOfBirth, job) {
    this.name = name;
    this.yearOfBirth = yearOfBirth;
    this.job = job;
}

Person5.prototype.calculateAge = function() {
    var age = new Date().getFullYear() - this.yearOfBirth;
    console.log(age);
}

var Athlete5 = function(name, yearOfBirth, job, olymicGames, medals) {
    Person5.call(this, name, yearOfBirth, job);
    this.olymicGames = olymicGames;
    this.medals = medals;
}

// Il metodo Object.create() 
// crea un nuovo oggetto a partire dall'oggetto prototipo e dalle proprietà specificati.
// Sintassi    Object.create(proto[, propertiesObject])

// prototype chain
Athlete5.prototype = Object.create(Person5.prototype);


Athlete5.prototype.wonMedal = function() {
    this.medals++;
    console.log(this.medals);
}


var johnAthlete5 = new Athlete5('John', 1990, 'swimmer', 3, 10);

johnAthlete5.calculateAge(); // see prototype chain
johnAthlete5.wonMedal();


//ES6
class Person66 {
    constructor (name, yearOfBirth, job) {
        this.name = name;
        this.yearOfBirth = yearOfBirth;
        this.job = job;
    }

    calculateAge() {
        var age = new Date().getFullYear() - this.yearOfBirth;
        console.log(age);
    }
}

class Athlete6 extends Person66 { // EXTEDNS !!!!
    constructor(name, yearOfBirth, job, olympicGames, medals) {
        super(name, yearOfBirth, job); // SUPER !!!
        this.olympicGames = olympicGames;
        this.medals = medals;
    }
    
    wonMedal() {
        this.medals++;
        console.log(this.medals);
    }
}

const johnAthlete6 = new Athlete6('John', 1990, 'swimmer', 3, 10);

johnAthlete6.wonMedal();
johnAthlete6.calculateAge();
