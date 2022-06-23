import {useState} from 'react';
import makeBet from './functions/makeBet.js';
//import verifyBet from './functions/verifyBet.js';

let timer;

function Home(){
    const [timerRunning, setTimerRunning] = useState(false);
    const [balance, setBalance] = useState(500);
    const [redBet, setRedBet] = useState(0);
    const [greenBet, setGreenBet] = useState(0);
    const [blackBet, setBlackBet] = useState(0);
    const [madeBet, setMadeBet] = useState(false);

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
                    <div className="red-amount">{redBet}</div>
                    <button onClick={() => {makeBet("red", timerRunning, setRedBet, redBet, balance, setBalance, setMadeBet)}}>Red</button>
                </div>
                <div className="green-bets">
                    <div className="green-amount">{greenBet}</div>
                    <button onClick={() => {makeBet("green", timerRunning, setGreenBet, greenBet, balance, setBalance, setMadeBet)}}>Green</button>
                </div>
                <div className="black-bets">
                    <div className="black-amount">{blackBet}</div>
                    <button onClick={() => {makeBet("black", timerRunning, setBlackBet, blackBet, balance, setBalance, setMadeBet)}}>Black</button>
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
                    //verifyBet();
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

//To do
//Fix functions
//Reward user after countdown ends
//Make better styling
//Add menu, footer and shop

export default Home;