//main-variables
var music_title = document.querySelector(".main .up-items .Music-title h2")
var album = document.querySelector(".main .up-items .album p")
var like = document.querySelector(".main .up-items .like i")
var disc_cover = document.querySelector(".main .image img")
var corrent_progress = document.querySelector(".main .up-items .corrent-progress")
var initial_time = document.querySelector("#initial-time")
var final_time = document.querySelector("#final-time")
var shuffle = document.querySelector(".main .down-items .shuffle h3 i")
var preview = document.querySelector(".main .down-items .preview h3 i")
var play_pause = document.querySelector(".main .down-items .play-pause h3 i")
var next = document.querySelector(".main .down-items .next h3 i")
var repeat = document.querySelector(".main .down-items .repeat h3 i")
var Music = document.querySelector(".main .up-items .Music audio")
var progress_container = document.getElementById("progress-container")
var count_click_play = 0
var count_click_like = 0
var count_repeat = 0
var count_click_shuffle = 0
var widthtime;
var pause_icon = document.querySelector(".main .up-items .Music h3 i")
var music_list = []
//End of the variables


//add music in list

gerilson = {
    file: "Gerilson Insrael - Minha Vida",
    artist: "Gerilson Insrael",
    sound: "Minha Vida"
}

cef = {
    file: "Cef Tanzy - Escola",
    artist: "Cef Tanzy",
    sound: "Escola"
}
Hot_Blaze = {
    file: "Hot Blaze - Luta Forte",
    artist: "Hot Blaze",
    sound: "Luta Forte"
}
Nuno_Abdul = {
    file: "So Eu e Tu (feat. Rui Orlando)",
    artist: "Nuno Abdul",
    sound: "So Eu e Tu"
}
Michael_bolton = {
    file: "Stuck on you",
    artist: "Michael_bolton",
    sound: "Stuck on you"
}

var index = 0
music_list = [gerilson, cef, Hot_Blaze, Nuno_Abdul, Michael_bolton]

//End of listing sounds
//alert(music_list[0][0])

function load() {



    disc_cover.src = new Image()
    Music.src = new Audio()
    disc_cover.src = `img/${music_list[index].file}.jpg`
    Music.src = `Music/${music_list[index].file}.mp3`
    music_title.innerText = `${music_list[index].sound}`
    album.innerText = `${music_list[index].artist}`

}

function next_button() {
    load()
    index++
    play_pause.className = "bi bi-pause-circle-fill"
    Music.play()
    if (index > music_list.length - 1) {
        index = 0
        play_pause.className = "bi bi-pause-circle-fill"
        Music.play()
    }

}

function preview_button() {
    load()
    index--
    Music.play()
    play_pause.className = "bi bi-pause-circle-fill"
    if (index < 0) {
        index = music_list.length - 1
        play_pause.className = "bi bi-pause-circle-fill"
        Music.play()
    }


}

function shuffle_button() {
    //alert(music_list[index].artist)
    count_click_shuffle++
    if (count_click_shuffle % 2 == 0) {
        shuffle.style.color = "white"
    }
    else {
        shuffle.style.color = "red"
        shuffliling(music_list)
    }
}




function shuffliling(param_shuffle) {
    for (let i = param_shuffle.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        [param_shuffle[i], param_shuffle[j]] = [param_shuffle[j], param_shuffle[i]]

    } return param_shuffle
}
//addEventListener("load", shuffliling)






function play() {
    Music.play()
    count_click_play++
    Music.play()
    play_pause.className = "bi bi-pause-circle-fill"
    if (count_click_play % 2 == 0) {
        Music.pause()
        play_pause.className = "bi bi-play-circle-fill"
    }
    else {
        Music.play()
        play_pause.className = "bi bi-pause-circle-fill"
    }

}

function like_button() {
    count_click_like++
    like.className = "bi bi-heart-fill"
    like.style.color = "red"
    if (count_click_like % 2 == 0) {
        like.className = "bi bi-heart"
        like.style.color = "white"
    }
    else {
        like.className = "bi bi-heart-fill"
        like.style.color = "red"
     }
}






function repeat_button() {

    count_repeat++

    repeat.className = "bi bi-repeat-1"
    repeat.style,color="red"
    if (count_repeat % 2 == 0) {
        repeat.className = "bi bi-repeat"
        repeat.style.color = "white"
    }
    else {
        repeat.className = "bi bi-repeat-1"
        repeat.style.color = "red"
    }
}



function time_progress(param_progress) {
    widthtime = (Music.currentTime / Music.duration) * 100
    corrent_progress.style.setProperty("--progress", `${widthtime}%`)
    //corrent_progress.style.width="100%"
    if (widthtime >= 100 && repeat.className === "bi bi-repeat") {

        load()
        index++
        Music.play()
    }
    else if (Music.currentTime == Music.duration && repeat.className === "bi bi-repeat-1") {
        Music.play()
        

    }
    return widthtime
}


function Time_container() {
    var Music_duration = Music.duration
    var Music_Current_Time = Math.floor(Music.currentTime)
    var getMinute_duration = Math.floor(Music_duration / 60)
    var getSecond_duration = Math.floor(Music_duration % 60)
    var getMinute_Current = Math.floor(Music.currentTime / 60)
    var getSecond_Current = Math.floor(Music_Current_Time % 60)

    if (Music.currentTime>59) {
        initial_time.innerText=`0${getMinute_Current}:${getSecond_Current}`
    }
    else {
        initial_time.innerText = `00:${Music_Current_Time}`
    }
        final_time.innerText = `${getMinute_duration}:${getSecond_duration}`
    
}
setInterval(Time_container, 1000)


//jump the progress bar
function jumpTo() {
    var width = progress_container.clientWidth
    var click_width = event.offsetX
    var jumpTo_time = (click_width / width) * Music.duration
    Music.currentTime = jumpTo_time
}

function Save_Shuffle() {
    localStorage.setItem("Saved_Shuffle", shuffle_button)
}


addEventListener("load",Save_Shuffle)
addEventListener("load", time_progress)
shuffle.addEventListener("click", shuffle_button)
addEventListener("load", load)
next.addEventListener("click", next_button)
preview.addEventListener("click", preview_button)
Music.addEventListener("timeupdate", time_progress)
progress_container.addEventListener("click", jumpTo)

/*function add_music_list() {
    var pos = 1
    for (let index = 0; index < 5; index++) {
        music_list[index] = new Audio()
        music_list[index].src = `Music/aud${pos}.mp3`
        pos++

    }
}*/


//play_pause.addEventListener("click", add_music_list)
//addEventListener("click", control)
//addEventListener("click", play)