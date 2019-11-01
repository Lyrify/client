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
