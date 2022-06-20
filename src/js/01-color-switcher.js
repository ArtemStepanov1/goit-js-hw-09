refs = {
    startBtn: document.querySelector('button[data-start]'),
    stopBtn: document.querySelector('button[data-stop]'),
    bodyEl: document.querySelector('body'),
};

let timerId = null;

refs.stopBtn.disabled = true;

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
};

refs.startBtn.addEventListener("click", () => {
    timerId = setInterval(() => {    
        refs.bodyEl.style.backgroundColor = getRandomHexColor();
    }, 1000);
    refs.startBtn.disabled = true;
    refs.stopBtn.disabled = false;
  }); 
  
refs.stopBtn.addEventListener("click", () => {
    clearInterval(timerId);
    refs.startBtn.disabled = false;
    refs.stopBtn.disabled = true;
});

