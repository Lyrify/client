$( document ).ready(function() {
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
                        <div class="row">
                            <div class="col s2"><img src="${data[music].album.cover_small}"></div>
                            <div class="col s6">${data[music].title}</div>
                            <div class="col s2">${data[music].artist.name}</div>
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
            for (let artist in data) {

            $(".top-artists").append(`
                <div class="col s3">
                    <img src="${data[artist].picture_medium}">
                </div>
            `);

                console.log(data[artist])
            }
        })
        .fail( err => {
            console.log(err);
        })
}
