'use strict';

function advice() {
    fetch(`https://api.adviceslip.com/advice`)
    .then(response => {
      return response.json().then(advice => {
        document.getElementById("message").value = advice.slip.advice;
      });
    });
}
