// convert time to hours, minutes, seconds, and milliseconds
const timeToString = (time) => {
    // calculate values for hours, minutes, seconds, and milliseconds
    let exactHrs = time / 3600000;
    let hr = Math.floor(exactHrs);

    let exactMin = (exactHrs - hr) * 60;
    let min = Math.floor(exactMin);

    let exactSec = (exactMin - min) * 60;
    let s = Math.floor(exactSec);

    let exactMs = (exactSec - s) * 100;
    let ms = Math.floor(exactMs);

    // reformat values to be 2 digit strings
    let formattedHr = hr.toString().padStart(2, "0");
    let formattedMin = min.toString().padStart(2, "0");
    let formattedSec = s.toString().padStart(2, "0");
    let formattedMs = ms.toString().padStart(2, "0");

    return `${formattedHr}:${formattedMin}:${formattedSec}:${formattedMs}`;
}

// variables for managing the state of the stopwatch
let startTime;
let elapsedTime = 0;
let timerInterval;

// function for displaying the updated state of the stopwatch
const print = (time) => {
    document.getElementById("time").innerHTML = time;
}

// add functionality for stopwatch buttons
let startButton = document.getElementById("start");
let stopButton = document.getElementById("stop");
let resetButton = document.getElementById("reset");

const start = () => {
    startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(() => {
        elapsedTime = Date.now() - startTime;
        print(timeToString(elapsedTime));
    }, 10);
    showButton("STOP");
}

const stop = () => {
    clearInterval(timerInterval);
    showButton("START");
}

const reset = () => {
    clearInterval(timerInterval);
    print("00:00:00:00");
    elapsedTime = 0;
    showButton("START");
}

// display start or stop
const showButton = (buttonKey) => {
    const buttonToShow = buttonKey === "START" ? startButton : stopButton;
    const buttonToHide = buttonKey === "START" ? stopButton : startButton;
    buttonToShow.style.display = "block";
    buttonToHide.style.display = "none";
}

startButton.addEventListener("click", start);
stopButton.addEventListener("click", stop);
resetButton.addEventListener("click", reset);

// space bar to start and stop, "R" key to reset
let isStart = false;
window.addEventListener("keydown", (e) => {
    if (e.keyCode === 32 && isStart === false) {
        start();
        isStart = true;
    } else if (e.keyCode === 32 && isStart === true) {
        stop();
        isStart = false;
    } else if (e.keyCode === 82) {
        reset();
        isStart = false;
    }
})