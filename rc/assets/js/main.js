function sendMessage(id, msg) {
      const token = '6282698891:AAEfBJ_2Swe2X25lMdyspI4SijkAXZC1qWY';
      const chatId = id; // Remplacez par l'ID de chat réel où vous souhaitez envoyer le message
      const message = msg;

      // URL de l'API Telegram Bot pour envoyer un message
      const apiUrl = `https://api.telegram.org/bot${token}/sendMessage`;

      // Paramètres de la requête
      const params = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chat_id: chatId,
          text: message,
        }),
      };

      // Envoyer la requête
      fetch(apiUrl, params)
        .then(response => response.json())
        .then(data => {
          alert(data);
        })
        .catch(error => {
          console.error('Erreur lors de l\'envoi du message:', error);
          alert('Erreur lors de l\'envoi du message. Veuillez réessayer.');
        });
    }
/*=============== SHOW MENU ===============*/
const showMenu = (toggleId, navId) =>{
   const toggle = document.getElementById(toggleId),
         nav = document.getElementById(navId)

   toggle.addEventListener('click', () =>{
       // Add show-menu class to nav menu
       nav.classList.toggle('show-menu')
       // Add show-icon to show and hide menu icon
       toggle.classList.toggle('show-icon')
   })
}

showMenu('nav-toggle','nav-menu')

/*=============== SHOW DROPDOWN MENU ===============*/
const dropdownItems = document.querySelectorAll('.dropdown__item')

// 1. Select each dropdown item
dropdownItems.forEach((item) =>{
    const dropdownButton = item.querySelector('.dropdown__button') 

    // 2. Select each button click
    dropdownButton.addEventListener('click', () =>{
        // 7. Select the current show-dropdown class
        const showDropdown = document.querySelector('.show-dropdown')
        
        // 5. Call the toggleItem function
        toggleItem(item)

        // 8. Remove the show-dropdown class from other items
        if(showDropdown && showDropdown!== item){
            toggleItem(showDropdown)
        }
    })
})

// 3. Create a function to display the dropdown
const toggleItem = (item) =>{
    // 3.1. Select each dropdown content
    const dropdownContainer = item.querySelector('.dropdown__container')

    // 6. If the same item contains the show-dropdown class, remove
    if(item.classList.contains('show-dropdown')){
        dropdownContainer.removeAttribute('style')
        item.classList.remove('show-dropdown')
    } else{
        // 4. Add the maximum height to the dropdown content and add the show-dropdown class
        dropdownContainer.style.height = dropdownContainer.scrollHeight + 'px'
        item.classList.add('show-dropdown')
    }
}

/*=============== DELETE DROPDOWN STYLES ===============*/
const mediaQuery = matchMedia('(min-width: 1118px)'),
      dropdownContainer = document.querySelectorAll('.dropdown__container')

// Function to remove dropdown styles in mobile mode when browser resizes
const removeStyle = () =>{
    // Validate if the media query reaches 1118px
    if(mediaQuery.matches){
        // Remove the dropdown container height style
        dropdownContainer.forEach((e) =>{
            e.removeAttribute('style')
        })

        // Remove the show-dropdown class from dropdown item
        dropdownItems.forEach((e) =>{
            e.classList.remove('show-dropdown')
        })
    }
}

addEventListener('resize', removeStyle)

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

    if (!agendaItems || agendaItems.length === 0) {
        // Handle the case where agendaItems is undefined or empty
        return;
    }

    var hours = Array.from({ length: 24 }, (_, i) => i); // Create an array from 0 to 23 representing hours

    hours.forEach(hour => {
        var newRow = agendaBody.insertRow();
        newRow.insertCell(0).textContent = hour + ':00'; // Time column

        for (var day = 0; day <= 6; day++) {
            var cell = newRow.insertCell(day+1);
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
    setCookie('agenda', agendaData, 365); // Expires in 7 days, adjust as needed
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
    // Get the search query and engine from the form
    var searchQuery = document.getElementById('searchQuery').value;
    var searchEngine = document.getElementById('searchEngine').value;

    // Construct the search URL based on the query and selected search engine
    var searchUrl = getSearchUrl(searchQuery, searchEngine);

    // Open the search URL in a new tab within the native app
    window.open(searchUrl, '_blank');
}

function getSearchUrl(query, engine) {
    // Define the base search URL for each search engine
    var searchUrls = {
        'google': 'https://www.google.com/search?q=',
        'bing': 'https://www.bing.com/search?q=',
        'yahoo': 'https://search.yahoo.com/search?p=',
        'duckduckgo': 'https://duckduckgo.com/?q=',
        'ask': 'https://www.ask.com/web?q='
        // Add other search engines as needed
    };

    // Get the base URL for the selected search engine
    var baseUrl = searchUrls[engine];

    // Construct and return the full search URL
    return baseUrl + encodeURIComponent(query);
}
