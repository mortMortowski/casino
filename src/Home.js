import {useState, useEffect} from 'react';
import { useCookies } from 'react-cookie';
import showError from './functions/showError.js';
import drawCounter from './functions/drawCounter.js';
import modifyColumn from './functions/modifyColumn.js';
import getData from './functions/getData.js';
import React from 'react';

let timer;
let result;
let userData;
let madeBet = false;

function Home(){
    const [timerRunning, setTimerRunning] = useState(false);
    const [balance, setBalance] = useState(0);
    const [redBet, setRedBet] = useState(0);
    const [greenBet, setGreenBet] = useState(0);
    const [blackBet, setBlackBet] = useState(0);
    const [history, setHistory] = useState(["black", "red"]);
    const [cookies] = useCookies(['name']);

    //giving rewards after each round
    // useEffect(() => {
    //     if(timerRunning && madeBet){

    //         setRedBet(0);
    //         setGreenBet(0);
    //         setBlackBet(0);
    //         setMadeBet(false);
    
    //         if(result === 'red' && redBet > 0){
    //             setBalance(balance + (redBet * 2));
    //         }else if(result === 'green' && greenBet > 0){
    //             setBalance(balance + (greenBet * 14));
    //         }else{
    //             setBalance(balance + (blackBet * 2));
    //         }
    //     }// eslint-disable-next-line
    // }, [timerRunning]);

useEffect(() => {
    if(cookies.username){
        getData("http://localhost:8000/users").then((data) => {
            for(let i=0; i<data.length; i++){
                if(data[i].login === cookies.username){
                    userData = data[i];
                    break;
                }
            }
            setBalance(userData.coins);
        });
    }else{
        setBalance("Login to play");
    }
},[]);

function canMakeBet(){
    const betAmountString = document.querySelector('.betInput').value;
    const betAmount = parseInt(betAmountString);

    if(!cookies.username){
        showError('Login to play!');
        return false;
    }else if(betAmountString === ''){
        showError('Enter bet amount!');
        return false;
    }
    else if(betAmount <= 0){
        showError('Bet must be greater than 0!');
        return false;
    }else{
        if(timerRunning){
            if(betAmount > balance){
                showError('You dont have enough balance!');
                return false;
            }else{
                return true;
            }
        }else{
            showError('The countdown is stopped!');
            return false;
        }
    }
}

function startTimer(){
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
                        generateRandom();
                        modifyColumn("clean", "all");
                        if(madeBet){
                            calcWin();
                        }
                        drawCounter(10);
                        startTimer();
                    }, 2000);
                }
            }, 1000);
        }
    }


function generateRandom(){
    let randomNumber = Math.floor(Math.random() * 37);
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

function calcWin(){
    setRedBet(0);
    setGreenBet(0);
    setBlackBet(0);
    madeBet = false;
    console.log("gowno");

    if(result === 'red' && redBet > 0){
        const newBalance = balance + (redBet * 2);
        setBalance(newBalance);
        const requestOptions = {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({coins: newBalance})
        };
        fetch("http://localhost:8000/users/"+userData.id, requestOptions).then((res) => {
            res.json();
        }).then((data) => {
            console.log(data);
        }).catch(err => {
            console.log(err.message);
        });
    }else if(result === 'green' && greenBet > 0){
        setBalance(balance + (greenBet * 14));
    }else{
        setBalance(balance + (blackBet * 2));
    }
}

    return(
        <div className="Home">
            <div className="error"></div>
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
                        if(canMakeBet()){
                            const betAmount = parseInt(document.querySelector('.betInput').value);
                            setRedBet(betAmount + redBet);
                            setBalance(balance - betAmount);
                            madeBet = true;
                            modifyColumn("add", "red", userData, betAmount);
                        }
                    }}>Red</button>
                    <div className="red-bets-column"></div>
                </div>
                <div className="green-bets">
                    <div className="green-amount">{greenBet}</div>
                    <button className="make-bet-btn green-bet-btn" onClick={() => {
                        if(canMakeBet()){
                            const betAmount = parseInt(document.querySelector('.betInput').value);
                            setGreenBet(betAmount + greenBet);
                            setBalance(balance - betAmount);
                            madeBet = true;
                            modifyColumn("add", "green", userData, betAmount);
                        }
                        }}>Green</button>
                        <div className="green-bets-column"></div>
                </div>
                <div className="black-bets">
                    <div className="black-amount">{blackBet}</div>
                    <button className="make-bet-btn black-bet-btn" onClick={() => {
                        if(canMakeBet()){
                            const betAmount = parseInt(document.querySelector('.betInput').value);
                            setBlackBet(betAmount + blackBet);
                            setBalance(balance - betAmount);
                            madeBet = true;
                            modifyColumn("add", "black", userData, betAmount);
                        }
                        }}>Black</button>
                        <div className="black-bets-column"></div>
                </div>
            </div>
            <div className="admin-panel">
                <h2>Admin Panel</h2>
                <button className="admin-btn" onClick={() => {startTimer()}}>Start Timer</button>
                <button className="admin-btn" onClick={() => {generateRandom()}}>Generate Number</button>
            </div>
        </div>
    );
}

//To do
//Fix history update bug
//Fix error when switching pages
//Add register
//Add node server
//Improve code

//json server start:
//npx json-server --watch db/data.json --port 8000

export default Home;