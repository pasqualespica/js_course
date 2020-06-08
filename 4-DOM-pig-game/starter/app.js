/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/


var scores, roundScore, activePlayer, dice, gamePlaying;

init();

// https://developer.mozilla.org/it/docs/Web/API/Document/querySelector

// textContent . only plan Text
// document.querySelector('#current-' + activePlayer).textContent = dice;

// innerHTML . put HTML text
// document.querySelector('#current-' + activePlayer).innerHTML = '<em>' + dice + '</em>';

// READ the content of ELEMENT
// var x = document.querySelector('#score-0').textContent;
// console.log(x);

// use querySelector to CHANGE css of element
// document.querySelector('.dice').style.display = 'none';

// document.getElementById('score-0').textContent = 0
// document.getElementById('score-1').textContent = 0
// document.getElementById('current-0').textContent = 0
// document.getElementById('current-1').textContent = 0

// function btn() {
//     //Do something
//     console.log("Pressed .....")
// }

// https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener
document.querySelector('.btn-roll').addEventListener("click", () => {

    if (!gamePlaying) {
        return ; // Exit - not gaming
    }

    // 1.  Random number
    dice = Math.floor(Math.random() * 6) + 1
    // console.log(dice)

    // 2. Diplay the result
    var diceDOM = document.querySelector('.dice');
    
    diceDOM.style.display = 'block';
    diceDOM.src = "dice-" + dice + ".png";


    // 3. update the round score IF the rolled number WAS not a 1
    // if (dice > 1) {
    if (dice !== 1) {
        // add score
        roundScore += dice;
        document.querySelector('#current-' + activePlayer).textContent = roundScore;
    } else {
        nextPlayer();
    }

});


document.querySelector(".btn-hold").addEventListener("click", () => {

    if (!gamePlaying) {
        return; // Exit - not gaming
    }

    // 1. ADD current SCORE to GLOBAL score
    scores[activePlayer] += roundScore;

    // 2. Udapte UI
    document.getElementById("score-"+activePlayer).textContent = scores[activePlayer];

    // 3. Check if player won the game - WINNER
    if (scores[activePlayer] >= 2) {
        document.querySelector("#name-"+activePlayer).textContent = "WINNER!"
        // document.querySelector(".player-0-panel").classList.remove("active");
        document.querySelector(".dice").style.display = "none";
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

    document.querySelector('.dice').style.display = 'none';

};

document.querySelector(".btn-new").addEventListener("click", init );

function init() { 
    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0;

    gamePlaying = true;

    document.querySelector('.dice').style.display = 'none';

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
