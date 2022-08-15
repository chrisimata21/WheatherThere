function showTime() {
    var currentDate = document.getElementById("current-date");
    currentDate.textContent = moment().format('lll');
} setInterval(showTime, 1000);