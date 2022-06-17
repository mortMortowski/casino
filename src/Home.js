import {useState} from 'react';

let timer;

function Home(){
    const [timerRunning, setTimerRunning] = useState(false);
    const [balance, setBalance] = useState(500);

    return(
        <div className="Home">
            <div className="timer">timer stopped</div>
            <div className="result">result</div>
            <div className="balance">{balance}</div>
            <div className="bet-amount">
                <input type="number" className="betInput"/>
            </div>
            <div className="bets">
                <div className="red-bets">
                    <div className="red-amount">0</div>
                    <button onClick={() => {makeBet("red")}}>Red</button>
                </div>
                <div className="green-bets">
                    <div className="green-amount">0</div>
                    <button onClick={() => {makeBet("green")}}>Green</button>
                </div>
                <div className="black-bets">
                    <div className="black-amount">0</div>
                    <button onClick={() => {makeBet("black")}}>Black</button>
                </div>
            </div>
            <div className="admin-panel">
                <button onClick={() => {startTimer(timerRunning, setTimerRunning)}}>Start Timer</button>
                <button onClick={() => {generateRandom()}}>Generate Number</button>
            </div>
            <div className="error"></div>
        </div>
    );
}

function startTimer(timerRunning, setTimerRunning){
    if(timerRunning){
        clearInterval(timer);
        document.querySelector('.timer').textContent = "timer stopped";
        setTimerRunning(false);
    }else{
        let time = 10;
        setTimerRunning(true);
        document.querySelector('.timer').textContent = time;
    
        timer = setInterval(() => {
            time--;
            document.querySelector('.timer').textContent = time;
            if(time <= 0){
                clearInterval(timer);
                setTimerRunning(false);
                setTimeout(() => {
                    generateRandom();
                    startTimer(timerRunning, setTimerRunning);
                }, 1000);
            }
        }, 1000);
    }
}

function generateRandom(){
    let randomNumber = Math.floor(Math.random() * 37);
    if(randomNumber === 0){
        document.querySelector('.result').textContent = "Green";
    }else if(randomNumber > 0 && randomNumber <= 18){
        document.querySelector('.result').textContent = "Red";
    }else{
        document.querySelector('.result').textContent = "Black";
    }
    
}

function makeBet(color){
    const betAmount = document.querySelector('.betInput').value;
    if(betAmount === ''){
        showError('Enter bet amount!');
    }
    else if(betAmount <= 0){
        showError('Bet must be greater than 0!');
    }else{
        showError('Success');
    }
}

function showError(message){
    document.querySelector('.error').textContent = message;
    setTimeout(() => {
        document.querySelector('.error').textContent = '';
    },2000);
}

//To do
//Making bet after clicking on a button
//Reward user after countdown ends
//Make better styling
//Add menu, footer and shop

export default Home;