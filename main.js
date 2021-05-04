//Mapping image properties
const props = [
  {
    id: 0,
    name: "rock",
  },
  {
    id: 1,
    name: "paper",
  },
  {
    id: 2,
    name: "scissors",
  },
];

const human = Array.from(document.getElementsByClassName("human"));
mapProps(human);
const cpu = Array.from(document.getElementsByClassName("cpu"));
mapProps(cpu);

function mapProps(elms) {
  elms.forEach((el, index) => el.setAttribute("id", props[index].id));
}
//Buttons
const play = document.querySelector(".btn-1");
const replay = document.querySelector(".btn-2");
//Iniate the game
play.addEventListener("click", () => {
  const display = document.querySelectorAll(".display");
  display.forEach((el) => el.classList.remove("display"));
  humanPick();
  replay.disabled = true;
  console.log("disabled");
});
//Iniate replay
replay.addEventListener("click", () => {
  document.location.reload(true);
});

// Cpu pick
let randomize = ~~(Math.random() * 3);

function cpuPick() {
  let cpuID = cpu[randomize].getAttribute("id");
  localStorage.setItem("cpuPick", cpuID);
  let gui = document.querySelector(".cpu-result");
  gui.textContent = `Cpu picked ${props[parseFloat(cpuID)].name}`;
}

// Player pick
function humanPick() {
  let gui = document.querySelector(".my-result");
  const myPick = document.querySelector(".my-pick");
  myPick.addEventListener("click", (e) => {
    let propsName = props[parseFloat(e.target.id)].name;
    switch (e.target.id) {
      case "0":
        gui.textContent = `You picked ${propsName}`;
        break;
      case "1":
        gui.textContent = `You picked ${propsName}`;
        break;
      case "2":
        gui.textContent = `You picked ${propsName}`;
        break;
      default:
        return;
    }
    localStorage.setItem("humanPick", e.target.id);
    myPick.style.pointerEvents = "none";

    initiateCpuMove();
  });
}

function initiateCpuMove() {
  setTimeout(() => {
    cpuPick(), decideWinner();
  }, 2000);
}

//Decide winner
function decideWinner() {
  let humanPick = localStorage.getItem("humanPick");
  let cpuPick = localStorage.getItem("cpuPick");
  if (cpuPick === humanPick) {
    tie();
  } else if (humanPick === "0" && cpuPick === "1") {
    loss();
  } else if (humanPick === "0" && cpuPick === "2") {
    win();
  } else if (humanPick === "1" && cpuPick === "0") {
    win();
  } else if (humanPick === "1" && cpuPick === "2") {
    loss();
  } else if (humanPick === "2" && cpuPick === "0") {
    loss();
  } else if (humanPick === "2" && cpuPick === "1") {
    win();
  }
}

function tie() {
  const score = document.querySelector(".final");
  score.textContent = "It's a tie";
  score.style.color = "yellow";
  enableReplay();
}
function loss() {
  const score = document.querySelector(".final");
  score.textContent = "Cpu wins";
  score.style.color = "crimson";
  enableReplay();
}
function win() {
  const score = document.querySelector(".final");
  score.textContent = "You win";
  score.style.color = "lime";
  enableReplay();
}

function enableReplay() {
  setTimeout(() => {
    play.disabled = true;
    replay.disabled = false;
    console.log("enabled");
  }, 100);
}
