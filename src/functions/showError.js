function showError(message){
    const error = document.querySelector('.error');
    error.textContent = message;
    error.style.display = "block";
    setTimeout(() => {
        error.textContent = '';
        error.style.display = "none";
    },2000);
}

export default showError;