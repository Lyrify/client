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