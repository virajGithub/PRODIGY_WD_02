// script.js
let isRunning = false;
let startTime;
let elapsedTime = 0;
let timerInterval;

const timeDisplay = document.querySelector('.time');
const startButton = document.getElementById('start');
const pauseButton = document.getElementById('pause');
const resetButton = document.getElementById('reset');
const lapButton = document.getElementById('lap');
const lapsList = document.getElementById('laps');

function startTimer() {
    if (!isRunning) {
        isRunning = true;
        startTime = Date.now() - elapsedTime;
        timerInterval = setInterval(updateTime, 10);
        startButton.textContent = 'Pause';
    } else {
        isRunning = false;
        clearInterval(timerInterval);
        startButton.textContent = 'Resume';
    }
}

function updateTime() {
    const now = Date.now();
    elapsedTime = now - startTime;
    displayTime(elapsedTime);
}

function displayTime(milliseconds) {
    const date = new Date(milliseconds);
    timeDisplay.textContent = date.toISOString().substr(11, 8);
    return date.toISOString().substr(11, 8);
}


function resetTimer() {
    isRunning = false;
    clearInterval(timerInterval);
    elapsedTime = 0;
    displayTime(0);
    startButton.textContent = 'Start';
    lapsList.innerHTML = '';
}

function lapTime() {
    if (isRunning) {
        const lapTime = elapsedTime;
        const lapItem = document.createElement('li');
        lapItem.textContent = `Lap ${lapsList.children.length + 1}: ${displayTime(lapTime)}`;
        lapsList.appendChild(lapItem);
    }
}


startButton.addEventListener('click', startTimer);
pauseButton.addEventListener('click', startTimer);
resetButton.addEventListener('click', resetTimer);
lapButton.addEventListener('click', lapTime);
