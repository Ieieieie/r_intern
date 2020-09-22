'use strict';

function joke() {
  let joke;
  fetch(`https://official-joke-api.appspot.com/jokes/random`)
    .then(response => {
      //console.log(response.status); // => 200
      return response.json().then(joke_info => {
        // JSONパースされたオブジェクトが渡される
        //console.log(joke_info); // => {...}
        //Formにジョークをセットする
        document.getElementById("message").value = joke_info.setup + '\n\n' + joke_info.punchline;
      });
    });
}