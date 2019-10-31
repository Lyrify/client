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
                    <div class="col s4"><img src="${data[i].picture_medium}"></div>
                `);
            }
        })
        .fail( err => {
            console.log(err);
        })
}