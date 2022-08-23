const startButton = document.querySelector('[data-start]');
const stopButton = document.querySelector('[data-stop]');
const body = document.querySelector('body');
const SWITCH_DELAY = 1000;

let switcherId = null;

startButton.addEventListener('click', startSwitcher);
stopButton.addEventListener('click', stopSwitcher);

function startSwitcher() {
  startButton.disabled = true;
  switcherId = setInterval(
    () => (body.style.backgroundColor = getRandomHexColor()),
    SWITCH_DELAY
  );
}

function stopSwitcher() {
  clearInterval(switcherId);
  startButton.disabled = false;
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
