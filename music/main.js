let now_playing = document.querySelector(".now-playing");
let track_art = document.querySelector(".track-art");
let track_name = document.querySelector(".track-name");
let track_artist = document.querySelector(".track-artist");

let playpause_btn = document.querySelector(".playpause-track");
let next_btn = document.querySelector(".next-track");
let prev_btn = document.querySelector(".prev-track");

let seek_slider = document.querySelector(".seek_slider");
let volume_slider = document.querySelector(".volume_slider");
let curr_time = document.querySelector(".current-time");
let total_duration = document.querySelector(".total-duration");

let track_index = 0;
let isPlaying = false;
let updateTimer;

// Create new audio element
let curr_track = document.createElement('audio');

// Define the tracks that have to be played
let track_list = [
 {
    name: "Pumpkin Dance,
    artist: "",
    image: "/music/pie.jpg",
    path: "https://echkourine25.github.io/music/Pumpkin Dance 03-11-2022 20-24_1.wav"
  },
  {
    name: "Enthusiast",
    artist: "Tours",
    image: "https://images.pexels.com/photos/3100835/pexels-photo-3100835.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=250&w=250",
    path: "https://files.freemusicarchive.org/storage-freemusicarchive-org/music/no_curator/Tours/Enthusiast/Tours_-_01_-_Enthusiast.mp3"
  },
  {
    name: "Shipping Lanes",
    artist: "Chad Crouch",
    image: "https://images.pexels.com/photos/1717969/pexels-photo-1717969.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=250&w=250",
    path: "https://files.freemusicarchive.org/storage-freemusicarchive-org/music/ccCommunity/Chad_Crouch/Arps/Chad_Crouch_-_Shipping_Lanes.mp3",
  },
];
function random_bg_color() {

  // Get a number between 64 to 256 (for getting lighter colors)
  let red = Math.floor(Math.random() * 256) + 64;
  let green = Math.floor(Math.random() * 256) + 64;
  let blue = Math.floor(Math.random() * 256) + 64;

  // Construct a color withe the given values
  let bgColor = "rgb(" + red + "," + green + "," + blue + ")";

  // Set the background to that color
  document.body.style.background = bgColor;
}

function loadTrack(track_index) {
  clearInterval(updateTimer);
  resetValues();
  curr_track.src = track_list[track_index].path;
  curr_track.load();

  track_art.style.backgroundImage = "url(" + track_list[track_index].image + ")";
  track_name.textContent = track_list[track_index].name;
  track_artist.textContent = track_list[track_index].artist;
  now_playing.textContent = "PLAYING " + (track_index + 1) + " OF " + track_list.length;

  updateTimer = setInterval(seekUpdate, 1000);
  curr_track.addEventListener("ended", nextTrack);
  random_bg_color();
}

function resetValues() {
  curr_time.textContent = "00:00";
  total_duration.textContent = "00:00";
  seek_slider.value = 0;
}

// Load the first track in the tracklist
loadTrack(track_index);

function playpauseTrack() {
  if (!isPlaying) playTrack();
  else pauseTrack();
}

function playTrack() {
  curr_track.play();
  isPlaying = true;
  playpause_btn.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';
}

function pauseTrack() {
  curr_track.pause();
  isPlaying = false;
  playpause_btn.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';;
}

function nextTrack() {
  if (track_index < track_list.length - 1)
    track_index += 1;
  else track_index = 0;
  loadTrack(track_index);
  playTrack();
}

function prevTrack() {
  if (track_index > 0)
    track_index -= 1;
  else track_index = track_list.length;
  loadTrack(track_index);
  playTrack();
}

function seekTo() {
  let seekto = curr_track.duration * (seek_slider.value / 100);
  curr_track.currentTime = seekto;
}

function setVolume() {
  curr_track.volume = volume_slider.value / 100;
}

function seekUpdate() {
  let seekPosition = 0;

  if (!isNaN(curr_track.duration)) {
    seekPosition = curr_track.currentTime * (100 / curr_track.duration);

    seek_slider.value = seekPosition;

    let currentMinutes = Math.floor(curr_track.currentTime / 60);
    let currentSeconds = Math.floor(curr_track.currentTime - currentMinutes * 60);
    let durationMinutes = Math.floor(curr_track.duration / 60);
    let durationSeconds = Math.floor(curr_track.duration - durationMinutes * 60);

    if (currentSeconds < 10) { currentSeconds = "0" + currentSeconds; }
    if (durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
    if (currentMinutes < 10) { currentMinutes = "0" + currentMinutes; }
    if (durationMinutes < 10) { durationMinutes = "0" + durationMinutes; }

    curr_time.textContent = currentMinutes + ":" + currentSeconds;
    total_duration.textContent = durationMinutes + ":" + durationSeconds;
  }
}
"/music/Downtown Lights 03-11-2022 18-56_7.mp3" type="audio/mp3">
      Your browser does not support the audio element.
    </audio><span>Downtown Lights: Beats by: Andy Brookes</span></li>
  <li>
    <audio controls>
      <source src="/music/Metalstep 03-11-2022 12-16_2.mp3" type="audio/mp3">
        Your browser does not support the audio element.
      </audio>
    <span>MetalStep: Beats by: Andy brookes</span></li>
    <li>
      <audio controls>
      <source src="/music/House Of The Creeps 03-11-2022 11-30_1.mp3" type="audio/mp3">
        Your browser does not support the audio element.
    </audio><span>House Of The Creep: Beats by Synferatu</span>
    </li>
</ul>
<h3>Then: GroovePad</h3>
<ul>
  <li><audio controls>
    <source src="/music/Pumpkin Dance 03-11-2022 20-24_1.wav" type="audio/wav">
      Your browser does not support the audio element.
    </audio><span>Pumpkin Dance: Beats by: Andy Brookes</span></li>
  <li>
    <audio controls>
      <source src="/music/Brooklyn Beats 03-11-2022 21-00_4.wav" type="audio/wav">
        Your browser does not support the audio element.
      </audio>
    <span>Brooklyn beats: Beats by: Andy brookes</span></li><li>
      <audio controls>
      <source src="/music/Trap Core 04-11-2022 02-16_6.wav" type="audio/wav">
        Your browser does not support the audio element.
    </audio><span>Trap Core: Beats by: Tjam</span>
    </li><li><audio controls>
      <source src="/music/Viper Nest 03-11-2022 20-56_3.wav" type="audio/wav">
    Your browser does not support the audio element.
      </audio>
      <span>Viper Nest: Beats by: Synthferatu</span>
    </li>
    <li><audio controls>
      <source src="/music/EDM Evolution 04-11-2022 02-12_5.wav" type="audio/wav">
    Your browser does not support the audio element.
      </audio><span>EDM Evolution: Beats by: Synthferatu</span>
    </li>
    <li><audio controls>
      <source src="/music/House Euphoria 04-11-2022 02-45_8.wav" type="audio/wav">
    Your browser does not support the audio element.
      </audio><span>House Euphoria: Beats by: Tjam</span>
    </li>
    <li><audio controls>
      <source src="/music/Light Speed 04-11-2022 02-55_9.wav" type="audio/wav">
    Your browser does not support the audio element.
      </audio><span>Light Speed: Beats by: Andy Brookes</span>
    </li>
    <li><audio controls>
      <source src="/music/Lo-Fi Lullaby 04-11-2022 02-29_7.wav" type="audio/wav">
    Your browser does not support the audio element.
      </audio><span>Lo-Fi Lullaby: Beats by: Andy Brookes</span>
    </li>
    <li><audio controls>
      <source src="/music/Royal Road Dubstep 04-11-2022 03-00_10.wav" type="audio/wav">
    Your browser does not support the audio element.
      </audio>
    </li>
</ul>
  </div>

</article>

      </div>
    </main><footer class="site-footer h-card">
  <data class="u-url" href="/"></data>

  <div class="wrapper">

    <h2 class="footer-heading">Evgueni CHKOURINE</h2>

    <div class="footer-col-wrapper">
      <div class="footer-col footer-col-1">
        <ul class="contact-list">
          <li class="p-name">Evgueni CHKOURINE</li><li><a class="u-email" href="mailto:echkourine@icloud.com">echkourine@icloud.com</a></li></ul>
      </div>

      <div class="footer-col footer-col-2"><ul class="social-media-list"><li><a href="https://github.com/echkourine25"><svg class="svg-icon"><use xlink:href="/assets/minima-social-icons.svg#github"></use></svg> <span class="username">echkourine25</span></a></li><li><a href="https://www.twitter.com/echkourine"><svg class="svg-icon"><use xlink:href="/assets/minima-social-icons.svg#twitter"></use></svg> <span class="username">echkourine</span></a></li></ul>
</div>

      <div class="footer-col footer-col-3">
        <p>Write an awesome description for your new site here. You can edit this line in _config.yml. It will appear in your document head meta (for Google search results) and in your feed.xml site description.</p>
      </div>
    </div>

  </div>

</footer>
</body>

</html>
