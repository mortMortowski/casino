import {useState, useEffect} from 'react';
import canMakeBet from './functions/canMakeBet.js';
//import showError from './functions/showError.js';

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

    //giving rewards after each round
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

    //test fetch data from the server
    /*fetch("http://localhost:8000/data").then(function(res){
        if(!res.ok){
            throw Error('Could not fetch data from the server');
        }
        return res.json()
    }).then(function(data){
        setBalance(data[0].coins)
    }).catch(function(err){
        showError(err.message);
    });*/

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
            <div className="left-block">
                <div className="balance">Balance: {balance}</div>
                <div className="bet-amount">
                    <input type="number" className="betInput"/>
                </div>
            </div>
            <div className="bets">
                <div className="red-bets">
                    <div className="red-amount">{redBet}</div>
                    <button className="make-bet-btn red-bet-btn" onClick={() => {
                        if(canMakeBet(timerRunning, balance)){
                            const betAmount = parseInt(document.querySelector('.betInput').value);
                            setRedBet(betAmount + redBet);
                            setBalance(balance - betAmount);
                            setMadeBet(true);
                            modifyColumn("add", "red");
                        }
                    }}>Red</button>
                    <div className="red-bets-column"></div>
                </div>
                <div className="green-bets">
                    <div className="green-amount">{greenBet}</div>
                    <button className="make-bet-btn green-bet-btn" onClick={() => {
                        if(canMakeBet(timerRunning, balance)){
                            const betAmount = parseInt(document.querySelector('.betInput').value);
                            setGreenBet(betAmount + greenBet);
                            setBalance(balance - betAmount);
                            setMadeBet(true);
                            modifyColumn("add", "green");
                        }
                        }}>Green</button>
                        <div className="green-bets-column"></div>
                </div>
                <div className="black-bets">
                    <div className="black-amount">{blackBet}</div>
                    <button className="make-bet-btn black-bet-btn" onClick={() => {
                        if(canMakeBet(timerRunning, balance)){
                            const betAmount = parseInt(document.querySelector('.betInput').value);
                            setBlackBet(betAmount + blackBet);
                            setBalance(balance - betAmount);
                            setMadeBet(true);
                            modifyColumn("add", "black");
                        }
                        }}>Black</button>
                        <div className="black-bets-column"></div>
                </div>
            </div>
            <div className="admin-panel">
                <h2>Admin Panel</h2>
                <button className="admin-btn" onClick={() => {startTimer(timerRunning, setTimerRunning, history, setHistory)}}>Start Timer</button>
                <button className="admin-btn" onClick={() => {generateRandom(history, setHistory)}}>Generate Number</button>
            </div>
            <div className="error"></div>
        </div>
    );
}

function startTimer(timerRunning, setTimerRunning, history, setHistory){
    if(timerRunning){
        clearInterval(timer);
        setTimerRunning(false);
    }else{
        let time = 10;
        setTimerRunning(true);
    
        timer = setInterval(() => {
            time--;
            drawCounter(time - 1);
            if(time <= 0){
                clearInterval(timer);
                setTimerRunning(false);
                setTimeout(() => {
                    generateRandom(history, setHistory);
                    modifyColumn("clean", "all");
                    drawCounter(10);
                    startTimer(timerRunning, setTimerRunning, history, setHistory);
                }, 2000);
            }
        }, 1000);
    }
}

function generateRandom(history, setHistory){
    let randomNumber = Math.floor(Math.random() * 37);
    console.log(history.length);
    if(randomNumber === 0){
        if(history.length >= 8)
            history.shift();
        setHistory(oldHistory => [...oldHistory, "green"]);
        result = 'green';
    }else if(randomNumber > 0 && randomNumber <= 18){
        if(history.length >= 8)
            history.shift();
        setHistory(oldHistory => [...oldHistory, "red"]);
        result = 'red';
    }else{
        if(history.length >= 8)
            history.shift();
        setHistory(oldHistory => [...oldHistory, "black"]);
        result = 'black';
    }
}

function drawCounter(time){
    let counter = document.querySelector('.timer-progress');
    counter.style.width = (time * 10) + "%";
}

function modifyColumn(action, color){
    if(action === 'add'){
        if(color === 'red'){
            let redColumn = document.querySelector('.red-bets-column');
            redColumn.innerHTML += '<div class="red-bet-row"><span class="red-bet-username">Szpaku</span><span class="red-bet-amount">250</span></div>';
        }
        else if(color === 'green'){
            let greenColumn = document.querySelector('.green-bets-column');
            greenColumn.innerHTML += '<div class="green-bet-row"><span class="green-bet-username">Szpaku</span><span class="green-bet-amount">250</span></div>';
        }
        else if(color === 'black'){
            let blackColumn = document.querySelector('.black-bets-column');
            blackColumn.innerHTML += '<div class="black-bet-row"><span class="black-bet-username">Szpaku</span><span class="black-bet-amount">250</span></div>';
        }
    }
    else if(action === 'clean'){
        let redColumn = document.querySelector('.red-bets-column');
        let greenColumn = document.querySelector('.green-bets-column');
        let blackColumn = document.querySelector('.black-bets-column');

        redColumn.innerHTML = '';
        greenColumn.innerHTML = '';
        blackColumn.innerHTML = '';
    }
}

//To do
//Fix history update bug
//Fix error when switching pages
//Add login/register system using cookies
//Add node server
//Improve code

//json server start:
//npx json-server --watch db/data.json --port 8000

export default Home;