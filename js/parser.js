getParse();

function getParse() {

    

    // Parse specific items from the current song 

    // Get the lyrics and chords
    try {
        var song_contents = document.getElementById("text").textContent;
        song_contents = song_contents.split("\n").slice(4).join("\n");
    } catch(err) {
        var song_contents = "";
    }
    
    // Get the URL
    var song_url = window.location.href;

    // Construct filename
    try {
        var title = document.title.split(":")[1];
        var song_name = title.split("-")[0].trim();
        var artist_name = title.split("-").slice(1, -1).join("-").trim();
    } catch(err) {
        var song_name = ""
        var artist_name = "";
    }

    // Get album year and album name
    try {
        var ay_contents = document.querySelector(".til").textContent;
        var album_year = ay_contents.split(" - ")[0].trim();
        var album_name = ay_contents.split(" - ")[1].trim();
    } catch(err) {
        var album_year = "";
        var album_name = "";
    }

    // Get songwriter
    try {
        var song_writer = document.querySelector(".cr").textContent;
    } catch(err) {
        var song_writer = "";
    }

    // Return all the above in an array
    return [song_contents, song_url, album_year, album_name, song_writer, artist_name, song_name];
}