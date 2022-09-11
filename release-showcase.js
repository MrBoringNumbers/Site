var track_index = 0
var PlaylistData = ''
var FeaturedAlbums = []
var Albums = []
var Ids = []
const rotationSpeed = 10
const timeout = 10

const AlbumImgTop = document.getElementById('Release_Showcase_Album_Image_Top')
const AlbumImgBtm = document.getElementById('Release_Showcase_Album_Image_Bottom')
const BgImgTop = document.getElementById('Release_Showcase_Background_Image_Top')
const BgImgBtm = document.getElementById('Release_Showcase_Background_Image_Bottom')

if (window.ImageSupport) {AlbumImgTop.src = AlbumImgBtm.src = BgImgTop.src = BgImgBtm.src = './assets/placeholder.webp'}

const AlbumLnk = document.getElementById('Release_Showcase_Album_Link')
const AlbumTitle = document.getElementById('Release_Showcase_Album_Title')
const AlbumArtist = document.getElementById('Release_Showcase_Album_Artist')

const Latest_Releases_Title = document.getElementById('Latest_Releases_Title')
const ListenNow = document.getElementById('Listen_Now_Btn')
const OtherPlatforms = document.getElementById('Other_Platforms_Btn')
const Listen_Now_Container = document.getElementById('Listen_Now_Container')

const detailsAlbumImg = document.getElementById('Details_Album_Img')
const detailsAlbumName = document.getElementById('Details_Album_Name')
const detailsAlbumArtist = document.getElementById('Details_Album_Artist')
const detailsAlbumTracks = document.getElementById('Details_Album_Tracks')
const detailsAlbumDate = document.getElementById('Details_Album_Date')

const platformsLoading = document.getElementById('Platforms_Loading')
const date_options = {year: 'numeric', month: 'short', day: 'numeric'};
var stores_xhr = new XMLHttpRequest();

const platforms = {
    "spotify": document.getElementById('spotify'),
    "appleMusic": document.getElementById('applemusic'),
    "youtubeMusic": document.getElementById('ytmusic'),
    "tidal": document.getElementById('tidal'),
    "deezer": document.getElementById('deezer'),
    "pandora": document.getElementById('pandora'),
    "youtube": document.getElementById('youtube'),
    "napster": document.getElementById('napster'),
}


function ShowDetails(index) {
    // Set Metadata
    detailsAlbumImg.src = Albums[index].images[0].url
    detailsAlbumName.innerHTML = Albums[index]["name"]
    detailsAlbumArtist.innerHTML = Albums[index].artists[0]["name"]
    detailsAlbumTracks.innerHTML = `${Albums[index]["total_tracks"]} Tracks`
    detailsAlbumDate.innerHTML = `Released on ${(new Date(Albums[index]["release_date"])).toLocaleDateString('en-US', date_options)}`

    platformsLoading.style.display = 'block'
    document.getElementById('Album_Details').style.display = 'flex'

    var stores_xhr = new XMLHttpRequest();
    stores_xhr.open("GET", `https://script.google.com/macros/s/AKfycbzxf5AqK7CWLMk6inSQoqCb0YfCqouQxs0G0cPU7F8BacoCEnGE/exec?url=${Albums[index].external_urls["spotify"]}`);
    stores_xhr.timeout = timeout*1000

    stores_xhr.onload = function() {
        store_links = JSON.parse(stores_xhr.responseText)["links"]
        platformsLoading.style.display = 'none'
        for (const [key, value] of Object.entries(store_links)) {
            try {
                platforms[key].href = value['url']
                platforms[key].style.display = 'block'
            }
            catch {}
        }
    }

    stores_xhr.ontimeout = function() {
        console.log('Timeout')
    }

    stores_xhr.send();

    SetTickerDurations()
}

function HideDetails() {
    stores_xhr.abort()
    document.getElementById('Album_Details').style.display = 'none'
    for (const [key, value] of Object.entries(platforms)) {
      value.style.display = 'none'
    }
    console.log('Hidden')
}


function FeaturedOrder() {
    console.log('reorder: latest')
    Albums = FeaturedAlbums.slice()
    Fill_All_Releases()
}
function LatestOrder() {
    console.log('reorder: latest')
    Albums.sort((a,b) => new Date(b["release_date"]) - new Date(a["release_date"]));
    Fill_All_Releases()
}
function ArtistOrder() {
    console.log('reorder: artist')
    Albums.sort((a,b) => a.artists[0]["name"].localeCompare(b.artists[0]["name"]));
    Fill_All_Releases()
}
function AlbumOrder() {
    console.log('reorder: album')
    Albums.sort((a,b) => a["name"].localeCompare(b["name"]));
    Fill_All_Releases()
}


function RotateShowcase() {
    AlbumLnk.href = Albums[track_index].external_urls["spotify"]
    ListenNow.href = AlbumLnk.href
    AlbumTitle.innerHTML = Albums[track_index]["name"]
    AlbumArtist.innerHTML = Albums[track_index].artists[0]["name"]

    OtherPlatforms.setAttribute('onclick', `ShowDetails(${track_index})`);

    AlbumImgTop.src = AlbumImgBtm.src
    AlbumImgBtm.src = Albums[track_index].images[0].url
    BgImgTop.src = BgImgBtm.src
    BgImgBtm.src = Albums[track_index].images[0].url

    AlbumImgTop.style.animation = ''
    BgImgTop.style.animation = ''
    AlbumImgTop.offsetWidth
    BgImgTop.offsetWidth
    AlbumImgTop.style.animation = 'crossfade 1200ms ease forwards'
    BgImgTop.style.animation = 'crossfade 1200ms ease forwards'

    track_index = (track_index + 1) % Albums.length
    setTimeout(RotateShowcase, rotationSpeed*1000)
}


function Fill_All_Releases() {
    const allReleases = document.getElementById('All_Releases')
    allReleases.innerHTML = ''

    Albums.forEach(function (item, index) {
        var entry = document.createElement("div");
        var image = document.createElement("img");
        image.src = item.images[0].url
        image.setAttribute('onclick', 'ShowDetails(' + index + ')');

        var albumName = document.createElement("div");
        var artistName = document.createElement("div");
        albumName.innerHTML = item["name"]
        artistName.innerHTML = item.artists[0]["name"]
        albumName.classList.add('Title_1', 'Grid_Album_Name')
        artistName.classList.add('Title_1', 'Grid_Artist_Name')

        // Text Links
        var albumLnk = document.createElement("a");
        var artistLnk = document.createElement("a");
        albumLnk.href = item.external_urls["spotify"]
        albumLnk.target = "_blank"
        albumLnk.rel = "noopener noreferrer"
        artistLnk.href = item.artists[0].external_urls["spotify"]
        artistLnk.target = "_blank"
        artistLnk.rel = "noopener noreferrer"
        albumTickerCont = document.createElement("div")
        artistTickerCont = document.createElement("div")
        albumTickerCont.appendChild(albumName)
        artistTickerCont.appendChild(artistName)
        albumLnk.appendChild(albumTickerCont)
        artistLnk.appendChild(artistTickerCont)

        // Image Links
        //var imageLnk = document.createElement("a");
        //imageLnk.href = item.external_urls["spotify"]
        //imageLnk.target = "_blank"
        //imageLnk.rel = "noopener noreferrer"
        //imageLnk.appendChild(image)

        albumLnk.classList.add('Ticker')
        artistLnk.classList.add('Ticker')

        entry.appendChild(image)
        entry.appendChild(albumLnk)
        entry.appendChild(artistLnk)
        entry.classList.add('Grid_Album_Container')
        
        allReleases.appendChild(entry)
    })

    SetTickerDurations()
}


function FetchPlaylist(token) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", 'https://api.spotify.com/v1/playlists/0U7TnsY3xNeMtHYT5aOr6s');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('Authorization', 'Bearer ' + token);
    xhr.timeout = timeout*1000

    xhr.onload = function() { 
        if (xhr.readyState == 4 && xhr.status == 200) {
            PlaylistData = JSON.parse(xhr.responseText).tracks["items"]

            PlaylistData.forEach(function (item, index) {
              if (!Ids.includes(item.track.album["id"])) {
                Ids.push(item.track.album["id"])
                item.track.album["name"] = item.track.album["name"].replace(' (SixtySevenRadio)', '').replace(' (SixtySevenRadio Edit)', '')
                FeaturedAlbums.push(item.track["album"])
              }
            });

            Albums = FeaturedAlbums.slice()

            console.log(Albums)
            RotateShowcase()

            Listen_Now_Container.style.visibility = 'visible'
            Listen_Now_Container.style.opacity = '1'
            Latest_Releases_Title.style.opacity = '1'

            Fill_All_Releases()
            document.getElementById('r1-1').checked = true;
        }
    }

    xhr.ontimeout = function() { 
        AlbumTitle.innerHTML = 'Hmmm...'
        AlbumArtist.innerHTML = 'try reloading the page.'
    }

    xhr.send();
}


var xhr = new XMLHttpRequest();
xhr.open("POST", 'https://accounts.spotify.com/api/token');
xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
xhr.setRequestHeader('Authorization', 'Basic MTFkNjZhOTg4ODFhNDJkNWFkOTcyN2QyODc0YmQ0ZGY6YzJhZjNlZWZjNGM3NDE1MmE0ZWQ4MTMwMTYzYjdiZjI=');
xhr.timeout = timeout*1000

function ErrorMessage() {
    AlbumTitle.innerHTML = 'Hmmm...'
    AlbumArtist.innerHTML = 'try reloading the page.'
}

xhr.ontimeout = ErrorMessage
xhr.onerror = ErrorMessage

xhr.onreadystatechange = function() {
    if (xhr.readyState==4) {
        if (xhr.status==200) {
            FetchPlaylist(JSON.parse(xhr.responseText)["access_token"])
        } else {
            ErrorMessage()
        }
    }
}

xhr.send('grant_type=client_credentials');