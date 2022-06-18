refs = {
    startBtn: document.querySelector('button[data-start]'),
    stopBtn: document.querySelector('button[data-stop]'),
    bodyEl: document.querySelector('body'),
}

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

refs.startBtn.addEventListener("click", () => {
    timerId = setInterval(() => {    
        refs.bodyEl.style.backgroundColor = getRandomHexColor();
    }, 1000);
  }); 
  
refs.stopBtn.addEventListener("click", () => {
    clearInterval(timerId);
});

