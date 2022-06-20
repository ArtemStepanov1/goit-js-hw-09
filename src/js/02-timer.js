import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';

const refs = {
    input: document.querySelector("#datetime-picker"),
    startBtn: document.querySelector("button[data-start]"),
    days: document.querySelector("span[data-days]"),
    hours: document.querySelector('span[data-hours]'),
    minutes: document.querySelector('span[data-minutes]'),
    seconds: document.querySelector('span[data-seconds]'),
 };

let deltaTime = 0;
let timer = null;

refs.startBtn.addEventListener('click', startTimer)

refs.startBtn.disabled = true;

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
      const selectedDateValue = selectedDates[0].getTime();
      if(selectedDateValue < Date.now()) {
        Notiflix.Notify.failure('Please choose a date in the future')
      } else {
        Notiflix.Notify.success("Great! Let's go to start!");
        refs.startBtn.disabled = false;
      }
    },
  };

flatpickr("#datetime-picker", options);

function startTimer() {
    deltaTime = new Date(refs.input.value);
    refs.input.disabled = true;
    distance();
    timer = setInterval(distance, 1000);
};

function distance() {
    const timeNow = Date.now();
    let count = convertMs(deltaTime.getTime() - timeNow);
    refs.days.innerHTML = addLeadingZero(count.days);
    refs.hours.innerHTML = addLeadingZero(count.hours);
    refs.minutes.innerHTML = addLeadingZero(count.minutes);
    refs.seconds.innerHTML = addLeadingZero(count.seconds);
    refs.startBtn.disabled = true;
    if (deltaTime.getTime() - timeNow <= 1000) {
        clearInterval(timer);
        refs.startBtn.disabled = false;
        refs.input.setAttribute('readonly', false);
    };
};

function convertMs(ms) {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
  
    const days = Math.floor(ms / day);
    const hours = Math.floor((ms % day) / hour);
    const minutes = Math.floor(((ms % day) % hour) / minute);
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  
    return { days, hours, minutes, seconds };
  };
  
  
function addLeadingZero(param) {
    return String(param).padStart(2, '0')
}