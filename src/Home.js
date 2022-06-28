import {useState, useEffect} from 'react';
import canMakeBet from './functions/canMakeBet.js';

let timer;
let result;

function Home(){
    const [timerRunning, setTimerRunning] = useState(false);
    const [balance, setBalance] = useState(500);
    const [redBet, setRedBet] = useState(0);
    const [greenBet, setGreenBet] = useState(0);
    const [blackBet, setBlackBet] = useState(0);
    const [madeBet, setMadeBet] = useState(false);
    const [history, setHistory] = useState(["black", "red"]);

    useEffect(() => {
        if(timerRunning && madeBet){

            setRedBet(0);
            setGreenBet(0);
            setBlackBet(0);
            setMadeBet(false);
    
            if(result === 'red' && redBet > 0){
                setBalance(balance + (redBet * 2));
            }else if(result === 'green' && greenBet > 0){
                setBalance(balance + (greenBet * 14));
            }else{
                setBalance(balance + (blackBet * 2));
            }
        }// eslint-disable-next-line
    }, [timerRunning]);

    return(
        <div className="Home">
            <div className="timer-wrap">
                Rolling in: <div className="timer"><div className="timer-progress"></div></div>
            </div>
            <div>{timerRunning && <div>timer running</div>}</div>
            <div className="history">History:
                <div className="results">
                    {history.map(function (item, index){
                        return <div className={item + "-box history-box"} key={index}></div>
                    })}
                </div>
            </div>
            <div className="balance">{balance}</div>
            <div className="bet-amount">
                <input type="number" className="betInput"/>
            </div>
            <div className="bets">
                <div className="red-bets">
                    <div className="red-amount">{redBet}</div>
                    <button onClick={() => {
                        if(canMakeBet(timerRunning, balance)){
                            const betAmount = parseInt(document.querySelector('.betInput').value);
                            setRedBet(betAmount + redBet);
                            setBalance(balance - betAmount);
                            setMadeBet(true);
                        }
                    }}>Red</button>
                </div>
                <div className="green-bets">
                    <div className="green-amount">{greenBet}</div>
                    <button onClick={() => {
                        if(canMakeBet(timerRunning, balance)){
                            const betAmount = parseInt(document.querySelector('.betInput').value);
                            setGreenBet(betAmount + greenBet);
                            setBalance(balance - betAmount);
                            setMadeBet(true);
                        }
                        }}>Green</button>
                </div>
                <div className="black-bets">
                    <div className="black-amount">{blackBet}</div>
                    <button onClick={() => {
                        if(canMakeBet(timerRunning, balance)){
                            const betAmount = parseInt(document.querySelector('.betInput').value);
                            setBlackBet(betAmount + blackBet);
                            setBalance(balance - betAmount);
                            setMadeBet(true);
                        }
                    }}>Black</button>
                </div>
            </div>
            <div className="admin-panel">
                <button onClick={() => {startTimer(timerRunning, setTimerRunning, history, setHistory)}}>Start Timer</button>
                <button onClick={() => {generateRandom(history, setHistory)}}>Generate Number</button>
            </div>
            <div className="error"></div>
        </div>
    );
}

function startTimer(timerRunning, setTimerRunning, history, setHistory){
    if(timerRunning){
        clearInterval(timer);
        //document.querySelector('.timer').textContent = "timer stopped";
        setTimerRunning(false);
    }else{
        let time = 10;
        setTimerRunning(true);
        //document.querySelector('.timer').textContent = time;
    
        timer = setInterval(() => {
            time--;
            //document.querySelector('.timer').textContent = time;
            drawCounter(time - 1);
            if(time <= 0){
                clearInterval(timer);
                setTimerRunning(false);
                setTimeout(() => {
                    generateRandom(history, setHistory);
                    drawCounter(10);
                    startTimer(timerRunning, setTimerRunning, history, setHistory);
                }, 2000);
            }
        }, 1000);
    }
}

function generateRandom(history, setHistory){
    let randomNumber = Math.floor(Math.random() * 37);
    if(randomNumber === 0){
        result = 'green';
        if(history.length >= 8)
            history.shift();
        setHistory( arr => [...arr, "green"]);
    }else if(randomNumber > 0 && randomNumber <= 18){
        result = 'red';
        if(history.length >= 8)
            history.shift();
        setHistory( arr => [...arr, "red"]);
    }else{
        result = 'black';
        if(history.length >= 8)
            history.shift();
        setHistory( arr => [...arr, "black"]);
    }
    
}

function drawCounter(time){
    let counter = document.querySelector('.timer-progress');
    counter.style.width = (time * 10) + "%";
}

//To do
//Make better styling
//Add menu, footer and shop
//Improve code

export default Home;