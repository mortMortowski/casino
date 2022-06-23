function showError(message){
    document.querySelector('.error').textContent = message;
    setTimeout(() => {
        document.querySelector('.error').textContent = '';
    },2000);
}

export default showError;