let milliseconds =0;
let seconds =1;
let minutes = 0;
let hours = 0;

let isStopWatchIsOn;
let intervalID;

const hoursElement =  document.querySelector('.js-hours');
const minutesElement =  document.querySelector('.js-minutes');
const secondsElement =  document.querySelector('.js-seconds');
const millisecondsElement = document.querySelector('.js-milliseconds');
const startElement = document.querySelector('.js-start');
const resetElement =document.querySelector('.js-reset');
const lapDivElement = document.querySelector('.lap');

function stopWatch(){
  if(!isStopWatchIsOn){
    intervalID = setInterval(() => {
      if(milliseconds === 100){
        if(seconds === 60){
          if(minutes === 60){

            hours++;
            hoursElement.innerHTML = hours < 10? `0${hours}h` : `${hours}h`;
            minutes = 0;
            minutesElement.innerHTML = `${minutes}m`;
          }

          minutes++;
          minutesElement.innerHTML = minutes == 60? `00m` : minutes < 10? `0${minutes}m` : `${minutes}m`;
          seconds = 0;
          secondsElement.innerHTML = `${seconds}s`;
        }
    
        secondsElement.innerHTML = seconds == 60? `00s` : seconds < 10? `0${seconds}s` : `${seconds}s`;
        seconds++;
        milliseconds = 0;
        millisecondsElement.innerHTML = milliseconds;
      }

      milliseconds++;
      millisecondsElement.innerHTML = milliseconds == 100? `00` : milliseconds < 10? `0${milliseconds}` : milliseconds ;
      isStopWatchIsOn = true;
    }, 10);

     startElement.addEventListener('click', () => {
      updateLaps();
    })
    startElement.innerHTML = 'Stop';
    startElement.classList.add('stop');
    resetElement.classList.add('reset');
    lapDivElement.innerHTML = `<button onclick="
    lap();
    "class="js-lap button">lap</button>
    <div class="list"></div>`;
   

  } else {
    clearInterval(intervalID);
    isStopWatchIsOn = false;
    startElement.innerHTML = 'Start';
    startElement.classList.remove('stop');
  }

}

startElement.addEventListener('click', () => {
    stopWatch();
  })

resetElement.addEventListener('click', () => {
    reset();
  })

function reset(){
  clearInterval(intervalID);
  startElement.innerHTML = 'Start';
  startElement.classList.remove('stop');
  resetElement.classList.remove('reset');
  lapDivElement.innerHTML = '<div class="list"></div>';
  milliseconds = 0;
  millisecondsElement.innerHTML = '00';
  seconds = 1;
  secondsElement.innerHTML = '00s';
  minutes = 0;
  minutesElement.innerHTML = '00m';
  hours = 0;
  hoursElement.innerHTML = '00h';
  isStopWatchIsOn = false;
  laps = [];
}

let laps = [];

function lap(){
  laps.push({hour : hours, minute : minutes, second : seconds, millisecond : milliseconds});

  updateLaps();

}

function updateLaps(){
  let lapsHTML = '';
  let lapsCount = 0;
  laps.forEach((value) =>{
    const {hour,minute,second,millisecond} = value;
    lapsCount++;

    const addList = `
      <div class="laps-para"> ${lapsCount}.  ${hour}h : ${minute}m : ${second}s : ${millisecond} </div>`;
    
      lapsHTML += addList;
  });

  document.querySelector('.list').innerHTML = lapsHTML;
  
}
