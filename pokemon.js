console.log("pokemon.js loaded");

const backend_url = "https://pokemonapi.dikkeboktor.nl/";

let timerDiv;
let guiButton;
let parentDiv;

let guiDiv;
let guiOpen = false;
let guiTimer;
let guiImage;
let guiImageTimer;

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
    "position: absolute; bottom: 90px; right: 60px; width: 200px; height: 400px; background-color: #DDD; z-index: 1000; display: none; border-radius: 8px; border: 1px solid var(--color-border-primary);"
  );

  let guiHeader = document.createElement("div");
  guiHeader.setAttribute("id", "gui-header");
  guiHeader.setAttribute(
    "style",
    "background-color: rgb(217, 44, 44); border-radius: 8px 8px 0 0; height: 140px;"
  );

  let guiBody = document.createElement("div");
  guiBody.setAttribute("id", "gui-body");
  guiBody.setAttribute("style", "border-radius: 0 0 8px 8px;");

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
      <p id="gui-image-timer">01:30</p>
    </div>
  `;

  guiHeader.onclick = function () {
    // const container = document.querySelector('.seventv-chat-input-container');
    // logChildren(container);

    const input = document.querySelector("[data-a-target='chat-input-text']");
    console.log(input);

    // simulate keypress of 'a'
    // const event = new KeyboardEvent('keypress', {
    //   "key": "a",
    //   "keyCode": 65,
    //   "which": 65,
    //   "code": "KeyA",
    //   "location": 0,
    //   "altKey": false,
    //   "ctrlKey": false,
    //   "metaKey": false,
    //   "shiftKey": false,
    //   "repeat": false
    //  });
    // input.dispatchEvent(event);

    const event2 = new KeyboardEvent("keydown", {
      key: "Enter",
      code: "Enter",
      keyCode: 13,
      which: 13,
      bubbles: true,
      cancelable: true,
    });
    input.dispatchEvent(event2);
  };

  guiBody.innerHTML = `
    <div id="gui-body-button-container" style="display: flex; align-items: center; justify-content: center; padding: 20px; flex-direction: column;">
      <button id="gui-body-button-catch" class="gui-body-button" style="display: flex; justify-content:center; align-items: center; width: 100%; border-radius: 6px; border: 1px solid black; background-color: rgb(217, 44, 44); height: 36px; color: white; font-size: 12px; margin: 5px; cursor: pointer;">Catch <img id="gui-body-button-catch-ball-image" src="https://pokemonapi.dikkeboktor.nl/balls/master-ball.svg" style="width: 16px; margin-left: 5px;"/><span class="ball-image-tooltip" style="visibility: hidden;width: 120px;background-color: #555;color: #fff;text-align: center;padding: 5px 0;border-radius: 6px;position: absolute;z-index: 1; margin-bottom: 60px; margin-left: 30px; opacity: 0;transition: opacity 0.2s;">Master Ball</span></button>
      <button id="gui-body-button-choose-ball" class="gui-body-button" style="display: flex; justify-content:center; align-items: center; width: 100%; border-radius: 6px; border: 1px solid black; background-color: rgb(217, 44, 44); height: 36px; color: white; font-size: 12px; margin: 5px; cursor: pointer;">Choose Ball</button>
      <button id="gui-body-button-choose-ball" class="gui-body-button" style="display: flex; justify-content:center; align-items: center; width: 100%; border-radius: 6px; border: 1px solid black; background-color: rgb(217, 44, 44); height: 36px; color: white; font-size: 12px; margin: 5px; cursor: pointer;">Buy Balls</button>
    </div>
  `;

  document.body.appendChild(guiDiv);
  dragElement(guiDiv);
  guiTimer = document.getElementById("gui-timer");
  guiImage = document.getElementById("gui-image");

  guiImageTimer = document.getElementById("gui-image-timer");
  guiTimerTitle = document.getElementById("gui-timer-title");
  guiImageTitle = document.getElementById("gui-image-title");

  guiBodyButtonCatchBallImage = document.getElementById("gui-body-button-catch-ball-image");
  guiBallTooltip = document.querySelector(".ball-image-tooltip");

  guiBodyButtonCatchBallImage.onmouseenter = function () {
    guiBallTooltip.style.visibility = "visible";
    guiBallTooltip.style.opacity = "1";
  };

  guiBodyButtonCatchBallImage.onmouseleave = function () {
    guiBallTooltip.style.visibility = "hidden";
    guiBallTooltip.style.opacity = "0";
  };
}

function logChildren(element) {
  for (let i = 0; i < element.children.length; i++) {
    console.log(element.children[i], element.children[i].isContentEditable);
    if (element.children[i].children.length > 0) {
      logChildren(element.children[i]);
    }
  }
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
        } else {
          if (guiDiv) guiDiv.style.display = "none";
        }

        if (next_spawn > 0) {
          if (next_spawn > 810) {
            let time = next_spawn - 810;
            let minutesImage = Math.floor(time / 60);
            let secondsImage = time - minutesImage * 60;
            guiImageTimer.innerHTML =
              str_pad_left(minutesImage, "0", 2) +
              ":" +
              str_pad_left(secondsImage, "0", 2);
            currDisplay = "image";
          } else {
            currDisplay = "timer";
          }

          setTimeout(function () {
            cooldown_wait();
          }, 1000);
        } else {
          setTimeout(function () {
            guiImage.src = backend_url + "image?" + new Date().getTime();
            mainloop();
          }, 2000);
        }
      }

      cooldown_wait();
    });
}

addDivs();
mainloop();

function dragElement(elmnt) {
  var pos1 = 0,
    pos2 = 0,
    pos3 = 0,
    pos4 = 0;
  if (document.getElementById(elmnt.id + "header")) {
    // if present, the header is where you move the DIV from:
    document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
  } else {
    // otherwise, move the DIV from anywhere inside the DIV:
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    elmnt.style.top = elmnt.offsetTop - pos2 + "px";
    elmnt.style.left = elmnt.offsetLeft - pos1 + "px";
  }

  function closeDragElement() {
    // stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;
  }
}
