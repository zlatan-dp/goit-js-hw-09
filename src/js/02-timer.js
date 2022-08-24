import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import 'flatpickr/dist/themes/material_red.css';

const startBtn = document.querySelector('[data-start]');

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
      return alert('Please choose a date in the future');
    } else {
      startBtn.disabled = false;
    }
    selectedDate = selectedDates[0];
    return selectedDate;
  },
});

const switcher = {
  start() {
    setInterval(() => {
      const currentTime = Date.now();
      console.log(selectedDate - currentTime);
    }, 1000);
  },
};

startBtn.addEventListener('click', switcher.start);
