import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import 'flatpickr/dist/themes/material_red.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const startBtn = document.querySelector('[data-start]');
const dataDays = document.querySelector('[data-days]');
const dataHours = document.querySelector('[data-hours]');
const dataMinutes = document.querySelector('[data-minutes]');
const dataSeconds = document.querySelector('[data-seconds]');

startBtn.disabled = true;

let selectedDate = 0;

const fp = flatpickr('#datetime-picker', {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const dateNow = Date.now();
    if (selectedDates[0] < dateNow) {
      Notify.failure('Please choose a date in the future');
      //return alert('Please choose a date in the future');
    } else {
      startBtn.disabled = false;
    }
    selectedDate = selectedDates[0];
    return selectedDate;
  },
});

const switcher = {
  switcherId: null,
  start() {
    startBtn.disabled = true;
    this.switcherId = setInterval(() => {
      const currentTime = Date.now();
      const timeDifference = selectedDate - currentTime;
      if (timeDifference < 0) {
        clearInterval(this.switcherId);
        Notify.success('time is up :)');
      } else {
        const { days, hours, minutes, seconds } = convertMs(timeDifference);
        updateDataSwitcher(days, hours, minutes, seconds);
      }
      //console.log(timeConverts);
    }, 1000);
  },
};

startBtn.addEventListener('click', switcher.start);

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function updateDataSwitcher(days, hours, minutes, seconds) {
  dataDays.textContent = days;
  dataHours.textContent = hours;
  dataMinutes.textContent = minutes;
  dataSeconds.textContent = seconds;
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}
