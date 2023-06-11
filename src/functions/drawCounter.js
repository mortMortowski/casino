function drawCounter(time){
    let counter = document.querySelector('.timer-progress');
    counter.style.width = (time * 10) + "%";
}

export default drawCounter;