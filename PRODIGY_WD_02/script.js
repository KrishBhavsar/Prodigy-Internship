let timer;
let isRunning = false;
let elapsedTime = 0;
let startTime = 0;
let laps = [];

const display = document.getElementById('display');
const startButton = document.getElementById('start');
const pauseButton = document.getElementById('pause');
const resetButton = document.getElementById('reset');
const lapButton = document.getElementById('lap');
const lapsContainer = document.getElementById('laps');

function updateDisplay(time) {
    const hours = Math.floor(time / 3600000);
    const minutes = Math.floor((time % 3600000) / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    const milliseconds = Math.floor((time % 1000) / 10);
    
    display.textContent = 
        `${hours.toString().padStart(2, '0')}:` + 
        `${minutes.toString().padStart(2, '0')}:` + 
        `${seconds.toString().padStart(2, '0')}`;
}

function startStopwatch() {
    if (!isRunning) {
        isRunning = true;
        startTime = Date.now() - elapsedTime;
        timer = setInterval(() => {
            elapsedTime = Date.now() - startTime;
            updateDisplay(elapsedTime);
        }, 10);
    }
}

function pauseStopwatch() {
    if (isRunning) {
        isRunning = false;
        clearInterval(timer);
    }
}

function resetStopwatch() {
    isRunning = false;
    clearInterval(timer);
    elapsedTime = 0;
    updateDisplay(elapsedTime);
    laps = [];
    lapsContainer.innerHTML = '';
}

function lapTime() {
    if (isRunning) {
        const lapTime = elapsedTime;
        laps.push(lapTime);
        const lapElement = document.createElement('div');
        lapElement.className = 'lap-time';
        lapElement.textContent = `Lap ${laps.length}: ` + 
            `${Math.floor(lapTime / 3600000).toString().padStart(2, '0')}:` +
            `${Math.floor((lapTime % 3600000) / 60000).toString().padStart(2, '0')}:` +
            `${Math.floor((lapTime % 60000) / 1000).toString().padStart(2, '0')}`;
        lapsContainer.appendChild(lapElement);
    }
}

startButton.addEventListener('click', startStopwatch);
pauseButton.addEventListener('click', pauseStopwatch);
resetButton.addEventListener('click', resetStopwatch);
lapButton.addEventListener('click', lapTime);

updateDisplay(elapsedTime);
