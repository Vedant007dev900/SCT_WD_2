let minutes = 0,
  seconds = 0,
  milliseconds = 0;
let timer;
let running = false;

const startPauseBtn = document.getElementById("startPause");
const resetBtn = document.getElementById("reset");
const lapBtn = document.getElementById("lap");
const lapsList = document.getElementById("laps");

function updateDisplay() {
  document.getElementById("minutes").innerText = minutes
    .toString()
    .padStart(2, "0");
  document.getElementById("seconds").innerText = seconds
    .toString()
    .padStart(2, "0");
  document.getElementById("milliseconds").innerText = milliseconds
    .toString()
    .padStart(2, "0");
}

function startPause() {
  if (!running) {
    running = true;
    startPauseBtn.innerText = "Pause";
    timer = setInterval(() => {
      milliseconds++;
      if (milliseconds === 100) {
        milliseconds = 0;
        seconds++;
      }
      if (seconds === 60) {
        seconds = 0;
        minutes++;
      }
      updateDisplay();
    }, 10);
  } else {
    running = false;
    clearInterval(timer);
    startPauseBtn.innerText = "Start";
  }
}

function reset() {
  clearInterval(timer);
  running = false;
  minutes = 0;
  seconds = 0;
  milliseconds = 0;
  updateDisplay();
  startPauseBtn.innerText = "Start";
  lapsList.innerHTML = "";
}

function recordLap() {
  if (running) {
    const lapTime = `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}:${milliseconds.toString().padStart(2, "0")}`;
    const lapItem = document.createElement("li");
    lapItem.innerText = `Lap ${lapsList.children.length + 1}: ${lapTime}`;
    lapsList.appendChild(lapItem);
  }
}

// Event Listeners
startPauseBtn.addEventListener("click", startPause);
resetBtn.addEventListener("click", reset);
lapBtn.addEventListener("click", recordLap);

// Initialize display
updateDisplay();
