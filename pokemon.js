console.log("pokemon.js loaded");

let timerDiv;
let parentDiv;
const backend_url = "https://poketwitch.bframework.de/";

// browser.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
//   console.log("tab updated");
// });

function addTimerDiv() {
  parentDiv = document.getElementsByClassName(
    "chat-input__buttons-container"
  )[0];

  if (parentDiv == undefined) {
    return;
  }

  timerDiv = document.createElement("div");
  timerDiv.setAttribute("id", "timerDiv");
  timerDiv.setAttribute(
    "style",
    "display: flex; flex-direction: row; justify-content: center; align-items: center; width: 100%; color: var(--color-text-base) !important;"
  );

  parentDiv.insertBefore(timerDiv, parentDiv.children[1]);
}

function str_pad_left(string, pad, length) {
  return (new Array(length + 1).join(pad) + string).slice(-length);
}

function mainloop() {
  fetch(backend_url + "info/events/last_spawn/")
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      var next_spawn = data.next_spawn;

      function cooldown_wait() {
        next_spawn -= 1;

        if (
          document.getElementsByClassName("chat-input__buttons-container")[0] !=
          undefined
        ) {
          if (
            document.getElementsByClassName("chat-input__buttons-container")[0]
              .children[1] != timerDiv
          ) {
            addTimerDiv();
          }

          var minutes = Math.floor(next_spawn / 60);
          var seconds = next_spawn - minutes * 60;
          timerDiv.innerHTML =
            str_pad_left(minutes, "0", 2) + ":" + str_pad_left(seconds, "0", 2);
        }

        if (next_spawn > 0) {
          setTimeout(function () {
            cooldown_wait();
          }, 1000);
        } else {
          setTimeout(function () {
            mainloop();
          }, 2000);
        }
      }

      cooldown_wait();
    });
}

addTimerDiv();
mainloop();
