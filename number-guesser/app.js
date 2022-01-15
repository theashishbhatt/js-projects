/*
Game Functions
- Player must guess a number between the min and max
- Player has certain amount of guesses
- Notify player of remaing guesses
- Notify player of the correct answers
- if loses, let the player play again


*/

//Game Values
let min = 1, 
    max = 10, 
    winningNum = getRandomNum(min, max),
    guessesLeft = 3;

//UI elements

const game = document.querySelector('#game'),
      minNum = document.querySelector('.min-num'),
      maxNum = document.querySelector('.max-num'),
      guessBtn = document.querySelector('#guess-btn'),
      guessInput = document.querySelector('#guess-input'),
      message = document.querySelector('.message');

// Assign UI min max

minNum.textContent = min;
maxNum.textContent = max;

//Listen For Guess

game.addEventListener('mousedown', function(e){
    if(e.target.className === 'play-again'){
        window.location.reload();
    }
})

guessBtn.addEventListener('click', function(){
    let guess = parseInt(guessInput.value);
    
    // validation

    if(isNaN(guess) || guess < min || guess > max){
        setMessage(`Please enter a number between ${min} and ${max}`, 'red');
    }
    // check if won
    if(guess === winningNum){
        //disable input
        guessInput.disabled = true;
        guessInput.style.borderColor = 'green';
        setMessage(`Contratulations! ${winningNum} is correct`, 'green');
        gameOver();
    } else { 
        guessInput.style.borderColor = 'red';
        if(guessesLeft > 1) {
            guessesLeft -= 1 ;
            setMessage(`Opps! ${guess} not correct. ${guessesLeft} chances left`, 'red');
            guessInput.value = '';


        } else {
            guessInput.disabled = true;
       
            setMessage(`You Lose! The correct number was ${winningNum}`);
            gameOver();
        }
     }
});

function setMessage(msg, color){
    message.style.color = color;
    message.textContent = msg;
}


// check changes
function getRandomNum(min, max){
    return Math.floor(Math.random()*(max-min+1)+min);

}

//game over

function gameOver(){
    guessBtn.value = 'Play Again'
    guessBtn.className+='play-again'
}