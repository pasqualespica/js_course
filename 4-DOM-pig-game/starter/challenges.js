/*
YOUR 3 CHALLENGES
Change the game to follow these rules:

1. A player looses his ENTIRE score when he rolls two 6 in a row. 
    After that, it's the next player's turn. 
    (Hint: Always save the previous dice roll in a separate variable)

2. Add an input field to the HTML where players can set the winning score, 
    so that they can change the predefined score of 100. 
    (Hint: you can read that value with the .value property in JavaScript. 
    This is a good oportunity to use google to figure this out :)

3. Add another dice to the game, so that there are two dices now. The player 
    looses his current score when one of them is a 1. 
    (Hint: you will need CSS to position the second dice, 
    so take a look at the CSS code for the first one.)
*/



var scores, roundScore, activePlayer, dice, gamePlaying;

var lastDice;

init();

// https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener
document.querySelector('.btn-roll').addEventListener("click", () => {

    if (!gamePlaying) {
        return ; // Exit - not gaming
    }

    // 1.  Random number
    dice1 = Math.floor(Math.random() * 6) + 1
    dice2 = Math.floor(Math.random() * 6) + 1
    // console.log(dice)

    // 2. Diplay the result
    document.querySelectorAll(".dice").forEach(e => {
        e.style.display = "block";
        // console.log(e.id)
    });

    document.getElementById("dice-1").src = "dice-" + dice1 + ".png";
    document.getElementById("dice-2").src = "dice-" + dice2 + ".png";
    // var diceDOM = document.querySelector('.dice');
    // diceDOM.style.display = 'block';
    // diceDOM.src = "dice-" + dice + ".png";


    // 3. update the round score IF the rolled number WAS not a 1

    if (dice1 !== 1 && dice2 !== 1) {
        // add score
        roundScore += (dice1 + dice2);
        document.querySelector('#current-' + activePlayer).textContent = roundScore;
    } else {
        nextPlayer();
    }

    // if (dice > 1) {

    /*
    if (dice === 6 && lastDice === 6) {
        // Player looses score
        scores[activePlayer] = 0;
        // and update the DOM
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
        nextPlayer();
    } else  if (dice !== 1) {
        // add score
        roundScore += dice;
        document.querySelector('#current-' + activePlayer).textContent = roundScore;
    } else {
        nextPlayer();
    }

    // previous roll dice
    lastDice = dice;
    */
});


document.querySelector(".btn-hold").addEventListener("click", () => {

    if (!gamePlaying) {
        return; // Exit - not gaming
    }

    // 1. ADD current SCORE to GLOBAL score
    scores[activePlayer] += roundScore;

    // 2. Udapte UI
    document.getElementById("score-"+activePlayer).textContent = scores[activePlayer];

    var input = document.querySelector(".final-score").value;
    var winningScore = 10;
    // console.log(input)
    // REMEBER !!!!
    // Undefined , 0 , null or "" are COERCED to false
    // anything else is COERCED to true
    if (input) {
        // alert("Fill out 'FINAL SCORE' to figure out who will win : ) ")
        winningScore = input;
    }

    // 3. Check if player won the game - WINNER
    if (scores[activePlayer] >= winningScore) {
        document.querySelector("#name-"+activePlayer).textContent = "WINNER!"
        // document.querySelector(".player-0-panel").classList.remove("active");

        // document.querySelector(".dice").style.display = "none";
        document.querySelectorAll(".dice").forEach(e => {
            e.style.display = "none";
        });

        document.querySelector(".player-"+activePlayer+"-panel").classList.add("winner");
        document.querySelector(".player-"+activePlayer+"-panel").classList.remove("active");

        gamePlaying = false;
    } else {
        // 4. Next Player
        nextPlayer();
    }

});

function nextPlayer() {
    // Next Player ( actual player LOSE)
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;

    document.getElementById("current-0").textContent = 0;
    document.getElementById("current-1").textContent = 0;

    // style applicatio "Actual Player"
    // document.querySelector(".player-0-panel").classList.remove("active");
    // document.querySelector(".player-1-panel").classList.add("active");
    document.querySelector(".player-0-panel").classList.toggle("active");
    document.querySelector(".player-1-panel").classList.toggle("active");

    // document.querySelector('.dice').style.display = 'none';
    document.querySelectorAll(".dice").forEach(e => {
        e.style.display = "none";
    });


};

document.querySelector(".btn-new").addEventListener("click", init );

function init() { 
    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0;

    gamePlaying = true;

    // document.querySelector('.dice').style.display = 'none';
    document.querySelectorAll(".dice").forEach(e => {
        e.style.display = "none";
    });

    document.getElementById('score-0').textContent = 0;;
    document.getElementById('score-1').textContent = 0;
    document.getElementById('current-0').textContent = 0;
    document.getElementById('current-1').textContent = 0;

    document.getElementById("name-0").textContent = "Player 1";
    document.getElementById("name-1").textContent = "Player 2";

    
    document.querySelector(".player-0-panel").classList.remove("winner");
    document.querySelector(".player-1-panel").classList.remove("winner");

    // rimuovere sempre active per evitare che resti
    document.querySelector(".player-0-panel").classList.remove("active");
    document.querySelector(".player-1-panel").classList.remove("active");

    // add ACTIVE to 0 per default
    document.querySelector(".player-0-panel").classList.add("active");
};
