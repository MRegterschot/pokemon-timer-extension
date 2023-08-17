console.log("pokemon.js loaded");

const backend_url = "https://pokemonapi.dikkeboktor.nl/";

let timerDiv;
let guiButton;
let parentDiv;

let guiDiv;
let guiOpen = false;
let guiTimer;
let guiImage;

let currDisplay = "timer";

function addTimer() {
  timerDiv = document.createElement("div");
  timerDiv.setAttribute("id", "timerDiv");
  timerDiv.setAttribute(
    "style",
    "z-index: 5; display: flex; flex-direction: row; justify-content: center; align-items: center; width: 100%; color: var(--color-text-base) !important;"
  );

  parentDiv.insertBefore(timerDiv, parentDiv.children[1]);
}

function addGuiButton() {
  guiButton = document.createElement("button");
  guiButton.setAttribute("id", "guiButton");
  guiButton.setAttribute(
    "style",
    "z-index: 5; background-color: var(--color-background-button-primary-default); border-radius: 4px; color: var(--color-text-button); cursor: pointer; display: flex; flex-direction: row; justify-content: center; align-items: center; font-size: 12px; font-weight: 600; height: 30px; line-height: 1; padding: 0 8px; text-align: center; white-space: nowrap;"
  );

  guiButton.onmouseenter = function () {
    guiButton.style.backgroundColor =
      "var(--color-background-button-primary-hover)";
  };

  guiButton.onmouseleave = function () {
    guiButton.style.backgroundColor =
      "var(--color-background-button-primary-default)";
  };

  guiButton.innerHTML = "Pokehub";

  guiButton.onclick = function () {
    if (guiOpen) {
      guiDiv.style.display = "none";
      guiOpen = false;
    } else {
      guiDiv.style.display = "block";
      guiOpen = true;
    }
  };

  parentDiv.insertBefore(guiButton, parentDiv.children[1]);
}

function addGui() {
  guiDiv = document.createElement("div");
  guiDiv.setAttribute("id", "guiDiv");
  guiDiv.setAttribute(
    "style",
    "position: fixed; bottom: 90px; right: 60px; width: 200px; height: 400px; background-color: #DDD; z-index: 1000; display: none; border-radius: 8px; border: 1px solid var(--color-border-primary);"
  );

  let guiHeader = document.createElement("div");
  guiHeader.setAttribute("id", "gui-header");
  guiHeader.setAttribute(
    "style",
    "background-color: rgb(217, 44, 44); border-radius: 8px 8px 0 0; height: 140px;"
  );

  let guiBody = document.createElement("div");
  guiBody.setAttribute("id", "gui-body");
  guiBody.setAttribute(
    "style",
    "background-color: rgb(255, 255, 255); border-radius: 0 0 8px 8px;"
  );

  guiDiv.appendChild(guiHeader);
  guiDiv.appendChild(guiBody);

  guiHeader.innerHTML = `
    <div class="gui-header-title" id="gui-timer-title" style="display: none; flex-direction: column; align-items: center; justify-content: center; height: 100%; font-weight: bold;">
        <p style="font-size: 24px;">Next Spawn</p>
        <p id="gui-timer" style="font-size: 24px;">NaN</p>
      </div>
  `;

  guiHeader.innerHTML += `
    <div class="gui-header-title" id="gui-image-title" style="display: none; flex-direction: column; align-items: center; justify-content: center; height: 100%; font-weight: bold;">
      <img src="${backend_url}image" id="gui-image" />
    </div>
  `;

  document.body.appendChild(guiDiv);
  guiTimer = document.getElementById("gui-timer");
  guiImage = document.getElementById("gui-image");
  guiTimerTitle = document.getElementById("gui-timer-title");
  guiImageTitle = document.getElementById("gui-image-title");
}

function addDivs() {
  parentDiv = document.getElementsByClassName(
    "chat-input__buttons-container"
  )[0];

  if (parentDiv != undefined) {
    addGuiButton();
    addTimer();
    if (document.getElementById("guiDiv") == undefined) addGui();
  }
}

function str_pad_left(string, pad, length) {
  return (new Array(length + 1).join(pad) + string).slice(-length);
}

function mainloop() {
  fetch(backend_url + "timer")
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
            addDivs();
          }

          var minutes = Math.floor(next_spawn / 60);
          var seconds = next_spawn - minutes * 60;
          timerDiv.innerHTML =
            str_pad_left(minutes, "0", 2) + ":" + str_pad_left(seconds, "0", 2);
          
          if (currDisplay == "timer") {
            guiTimerTitle.style.display = "flex";
            guiImageTitle.style.display = "none";
            guiTimer.innerHTML =
              str_pad_left(minutes, "0", 2) +
              ":" +
              str_pad_left(seconds, "0", 2);
          } else if (currDisplay == "image") {
            guiTimerTitle.style.display = "none";
            guiImageTitle.style.display = "flex";
          }
        }

        if (next_spawn > 0) {
          if (next_spawn > 810) {
            currDisplay = "image";
          } else {
            currDisplay = "timer";
          }

          setTimeout(function () {
            cooldown_wait();
          }, 1000);
        } else {
          setTimeout(function () {
            guiImage.src = backend_url + "image";
            mainloop();
          }, 2000);
        }
      }

      cooldown_wait();
    });
}

addDivs();
mainloop();
