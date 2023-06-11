import showError from './showError.js';

function canMakeBet(timerRunning, balance){
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

export default canMakeBet;