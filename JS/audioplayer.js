// variables / constants

// array of all the songs - song path, image path, name, artist, length (added by onload function)
const songs = [
                ["/music/My_Love_is_Sick.mp3","/Images/songs/My_Love_is_Sick.png","My Love is Sick","Madds Buckley"],
                ["/music/Pain.mp3","/Images/songs/Pain.png","Pain","MILGRAM"],
              ]

// FUNCTIONS

// activates on HTML loading
// used to create the songbox
window.onload = function() {

    // gets the tracklist
    const trackList = document.getElementById("songBox__trackList");

    // for the amount of songs do X
    for(let i = 0; i < songs.length; i++) {

        // each loop append the HTML template below
        // the template is the HTML for a tracklist row
        trackList.insertAdjacentHTML("beforeend", `

            <!-- track ${i + 1} row -->
                <div class="songBox__trackList__track U-flexAlignJustify">

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

        // this section adds the data from the songs constant to the track row

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

// TIME FUNCTION
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