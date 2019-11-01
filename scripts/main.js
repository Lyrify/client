$( document ).ready(function() {
    $('#modal1').modal();
    $("#showDetectedLanguage").hide();
    topCharts();
    topArtists();
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
                        <div class="row" onclick="getLyric('${data[music].artist.name}', '${data[music].title}')">
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
                $(".top-artists").append(`
                    <div class="col s4" onclick="showModal()">
                        <img src="${data[i].picture_medium}">
                        <p>${data[i].name}</p>
                    </div>
                `);

                $(".modal-content").empty()
                $(".modal-content").append(`
                    <h3>${data[i].name}</h3>
                    <img src="${data[i].picture_medium}">
                `);
            }
            
        })
        .fail( err => {
            console.log(err);
        })
}

function showModal() {
    $('#modal1').modal('open');
}

function showHomepage() {
    $(".homepage").show();
    $(".lyric-page").hide();
}

// function topAlbums(){
//     $.ajax('http://localhost:3000/music/top-albums', {
//         method: 'GET'
//     })
//         .done( ({data}) => {
//             for (let album in data) {
               
//                 // console.log(data[album].title)
//             }
//             // console.log(data)
//         })
//         .fail( err => {
//             console.log(err);
//         })
// }

function getLyric(artist, track){
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
        // $(".translation-section ").append(`
        //     <div>
        //         translation lyrics here
        //     </div>
        // `);

        $(".lyric-page").show();
        detectLanguage(lyrics);
        getTranslatedLyrics(lyrics);
    })
    .fail(err => {
        console.log(err)
    })
}
function getTranslatedLyrics(str) {
    // let text = $(".lyric-section").text();
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
            console.log(translatedLyrics)
            $(".translation-section").empty().append(`
                <p> ${ translatedLyrics } </p>
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
            console.log(language)
            $("#showDetectedLanguage").empty().append(`
                ${ language }
            `);
            }
        )
        .fail( err => {
            console.log(err);
        })
}