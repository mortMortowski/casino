import showError from './showError.js';

function makeBet(color, timerRunning, setBetAmount, colorBetAmount, balance, setBalance, setMadeBet){
    const betAmountString = document.querySelector('.betInput').value;
    const betAmount = parseInt(betAmountString);

    if(betAmount === ''){
        showError('Enter bet amount!');
    }
    else if(betAmount <= 0){
        showError('Bet must be greater than 0!');
    }else{
        if(timerRunning){
            if(betAmount > balance){
                showError('You dont have enough balance!');
            }else{
                setBetAmount(colorBetAmount + betAmount);
                setBalance(balance - betAmount);
                setMadeBet(true);
            }
        }else{
            showError('The countdown is stopped!');
        }
    }
}

export default makeBet;