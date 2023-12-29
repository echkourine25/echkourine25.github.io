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
    function updateAgenda() {
        var agendaItems = [
            { dateTime: '2023-01-01T09:00:00', event: 'New Year\'s Meeting' },
            { dateTime: '2023-01-15T12:30:00', event: 'Lunch Break' },
            { dateTime: '2023-12-29T10:00:00', event: 'Team Meeting' },
            // Add more agenda items as needed
        ];

        var agendaBody = document.getElementById('agendaBody');
        agendaBody.innerHTML = ''; // Clear existing content

        var hours = Array.from({ length: 24 }, (_, i) => i); // Create an array from 0 to 23 representing hours

        hours.forEach(hour => {
            var newRow = agendaBody.insertRow();
            newRow.insertCell(0).textContent = hour + ':00'; // Time column

            for (var day = 1; day <= 5; day++) {
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

    // ... existing code ...

    // Call the updateAgenda function to initially populate the agenda
    updateAgenda();

    // Update the agenda every minute (adjust the interval as needed)
    setInterval(updateAgenda, 60000); // 60000 milliseconds = 1 minute

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
