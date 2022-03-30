let countdown;
const timerDisplay = document.querySelector('.display__time-left')
const endTime = document.querySelector('.display__end-time')
const buttons = document.querySelectorAll('[data-time]')

function timer(seconds) {

    // clear any existing timers
    clearInterval(countdown)

    const now = Date.now();         // milliseconds from when God created the world
    const then = now + seconds * 1000;
    displayTimeLeft(seconds);       // to include the first second
    displayEndTime(then);

    countdown = setInterval(() => {
        const secondsLeft = Math.round((then - Date.now())/1000);
        // check if we should stop it
        if (secondsLeft < 0) {
            clearInterval(countdown)
            return;
        }

        // display it
        displayTimeLeft(secondsLeft);
    }, 1000)

}

function displayTimeLeft(seconds) {
    const minutes = Math.floor(seconds / 60); 
    const remainderSeconds = seconds % 60;
    const display = `${minutes}:${remainderSeconds < 10 ? '0' : ''}${remainderSeconds}`

    document.title = display;

    timerDisplay.textContent = display;

    console.log({minutes, remainderSeconds});
}

function displayEndTime(timestamp) {
    const end = new Date(timestamp);        // converting a millisecond to a date 
    const hour = end.getHours();            // 24-hour format
    const minutes = end.getMinutes();
    endTime.textContent = `Be Back at ${hour > 12 ? hour - 12 : hour}:${minutes < 10 ? '0' : ''}${minutes}`
}

function startTimer() {
    console.log(this.dataset.time)

    const seconds = parseInt(this.dataset.time)
    timer(seconds)
}

buttons.forEach(button => button.addEventListener('click', startTimer))

// forms can be selected directly from the document
// form elements can be selected directly from document.formName
document.customForm.addEventListener('submit', function(e) {
    e.preventDefault(); 
    const mins = this.minutes.value; 
    timer(mins * 60);
    this.reset();
})