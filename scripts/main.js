$( document ).ready(function() {
    showHomepage();
    $('#modal1').modal();
    $("#showDetectedLanguage").hide();
    topCharts();
    topArtists();
    topAlbums();
    console.log( "ready!" );
});
function topCharts(){
    $.ajax('http://localhost:3000/music/top-musics', {
        method: 'GET'
    })
        .done( ({data} ) => {
            for (let music in data) {
                $(".top-charts").append(`
                    <div class="section">
                        <div class="row" onclick="getLyric('${data[music].artist.name}', '${data[music].title}', '${data[music].album.cover_medium}')">
                            <div class="col s1">${data[music].position}</div>
                            <div class="col s2"><img src="${data[music].album.cover_small}"></div>
                            <div class="col s5">${data[music].title}</div>
                            <div class="col s4">${data[music].artist.name}</div>
                        </div>
                        <div class="divider"></div>
                    </div>
                `);
            }
        })
        .fail( err => {
            console.log(err);
        })
}
function topArtists(){
    $.ajax('http://localhost:3000/music/top-artists', {
        method: 'GET'
    })
        .done( ({data}) => {
            for (let i = 0; i < data.length - 1; i++) {
                let name = data[i].name;
                let artwork = data[i].picture_medium
                $(".top-artists").append(`
                    <div class="col s4" onclick="showModal('${name}', '${artwork}')">
                        <img src="${artwork}">
                        <p>${name}</p>
                    </div>
                `);
            }
        })
        .fail( err => {
            console.log(err);
        })
}
function showModal(title, artwork) {
    console.log(title, artwork)
    $(".modal-content").empty()
    $(".modal-content").append(`
        <h3>${title}</h3>
        <img src="${artwork}">
    `);
    $('#modal1').modal('open');
}
function showHomepage() {
    $(".homepage").show();
    $(".lyric-page").hide();
}
function topAlbums(){
    $.ajax('http://localhost:3000/music/top-albums', {
        method: 'GET'
    })
        .done( ({data}) => {
            for (let i = 0; i < data.length - 1; i++) {
                let title = data[i].title;
                let artwork = data[i].cover_medium;
                $(".top-albums").append(`
                    <div class="col s4" onclick="showModal('${title}', '${artwork}')">
                        <img src="${artwork}">
                        <p>${title}</p>
                    </div>
                `);
            }
        })
        .fail( err => {
            console.log(err);
        })
}
function getLyric(artist, track, artwork){
    $.ajax({
        url: 'http://localhost:3000/music/lyric',
        method: 'GET',
        data : {
            artist,
            track
        }
    })
    .done( data => {
        let lyrics = data.lyrics_body;
        lyrics = lyrics.replace(/(?:\r\n|\r|\n)/g, '<br />');
        $(".homepage").hide();
        $(".lyric-section").empty();
        $(".translation-section").empty();
        $(".lyric-section").append(`
            <div>
                ${lyrics}
            </div>
        `);
        console.log(data)
        $(".lyric-header").append(`
            <div class="col s2">
                <img src="${artwork}" class="artwork-lyric">
            </div>
            <div class="col s8">
                <h3>${track}</h3>
                <h5>${artist}</h5>
            </div>
        `);
        $(".lyric-page").show();
        detectLanguage(lyrics);
        getTranslatedLyrics(lyrics);
    })
    .fail(err => {
        console.log(err)
    })
}
function getTranslatedLyrics(str) {
    //let translateTo = $("#translateForm option:selected").text();
    $.ajax({
        method: 'POST',
        url: 'http://localhost:3000/translate',
        headers: {
            "authorization": localStorage.getItem('jwt_token')
        },
        data: { "text": str, "translateTo": "id" }
    })
        .done( (translatedLyrics) => {
            translatedLyrics = translatedLyrics.replace(/(?:\r\n|\r|\n)/g, '<br />');
            $(".translation-section").empty().append(`
                ${ translatedLyrics }
            `);
            }
        )
        .fail( err => {
            console.log(err);
        })
}
function detectLanguage(text) {
    $.ajax({
        method: 'POST',
        url: 'http://localhost:3000/translate/detectlanguage',
        headers: {
            "authorization": localStorage.getItem('jwt_token')
        },
        data: { "text": text }
    })
        .done( (language) => {
            $("#showDetectedLanguage").empty().append(`
                ${ language }
            `);
            }
        )
        .fail( err => {
            console.log(err);
        })
}