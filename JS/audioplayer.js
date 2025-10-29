// ----- VARIABLES / CONSTANTS -----

// array of all the songs - song path, image path, name, artist, length (added by onload function)
const songs = [
                ["/music/Nobody.mp3","/Images/songs/Nobody.png","Nobody","Mitski"],
                ["/music/Ice_Water.mp3","/Images/songs/Ice_Water.png","Ice Water","Rebecca Sugar"],
                ["/music/Me_and_Mr_Wolf.mp3","/Images/songs/Me_and_Mr_Wolf.png","Me and Mr Wolf","The Real Tuesday Weld"],
                ["/music/Mi_Vida_Loca.mp3","/Images/songs/Mi_Vida_Loca.png","Mi Vida Loca","ALNST"],
                ["/music/Sunburn.mp3","/Images/songs/Sunburn.png","Sunburn","The Living Tombstone"],
                ["/music/World.execute(me).mp3","Images/songs/World.execute(me).png","World.execute(me)","Mili"],
                ["/music/Everlasting_Fun.mp3","/Images/songs/Everlasting_Fun.png","Everlasting Fun","LongestSoloEver"],
                ["/music/Butcher_Vanity.mp3","/Images/songs/Butcher_Vanity.png","Butcher Vanity","Flavour Foley"],
                ["/music/LoveMeX3.mp3","/Images/songs/LoveMeX3.png","愛して愛して愛して","ADO"],
                ["/music/Pain.mp3","/Images/songs/Pain.png","ペイン","MILGRAM"],
                ["/music/Deathly_Loneliness_Attacks.mp3","/Images/songs/Deathly_Loneliness_Attacks.png","Deathly Loneliness Attacks","SirHamnet"],
                ["/music/My_Love_is_Sick.mp3","/Images/songs/My_Love_is_Sick.png","My Love is Sick","Madds Buckley"],
                ["/music/The_Subway.mp3","/Images/songs/The_Subway.png","The Subway","Chappell Roan"],
                ["/music/Where_I_Go.mp3","/Images/songs/Where_I_Go.png","Where I Go","Lydia the Bard"],
                ["/music/Being_Human.mp3","/Images/songs/Being_Human.png","Being Human","Emily King"],
              ];

const songBar = document.getElementById("songBar")
const soundBar = document.getElementById("soundBar");

let currentSongIndex = null;
let currentSong = null;
let trackRow = null;
let repeatMode = "repeat"
let volumeTracker = 1;
let isSeeking = false;



// ----- ANON FUNCTIONS -----

// --- ONLOAD ---

// activates on HTML loading
// used to create the songbox tracks
window.onload = function() {

    // gets the tracklist
    const trackList = document.getElementById("songBox__trackList");

    // for the amount of songs do X
    for(let i = 0; i < songs.length; i++) {

        // each loop append the HTML template below
        // the template is the HTML for a tracklist row
        trackList.insertAdjacentHTML("beforeend", `

            <!-- track ${i} row -->
                <div class="songBox__trackList__track U-flexAlignJustify" data-index=${i}>

                    <!-- Song id in the the list -->
                    <div class="U-flexAlignJustify U-songBoxColID">

                        <p>${i + 1}</p>

                    </div>

                    <!-- creates the image for the track -->
                    <div class="U-flexAlignJustify U-songBoxColImage">

                        <!-- container for the image -->
                        <div class="songBox__trackList__track__image__container">

                            <img src="/Images/songs/NONE.png" id="track${i}__image">

                        </div>

                    </div>

                    <!-- name of the track -->
                    <div class="U-flexAlign U-songBoxColText">

                        <p id="track${i}__name">Name</p>

                    </div>

                    <!-- name of the artist for the track -->
                    <div class="U-flexAlign U-songBoxColText">

                        <p id="track${i}__artist">Artist</p>

                    </div>

                    <!-- length of the track -->
                    <div class="U-flexAlign U-songBoxColTime">

                        <p id="track${i}__length">0:00</p>

                    </div>

                </div>

            `)

        // image section
        let trackImage = document.getElementById(`track${i}__image`);
        trackImage.src = songs[i][1];

        // name section 
        let trackName = document.getElementById(`track${i}__name`);
        trackName.innerHTML = songs[i][2];

        // artist section
        let trackArtist = document.getElementById(`track${i}__artist`);
        trackArtist.innerHTML = songs[i][3];

        // get the audio for song being added
        let audio = new Audio(songs[i][0]);

        // ensures function only happens once songs are loaded
        audio.onloadedmetadata = function() {

            // gets the length of the song
            let Length = formatTime(audio.duration);
            songs[i].push(Length);

            // Length section
            let trackLength = document.getElementById(`track${i}__length`)
            trackLength.innerHTML = songs[i][4];

        };

    };

};



// --- MAIN CONTENT ---

// activates when a track is selected
document.getElementById("songBox__trackList").onclick = function(e) {

    // checks which track has been selected -
    // works by using the selected element and working up the nested list
    // to find the id mentioned below
    const trackRow = e.target.closest(".songBox__trackList__track");

    // if a row has been selected continue into the if
    if (trackRow) {

        // gets the index of the track
        const newIndex = Number(trackRow.dataset.index);

        // activates if a new song is selected
        if (currentSong && currentSongIndex != newIndex) {

            // pause previous song and set current time to 0
            currentSong.pause();
            currentSong.currentTime = 0;

            // get the song via the index and play the song
            currentSongIndex = newIndex;
            songChangeHandler();
            document.getElementById("playButton").src = "/Images/buttons/pause.png";
            currentSong.play();

        }

        // If the same song is selected
        else if (currentSong && currentSongIndex === newIndex) {

            // checks if the song should be paused or unpaused
            if (currentSong.paused) {

                // play if paused
                document.getElementById("playButton").src = "/Images/buttons/pause.png";
                currentSong.play();
            
            } 

            else {

                // pause if playing
                document.getElementById("playButton").src = "/Images/buttons/play.png";
                currentSong.pause();

            };

        }

        // if a song hasent been loaded yet
        else {

            // get the current index
            currentSongIndex = newIndex;
            songBar.disabled = false
            songChangeHandler();

            // activate footer buttons
            document.getElementById("playButton").src = "/Images/buttons/pause.png";
            document.getElementById("playButton").classList.add("buttonActive");

            document.getElementById("previousButton").src = "/Images/buttons/previous.png";
            document.getElementById("previousButton").classList.add("buttonActive");

            document.getElementById("nextButton").src = "/Images/buttons/next.png";
            document.getElementById("nextButton").classList.add("buttonActive");

            document.getElementById("repeatButton").src = "/Images/buttons/repeat.png";
            document.getElementById("repeatButton").classList.add("buttonActive");

            // play the selected song
            currentSong.play();

        };

    };

};



// --- FOOTER ---

// pause / unpause the song
document.getElementById("playButton").onclick = function() {

    // if a song has been loaded
    if (currentSong) {

        // if the song is paused, unpause it
        if (currentSong.paused) {

            document.getElementById("playButton").src = "/Images/buttons/pause.png";
            currentSong.play();

        }

        // if song is playing pause it
        else {

            document.getElementById("playButton").src = "/Images/buttons/play.png";
            currentSong.pause();

        };

    };

};

// change track to the previous song if the song is <= 3 seconds into the track
// otherwise return to start of the song
document.getElementById("previousButton").onclick = function() {

    // if current song has been loaded
    if (currentSong) {

        // if the song is <= 3 seconds into the song
        if (currentSong.currentTime <= 3) {

            // resets the song
            currentSong.pause();
            currentSong.currentTime = 0;

            // decreases the index accounting for underflow
            currentSongIndex = (currentSongIndex + (songs.length - 1)) % songs.length;

            // loads and plays the new song
            songChangeHandler();
            document.getElementById("playButton").src = "/Images/buttons/pause.png";
            currentSong.play();

        }

        // if the song is over 3 seconds into the track reset track
        else {

            currentSong.currentTime = 0;

        };

    };

};

// switch to the next song on the list
document.getElementById("nextButton").onclick = function() {

    // if current song has been loaded
    if (currentSong) {

        // resets the song
        currentSong.pause();
        currentSong.currentTime = 0;

        // increases the index accounting for overflow
        currentSongIndex = (currentSongIndex + 1) % songs.length;

        // loads and plays the new song
        songChangeHandler();
        document.getElementById("playButton").src = "/Images/buttons/pause.png";
        currentSong.play();

    };

};

// switch the repeat mode upon clicking the repeat button
document.getElementById("repeatButton").onclick = function() {

    // if a song has been loaded
    if (currentSong) {

        // repeat --> one
        if (repeatMode == "repeat") {

            document.getElementById("repeatButton").src = "/Images/buttons/repeat-one.png";
            repeatMode = "one";

        }

        // one --> none
        else if (repeatMode == "one") {

            document.getElementById("repeatButton").src = "/Images/buttons/repeat-none.png";
            repeatMode = "none";

        }

        // none --> repeat
        else {

            document.getElementById("repeatButton").src = "/Images/buttons/repeat.png";
            repeatMode = "repeat";

        };

    };

};

// function that controls the volume
soundBar.oninput = function() {

    // only lets bar directly control volume if its been loaded
    if (currentSong) {

        currentSong.volume = soundBar.value / 100;

    };

    // stores the volume for song changes to
    // maintain consistent volume
    volumeTracker = soundBar.value / 100

};

// --- SEEKBAR FUNCTIONS ---

// when the song bar is being interacted with
songBar.oninput = function() {

    isSeeking = true;

};

// when th eusr has picked a position in the songbar
songBar.onchange = function() {
    
    //set position to the time in song
    currentSong.currentTime = songBar.value;
    isSeeking = false;

}

// ----- CALLED FUNCTIONS -----

// gets the current time in the track
function currentTimeHandler() {

    // gets current time and displays it in footer
    trackCurrentTime = currentSong.currentTime;
    document.getElementById("footerCurrentTime").innerHTML = formatTime(trackCurrentTime)

    if(!isSeeking) {
        songBar.value = Math.floor(currentSong.currentTime)
    }
};

// changes static elements in the footer
function staticFooterChange() {

    //displays total track length and name of the song in the footer
    document.getElementById("footerTotalTime").innerHTML = songs[currentSongIndex][4]
    document.getElementById("footerCurrentSong").innerHTML = songs[currentSongIndex][2]

}

// handles repeating
function repeatHandler() {
    
    // repeat mode = repeat
    if (repeatMode == "repeat") {
        
        // resets the song
        currentSong.pause();
        currentSong.currentTime = 0;

        // increases the index accounting for overflow
        currentSongIndex = (currentSongIndex + 1) % songs.length;

        // loads and plays the new song
        songChangeHandler();
        document.getElementById("playButton").src = "/Images/buttons/pause.png";
        currentSong.play();

    }

    // repeat mode = one
    else if (repeatMode == "one") {

        // resets the song
        currentSong.currentTime = 0;
        currentSong.play();

    }

    // repeat mode = none
    else {

        // shows that the song has ended
        document.getElementById("playButton").src = "/Images/buttons/play.png";

    };

};

// adds styling to the current track being played
function activateRow() {

    //in every instance of a track ensure it has trackActive removed
    document.querySelectorAll(".songBox__trackList__track").forEach(track => {

        track.classList.remove("trackActive");

    });

    // find active track
    const activeTrack = document.querySelector(`.songBox__trackList__track[data-index="${currentSongIndex}"]`);

    //add trackActive to current track
    if (activeTrack) {

        activeTrack.classList.add("trackActive");
    
    };

};

// loads all functions with the new current song and sets footer elements with it
function songChangeHandler() {

    // load audio
    currentSong = new Audio(songs[currentSongIndex][0]);

    // sets correct repeat mode
    currentSong.onended = repeatHandler;

    // keeps track of position in song
    currentSong.ontimeupdate = currentTimeHandler;

    // sets the max value of the Songbar
    currentSong.onloadedmetadata = function() {

        songBar.max = Math.floor(currentSong.duration);

    };

    // updates elements in the footer
    staticFooterChange();

    // ensures volume dosent reset to max
    
    currentSong.volume = volumeTracker;

    // correctly applies styling to the active song
    activateRow()
};

// formats time to a human readable number
function formatTime(secs) {
    let hours = Math.floor(secs / 3600);
    let minutes = Math.floor((secs - (hours * 3600)) / 60);
    let seconds = Math.floor((secs - (hours * 3600)) - minutes * 60);
    if (hours < 10) {
        hours = "0" + hours;
    }
    if (seconds < 10) {
        seconds = "0" + seconds;
    }
    if (hours > 0) {
        if (minutes < 10) {
            minutes = "0" + minutes;
        }
        return hours + ":" + minutes + ":" + seconds;
    } else {
        return minutes + ":" + seconds;
    }
}