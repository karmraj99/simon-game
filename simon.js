let start = document.querySelector(`.startButton`);
let random = [];
let click = [];
const buttons = document.querySelectorAll('.redContainer, .greenContainer, .blueContainer, .yellowContainer');
let count = 0;
let blurScreen = document.querySelector(`.blurScreen`);
let score = document.querySelector(`.score`);
let tryAgain = document.querySelector(`.tryAgain`);
let gameStarted = false;
let sequenceAdding = false;
let audio = document.querySelector(`.audio`);
let help = document.querySelector(`.help`);
let onOff = false;
let rules = document.querySelector(`.rules`);

buttons.forEach((button, index) => {
    button.addEventListener('click', () => {
            if(!gameStarted) return;
            if(!sequenceAdding) return;

        button.classList.add('active');
        audio.play();
        setTimeout(() => {
            button.classList.remove('active');
        }, 200);

        click.push(index);
        count+=100;
        checkUserInput();
    });
});


start.addEventListener(`click`, () =>{
    if(gameStarted)return;

    gameStarted = true;
    audio.play();
    start.classList.add(`startSink`);
    setTimeout(()=>{
            start.classList.remove(`startSink`);
        },100);
    resetGame();   
    nextRound();   
});

help.addEventListener(`click`, () => {
    help.classList.add(`helpClick`);
    setTimeout(() =>{
        help.classList.remove(`helpClick`)
    },100);
    
    if (!onOff) {
        rules.style.display = `block`;
        onOff = true;
    } else {
        rules.style.display = `none`;
        onOff = false;
    }
});

function path(){
    random.push(Math.floor(Math.random()*4));
}

function playSequence() {
    sequenceAdding = false;
    start.innerText=`wait`;
    for (let j = 0; j < random.length; j++) {
        setTimeout(() => {
            buttons[random[j]].classList.add('active');
            audio.play();
            setTimeout(() => {
                buttons[random[j]].classList.remove('active');
            }, 500);

            if (j === random.length - 1) {
                setTimeout(() => {
                    sequenceAdding = true;
                    start.innerText=`click now`;
                }, 500);
            }
        }, j * 1000);
    }
    
}


function checkUserInput() {
    let currentStep = click.length - 1;

    if (click[currentStep] !== random[currentStep]) {
        count-=100;
        blurScreen.style.display=`block`;
        score.innerText=`your score: ${count}`
        resetGame();
        gameStarted = false
        sequenceAdding = false;
        start.innerText=`start`;
        return;
    }

    if (click.length === random.length) {
        setTimeout(() => {
            nextRound();
        }, 1000);
    }
}

function nextRound() {
    click = [];
    path();
    playSequence();
}

function resetGame() {
    random = [];
    click = [];
}

tryAgain.addEventListener(`click`,() =>{
    blurScreen.style.display=`none`;
    gameStarted = false;
    sequenceAdding = false;
    start.innerText=`start`;
})