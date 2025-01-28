const userInput =document.querySelector('#guess');
const start_again = document.querySelector('#start_again');
const submit = document.querySelector('#guess_btn');
const guess_btn = document.querySelector('#guess_btn');
const previousGuessesHTML = document.querySelector('#previousGuesses');
const guessesRemainingHTML = document.querySelector('#guessesRemaining');
const high_low = document.querySelector('#high_low');
const animationContainer = document.querySelector('#animation');
let anim = null;

let randomNumber = parseInt(Math.random() * 20) + 1;
// console.log(` Globle number ${randomNumber}`);
let previousGuesses = [];
let guessesRemaining = 1;
let playGame= true;
start_again.style.display = 'none';

if(playGame){
    submit.addEventListener('click', function (e){
        e.preventDefault();
       const guess = parseInt(userInput.value);
        validateInput(guess);
    });
}

// Initialize Lottie animation
anim = lottie.loadAnimation({
    container: animationContainer,
    renderer: 'svg',
    loop: false,
    autoplay: false,
    path: 'https://assets1.lottiefiles.com/packages/lf20_kji8qg4v.json' // You can change this to any celebration animation URL
});


function validateInput(guess){
    if(isNaN(guess) || guess < 1 || guess > 20){
        alert('Please enter a valid number between 1 and 20');
    }
    else{
     previousGuesses.push(guess);
     if(guessesRemaining === 10){
        displayGuess(guess);
        displayMessage(`Game Over. Random Number was ${randomNumber}`);
        endGame();
    }
    else{
        displayGuess(guess);
        checkGuess(guess);
    }
}

function checkGuess(guess){

        if(guess === randomNumber){
            displayMessage(`You guessed the number correctly`);
            const player = document.querySelector('#animation');
            player.style.display = 'block';
            player.play();
            endGame();
        }
        else if(guess < randomNumber){
            displayMessage(`Too low`);
        }
        else if(guess > randomNumber){
            displayMessage(`Too high`);
        }
    }
}

function displayGuess(guess){
    userInput.value = '';

    previousGuessesHTML.innerHTML = previousGuesses.map(num => 
        `<span style="background-color: #3478f6; width: 25px; height: 25px; margin: 0 2px; color: white; border-radius: 50%; display: inline-block; text-align: center; line-height: 25px;">${num}</span>`
    ).join('');
    
    guessesRemaining++;
    guessesRemainingHTML.innerHTML = `${11 - guessesRemaining}`;
}

function displayMessage(message){
    high_low.innerHTML = `<h3>${message}</h3>`;
    if(message === `You guessed the number correctly`){
        high_low.style.backgroundColor = '#34c759';
        high_low.style.color = 'white';
        high_low.style.padding = '2px 12px';
        high_low.style.borderRadius = '12px';
    }
    else if(message === `Too low`){
        high_low.style.backgroundColor = '#ff9500';
        high_low.style.color = 'white';
        high_low.style.padding = '8px 15px';
        high_low.style.borderRadius = '12px';
        high_low.style.fontSize = '12px';
        high_low.style.marginTop = '28px';
        high_low.style.marginBottom = '0px';
        high_low.innerHTML= `<h3 style="margin: 0px;">${message}</h3>`
    }
    else if(message === `Too high`){
        high_low.style.backgroundColor = '#ff9500';
        high_low.style.color = 'white';
        high_low.style.padding = '8px 15px';
        high_low.style.borderRadius = '12px';
        high_low.style.fontSize = '12px';
        high_low.style.marginTop = '28px';
        high_low.style.marginBottom = '0px';
        high_low.innerHTML= `<h3 style="margin: 0px;">${message}</h3>`
    }
}

function endGame(){
    userInput.value = '';
    submit.style.display = 'none';
    userInput.disabled = true;
    submit.disabled = true;
    start_again.style.display = 'block';
    playGame = false;
    start_again.addEventListener('click', function(e){
        e.preventDefault();
        startAgain();
    }, { once: true });
}

function startAgain(){
    start_again.style.display = 'none';
     submit.style.display = 'none';
    submit.style.display = 'block';
    userInput.disabled = false;
    submit.disabled = false;
    randomNumber = (Math.round(Math.random() * 20) + 1);
    // console.log(` start again ${randomNumber}`);
    guessesRemaining = 1;
    previousGuesses = [];
    previousGuessesHTML.textContent = '';
    guessesRemainingHTML.textContent = '10';
    high_low.innerHTML = '';
    high_low.style.backgroundColor = 'transparent';
    const player = document.querySelector('#animation');
    player.style.display = 'none';
    player.stop();
    animationContainer.style.display = 'none';
    playGame = true;
}
