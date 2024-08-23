const container = document.querySelector(".container")
const image = document.querySelector("#music-image")
const title = document.querySelector("#music-details .title")
const singer =document.querySelector("#music-details .singer")
const prev = document.querySelector("#controls #prev")
const play = document.querySelector("#controls #play")
const next = document.querySelector("#controls #next")
const duration = document.querySelector(".times #duration")
const current = document.querySelector(".times #current-time")
const progressBar = document.querySelector(".progress #progress-bar")
const volumeBar = document.querySelector("#volume-bar")
const volume = document.querySelector("#volume")
const openList = document.querySelector(".listopen")
const sarkilar = document.querySelector(".sarkilar")
const ul = document.querySelector(".sarkilistesi .liste")
const quitbtn = document.querySelector(".baslik .quitbtn")



//yeni bir nesne oluşturma ve bu nesne içine değerleri atama fonksiyonları
const player = new MusicPlayer(musicList)

window.addEventListener("load", () =>{
    let music = player.getMusic()
    displayMusic(music)
} )

function displayMusic(music){
    title.innerText = music.title
    singer.innerText = music.singer
    image.src = "img/" + music.img 
    audio.src = "mp3/" + music.file
}

//Müzik başlat,durdur, sonraki müzik , önceki müzik ayarlamaları , ve buton güncellemeleri
play.addEventListener("click" , ()=>{
    const isMusicPlay = container.classList.contains("playing")
    isMusicPlay ? pauseMusic() : playMusic()
} ) 
prev.addEventListener("click" , () =>{
    prevMusic()
})
next.addEventListener("click" , ()=>{
    nextMusic()
})
function prevMusic(){
    player.previous()
    let music = player.getMusic()
    play.classList.add("fa-play")
    play.classList.remove("fa-pause")
    displayMusic(music)
}
function nextMusic(){
    player.next()
    let music = player.getMusic()
    play.classList.add("fa-play")
    play.classList.remove("fa-pause")
    displayMusic(music)
}
function pauseMusic(){
    container.classList.remove("playing")
    play.classList.add("fa-play")
    play.classList.remove("fa-pause")
    audio.pause()
}
function playMusic(){
    container.classList.add("playing")
    play.classList.remove("fa-play")
    play.classList.add("fa-pause")
    audio.play()
}
//Müzik Zaman Hesaplamaları Ve Güncel Değerin Gösterilmesi
function calculate(audiotime){
    const minute = Math.floor(audiotime / 60)
    const second = Math.floor(audiotime % 60)
    const updateSecond = second < 10 ? `0${second}` : `${second}`
    const sonuc = `${minute}:${updateSecond}`
    return sonuc
}

audio.addEventListener("loadedmetadata", () => {
    duration.textContent = calculate(audio.duration)
    progressBar.max = Math.floor(audio.duration)
})

audio.addEventListener("timeupdate",()=>{
    progressBar.value = Math.floor(audio.currentTime)
    current.textContent = calculate(progressBar.value)
})


progressBar.addEventListener("input", ()=>{
    audio.currentTime = progressBar.value

}
)
let soundcheck = "open"

volumeBar.addEventListener("input" , (e)=>{
    const volumeValue = e.target.value
    audio.volume = volumeValue/100
    if(volumeValue ==0 ){
        audio.muted=true
        soundcheck = "muted"
        volume.classList = "fa-solid fa-volume-xmark"
    }
    else{
            audio.muted = false
            soundcheck = "open"
            volume.classList = "fa-solid fa-volume-off"
        }
    
})
volume.addEventListener("click" ,()=>{
    if(soundcheck === "open"){
        audio.pause=true
        soundcheck = "muted"
        volume.classList = "fa-solid fa-volume-xmark"
        volumeBar.value=0

    }
    else{
        audio.muted = false
        soundcheck = "open"
        volume.classList = "fa-solid fa-volume-off"
        volumeBar.value=100
    }
}
)

//liste açma işlemleri
openList.addEventListener("click" , ()=>{
    sarkilar.classList.add("active")
    container.classList.add("deactive")
    ul.innerHTML = ""
    console.log(player.musicList[1].title)
    for(let i = 0 ; i<player.musicList.length; i++){
        const li = document.createElement("li");
        li.innerHTML = `${player.musicList[i].title}-${player.musicList[i].singer}`;
        ul.appendChild(li);
        li.addEventListener("click" , ()=>{
            displayMusic(player.musicList[i])
        }
        )
        
    }
})

quitbtn.addEventListener("click",()=>{
    container.classList.remove("deactive")
    sarkilar.classList.remove("active")
})
