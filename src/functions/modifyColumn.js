function modifyColumn(action, color, userData, betAmount){
    if(action === 'add'){
        if(color === 'red'){
            let redColumn = document.querySelector('.red-bets-column');
            redColumn.innerHTML += '<div class="red-bet-row"><span class="red-bet-username">'+userData.login+'</span><span class="red-bet-amount">'+betAmount+'</span></div>';
        }
        else if(color === 'green'){
            let greenColumn = document.querySelector('.green-bets-column');
            greenColumn.innerHTML += '<div class="green-bet-row"><span class="green-bet-username">'+userData.login+'</span><span class="green-bet-amount">'+betAmount+'</span></div>';
        }
        else if(color === 'black'){
            let blackColumn = document.querySelector('.black-bets-column');
            blackColumn.innerHTML += '<div class="black-bet-row"><span class="black-bet-username">'+userData.login+'</span><span class="black-bet-amount">'+betAmount+'</span></div>';
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

export default modifyColumn;