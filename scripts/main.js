$( document ).ready(function() {
    topCharts();
    topArtists();
    getLyric();
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
                        <div class="row">
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
                    <div class="col s4">
                        <img src="${data[i].picture_medium}">
                        <p>${data[i].name}</p>
                    </div>
                `);
            }
        })
        .fail( err => {
            console.log(err);
        })
}

function getLyric(){
    $.ajax({
        url: 'http://localhost:3000/music/lyric',
        method: 'GET',
        params : {
            artist : "Selena Gomez",
            track: "Lose You To Love Me"
        }
    })
    .done(({data}) => {
        console.log('masuk sini')
        console.log(data)
    })
    .fail(err => {
        console.log(err)
    })
}



//AJAX untuk Translate Lyrics
function getTranslatedLyrics(text, translateTo) {
    $.ajax({
        method: 'GET',
        url: 'http://localhost:3000/translate',
        headers: {
            "authorization": localStorage.getItem('jwt_token')
        },
        data: { "text": text, "translateTo": translateTo }
    })
        .done( ({ translatedLyrics }) => {
            $(".showTranslatedLyrics").empty().append(`
                <p> ${ translatedLyrics } </p>
            `);
            }
        )
        .fail( err => {
            console.log(err);
        })
}

//AJAX untuk deteksi language
function detectLanguage(text) {
    $.ajax({
        method: 'GET',
        url: 'http://localhost:3000/translate/detectlanguage',
        headers: {
            "authorization": localStorage.getItem('jwt_token')
        },
        data: { "text": text }
    })
        .done( ({ language }) => {
            $(".showDetectedLanguage").empty().append(`
                ${ language }
            `);
            }
        )
        .fail( err => {
            console.log(err);
        })
}

//AJAX Sign-In biasa
function signIn() {
    let username = $("#username").val().trim();
    let password = $("#password").val().trim();

  $.ajax({
        method: 'POST',
        url: 'http://localhost:3000/user/login',        //EDIT INI !
        data: {
            "username": username,
            "password": password                    //EDIT INI !
        }
    })
    .done(( response ) => {
        localStorage.setItem('jwt_token', response.token);
        $( '#loginPage' ).hide();        // !
        $( '#afterLoginPage').show();    // !
    })
    .fail( err => {
        console.log(err);
    })
}

function googleLogIn( googleUser ) {
  let profile = googleUser.getBasicProfile();
  let id_token = googleUser.getAuthResponse().id_token;

    $.ajax({
        method: 'POST',
        url: 'http://localhost:3000/google-signin',    //cek lagi
        data: {
            tokenId: id_token
        }
    })
    .done( (response) => {
        localStorage.setItem('jwt_token', res.token);
        login_type = 'google';
        $( '#loginPage' ).hide();        // !
        $( '#afterLoginPage').show();    // !
        $( '#googleSignOut').show();    // !
    })
}

//AJAX Google Sign-Out
function googleSignOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
    });
    localStorage.removeItem('jwt_token');
    $( '#afterLoginPage').hide();        // !
    $( '#loginPage' ).show();            // !
}

//AJAX Sign-Out
function signOut() {
    localStorage.removeItem('jwt_token');
    $( '#afterLoginPage').hide();        // !
    $( '#loginPage' ).show();            // !
}

function savePlaylist() {
    $.ajax({
        method: 'POST',
        url: 'http://localhost:3000/user/playlist/',    //cek lagi
        headers: {
            "authorization": localStorage.getItem('jwt_token')
        },
        data: {
            "songTitle": songTitle
        }
    })
    .done( ( response ) => {
        $( '#modal' ).modal('show');
    })
    .fail( ( err ) => {
        console.log(err);
    })
}

function showPlaylist() {
    $.ajax({
        method: 'GET',
        url: 'http://localhost:3000/user/playlist/',    //cek lagi
        headers: {
            "authorization": localStorage.getItem('jwt_token')
        },
        data: {
            "songTitle": songTitle
        }
    })
    .done( ( response ) => {    //array of object
        $( '#translatePage' ).hide();
        $( '#playlistPage' ).show();
        for(let i=0; i<response.length; i++) {
            $( '#playlistPage' ).empty().append(`
                <p> response.name </p> <p> response. </p>
            `)
        }
    })
    .fail( ( err ) => {
        console.log(err);
    })
}

