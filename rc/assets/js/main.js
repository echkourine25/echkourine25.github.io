function setCookie(name, value, days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

// Function to get the value of a cookie by name
function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}
// Function to read agenda data from a cookie
function readAgendaFromCookie() {
    // Get the JSON string from the 'agenda' cookie
    var agendaData = getCookie('agenda');
    // Parse the JSON string to convert it back to an array
    return agendaData ? JSON.parse(agendaData) : [];
}

agendaItems = readAgendaFromCookie();

function updateAgenda(agendaItems) {
    var agendaBody = document.getElementById('agendaBody');
    agendaBody.innerHTML = ''; // Clear existing content

    var hours = Array.from({ length: 24 }, (_, i) => i); // Create an array from 0 to 23 representing hours

    hours.forEach(hour => {
        var newRow = agendaBody.insertRow();
        newRow.insertCell(0).textContent = hour + ':00'; // Time column

        for (var day = 1; day <= 7; day++) {
            var cell = newRow.insertCell(day);
            var eventsForHourAndDay = agendaItems.filter(item => {
                var eventDate = new Date(item.dateTime);
                return eventDate.getHours() === hour && eventDate.getDay() === day;
            });

            eventsForHourAndDay.forEach(event => {
                cell.textContent += event.event + '\n';
            });
        }
    });
}
// Event listener for the form submission
document.getElementById('eventForm').addEventListener('submit', function (event) {
    event.preventDefault();

    // Get form values
    var dateInput = document.getElementById('eventDate');
    var timeInput = document.getElementById('eventTime');
    var eventInput = document.getElementById('eventText');

    // Combine date and time into a DateTime string
    var dateTime = dateInput.value + 'T' + timeInput.value;

    // Add the event to the agenda
    addEventToAgenda(dateTime, eventInput.value);

    // Clear the form fields
    dateInput.value = '';
    timeInput.value = '';
    eventInput.value = '';
});

// Function to save agenda data to a cookie
function saveAgendaToCookie(agendaItems) {
    // Convert the agendaItems array to a JSON string
    var agendaData = JSON.stringify(agendaItems);
    // Save the JSON string to a cookie named 'agenda'
    setCookie('agenda', agendaData, 7); // Expires in 7 days, adjust as needed
}

// Function to add a new event to the agenda
function addEventToAgenda(dateTime, event) {
    var agendaItems = readAgendaFromCookie();
    agendaItems.push({ dateTime, event });
    saveAgendaToCookie(agendaItems);
    updateAgenda(agendaItems);
}

// Event listener for the form submission
document.getElementById('eventForm').addEventListener('submit', function (event) {
    event.preventDefault();

    // Get form values
    var dateInput = document.getElementById('eventDate');
    var timeInput = document.getElementById('eventTime');
    var eventInput = document.getElementById('eventText');

    // Combine date and time into a DateTime string
    var dateTime = dateInput.value + 'T' + timeInput.value;

    // Add the event to the agenda
    addEventToAgenda(dateTime, eventInput.value);

    // Clear the form fields
    dateInput.value = '';
    timeInput.value = '';
    eventInput.value = '';
});

/*==================== CLOCK ====================*/
const hour = document.getElementById('clock-hour'),
      minutes = document.getElementById('clock-minutes'),
      seconds = document.getElementById('clock-seconds')

const clock = () =>{
    let date = new Date()

    let hh = date.getHours() * 30,
        mm = date.getMinutes() * 6,
        ss = date.getSeconds() * 6
        
    // We add a rotation to the elements
    hour.style.transform = `rotateZ(${hh + mm / 12}deg)`
    minutes.style.transform = `rotateZ(${mm}deg)`
    seconds.style.transform = `rotateZ(${ss}deg)`
}
setInterval(clock, 1000) // 1000 = 1s

/*==================== CLOCK & DATE TEXT ====================*/
const textHour = document.getElementById('text-hour'),
      textMinutes = document.getElementById('text-minutes'),
      textAmPm = document.getElementById('text-ampm'),
      dateWeek = document.getElementById('date-day-week'),
      dateDay = document.getElementById('date-day'),
      dateMonth = document.getElementById('date-month'),
      dateYear = document.getElementById('date-year')

const clockText = () =>{
    let date = new Date()

    let hh = date.getHours(),
        ampm,
        mm = date.getMinutes(),
        day = date.getDate(),
        dayweek = date.getDay(),
        month = date.getMonth(),
        year = date.getFullYear()

    // We change the hours from 24 to 12 hours and establish whether it is AM or PM
    if(hh >= 12){
        hh = hh - 12
        ampm = 'PM'
    }else{
        ampm = 'AM'
    }

    // We detect when it's 0 AM and transform to 12 AM
    if(hh == 0){hh = 12}

    // Show a zero before hours
    if(hh < 10){hh = `0${hh}`}

    // Show time
    textHour.innerHTML = `${hh}:`
    
    // Show a zero before the minutes
    if(mm < 10){mm = `0${mm}`}
    
    // Show minutes
    textMinutes.innerHTML = mm

    // Show am or pm
    textAmPm.innerHTML = ampm

    // If you want to show the name of the day of the week
    let week = ['Sun', 'Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat']

    // We get the months of the year and show it
    let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

    // We show the day, the month and the year
    dateDay.innerHTML = day
    dateWeek.innerHTML = `${week[dayweek]}`
    dateMonth.innerHTML = `${months[month]},`
    dateYear.innerHTML = year
}
setInterval(clockText, 1000) // 1000 = 1s

/*==================== DARK/LIGHT THEME ====================*/
const themeButton = document.getElementById('theme-button')
const darkTheme = 'dark-theme'
const iconTheme = 'bxs-sun'

// Previously selected topic (if user selected)
const selectedTheme = localStorage.getItem('selected-theme')
const selectedIcon = localStorage.getItem('selected-icon')

// We obtain the current theme that the interface has by validating the dark-theme class
const getCurrentTheme = () => document.body.classList.contains(darkTheme) ? 'dark' : 'light'
const getCurrentIcon = () => themeButton.classList.contains(iconTheme) ? 'bxs-moon' : 'bxs-sun'

// We validate if the user previously chose a topic
if (selectedTheme) {
  // If the validation is fulfilled, we ask what the issue was to know if we activated or deactivated the dark
  document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme)
  themeButton.classList[selectedIcon === 'bxs-moon' ? 'add' : 'remove'](iconTheme)
}

// Activate / deactivate the theme manually with the button
themeButton.addEventListener('click', () => {
    // Add or remove the dark / icon theme
    document.body.classList.toggle(darkTheme)
    themeButton.classList.toggle(iconTheme)
    // We save the theme and the current icon that the user chose
    localStorage.setItem('selected-theme', getCurrentTheme())
    localStorage.setItem('selected-icon', getCurrentIcon())
})

// Call the updateAgenda function with the read data to initially populate the agenda
updateAgenda(agendaItems);

// Update the agenda every minute (adjust the interval as needed)
/*setInterval(function () {
    updateAgenda(agendaItems);
}, 60000); // 60000 milliseconds = 1 minute
*/

    // Update the agenda every minute (adjust the interval as needed)
//    setInterval(updateAgenda, 60000); // 60000 milliseconds = 1 minute

    function performSearch() {
        // Récupère les valeurs du formulaire
        var query = document.getElementById('searchQuery').value;
        var engine = document.getElementById('searchEngine').value;

        // Redirige l'utilisateur vers le moteur de recherche sélectionné avec la requête de recherche
        switch (engine) {
            case 'google':
                window.location.href = 'https://www.google.com/search?q=' + encodeURIComponent(query);
                break;
            case 'bing':
                window.location.href = 'https://www.bing.com/search?q=' + encodeURIComponent(query);
                break;
            case 'yahoo':
                window.location.href = 'https://search.yahoo.com/search?p=' + encodeURIComponent(query);
                break;
            case 'duckduckgo':
                window.location.href = 'https://duckduckgo.com/?q=' + encodeURIComponent(query);
                break;
            case 'ask':
                window.location.href = 'https://www.ask.com/web?q=' + encodeURIComponent(query);
                break;
            // Ajoutez d'autres cas pour d'autres moteurs de recherche
            default:
                break;
        }
    }
