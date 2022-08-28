//console.log('what are f#ck!!!!');

import { Notify } from 'notiflix/build/notiflix-notify-aio';

const form = document.querySelector('.form');

// let firstDelay = 0;
// let delayStep = 0;
// let numAmount = 0;

form.addEventListener('submit', onSubmitForm);

function onSubmitForm(evt) {
  evt.preventDefault();
  const {
    elements: { delay, step, amount },
  } = evt.currentTarget;
  const firstDelay = parseInt(delay.value);
  const delayStep = parseInt(step.value);
  const numAmount = parseInt(amount.value);
  //console.log(firstDelay, delayStep, numAmount);

  //let delayPromise = firstDelay;

  for (let i = 1; i <= numAmount; i += 1) {
    const delayPromise = firstDelay + delayStep * (i - 1);
    //console.log(delayPromise);
    createPromise(i, delayPromise)
      .then(({ position, delay }) => {
        //console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        //console.log(`❌ Rejected promise ${position} in ${delay}ms`);
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
  }

  evt.currentTarget.reset();
}

function createPromise(position, delay) {
  return new Promise((res, rej) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        // Fulfill
        res({ position, delay });
      } else {
        // Reject
        rej({ position, delay });
      }
    }, delay);
  });
}
