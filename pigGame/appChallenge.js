/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer, gamePlaying;

init();

var previousDice;

//document.querySelector('#current-' + activePlayer).innerHTML = '<em>' + dice + '</em>'
//var x = document.querySelector('#score-0').textContent; //reads content and stores into x

//use query selector to change CSS doc


//.addEventListener('event type', 'call back function that will happen with event, 
//or anonymous function-> can only be used here')
// https://developer.mozilla.org/en-US/docs/Web/Events
document.querySelector('.btn-roll').addEventListener('click', function(){

    if(gamePlaying) {

        //1. Random number 
        var dice1 = Math.floor(Math.random()*6) +1;
        var dice2 = Math.floor(Math.random()*6) +1;

        //2. Disply result
        document.getElementById('dice-1').style.display = 'block';    
        document.getElementById('dice-2').style.display = 'block';    
        document.getElementById('dice-1').src = 'dice-' + dice1 + '.png';
        document.getElementById('dice-2').src = 'dice-' + dice2 + '.png';


        //3. Update the round score IF the rolled number was NOT a 1
        if( dice1 === 6 && dice2 === 6){
            //     //lose all global points, end game
                scores[activePlayer] = 0
                roundScore = 0
                document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
                document.querySelector('#current-' + activePlayer).textContent = roundScore;
                document.querySelector('#name-' + activePlayer).textContent = 'Loser';
                gamePlaying = false;
        
        
        } else if (dice1 != 1 && dice2 != 1){
            roundScore += dice1 + dice2;
            document.querySelector('#current-' + activePlayer).textContent =roundScore;
        } else {
            nextPlayer();
        }
    }
})

        // if( dice === 6 && previousDice === 6){
        //     //lose all global points, end game
        //     scores[activePlayer] = 0
        //     roundScore = 0
        //     document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
        //     document.querySelector('#current-' + activePlayer).textContent = roundScore;
        //     document.querySelector('#name-' + activePlayer).textContent = 'Loser';
        //     gamePlaying = false;

        // } else if (dice === 1 ){
        //     //add score
        //     nextPlayer();

        // } else {
        //     //next player 
        //     roundScore += dice;
        //     document.querySelector('#current-' + activePlayer).textContent = roundScore;
        // }
        // previousDice = dice;
    // }

// if this
//   then do this thing
// else
//   loop over this array
//     for each value in the array, do xyz

document.querySelector('.btn-hold').addEventListener('click', function(){
    if (gamePlaying){
        //add CURRENT  score to GLOBAL score 
        scores[activePlayer] += roundScore;

        //update the UI 
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
        
        //.value gives the content of what user puts into iput field  
        var input = document.querySelector('.final-score').value; 

        // //undefined, 0, null, are COERCED to false
        // //anything else is COERECED to true
        if(input) {
            winningScore = input;
        } else {
            winningScore = 100;
        }
        

        // check if player won the game, first to reach 100 points 
        if (scores[activePlayer] >= winningScore){
            document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
            document.getElementById('dice-1').style.display = 'none';    
            document.getElementById('dice-2').style.display = 'none';       
            document.querySelector('.player-' + activePlayer + '-panel' ).classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel' ).classList.remove('active');
            gamePlaying = false;
        } else {
            nextPlayer();
        }
    }
})


function nextPlayer(){
    //next player 
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;
    previousDice = 0;
    //same as -> //if (activePlayer === 0){
        //active player = 1;
    //} else {
        //activePlayer = 0}

        document.getElementById('current-0').textContent = '0';
        document.getElementById('current-1').textContent = '0';
        
        document.querySelector('.player-1-panel').classList.toggle('active');
        document.querySelector('.player-0-panel').classList.toggle('active');

        // document.querySelector('.player-0-panel').classList.remove('active');
        // document.querySelector('.player-1-panel').classList.add('active');

        document.getElementById('dice-1').style.display = 'none';    
        document.getElementById('dice-2').style.display = 'none';    
}

document.querySelector('.btn-new').addEventListener('click', init);

function init(){
    
    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0;
    gamePlaying = true;
    document.getElementById('dice-1').style.display = 'none';    
    document.getElementById('dice-2').style.display = 'none';    

    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    document.querySelector('.player-0-panel' ).classList.remove('winner');
    document.querySelector('.player-1-panel' ).classList.remove('winner');
    document.querySelector('.player-0-panel' ).classList.remove('active');
    document.querySelector('.player-1-panel' ).classList.remove('active');
    document.querySelector('.player-0-panel' ).classList.add('active');
}