import { Api } from "./_api.js";
let api = new Api();
export class MusicPlayerControll {
    constructor() {
        this.index_start = 0;
        this.music_icon = document.querySelectorAll(".muisc .img span ion-icon");
        this.music = document.querySelectorAll(".muisc");
        this.music_layer_img = document.querySelector(".music-layer .img img");
        this.music_layer_title = document.querySelector(".music-layer h3");
        this.music_layer_name = document.querySelector(".music-layer h5");
        this.audio = document.querySelector("#main-audio");
        this.current_time = document.querySelector(".current-time");
        this.total_time = document.querySelector(".total-time");
        this.range = document.querySelector(".range");
        this.paly_pause = document.querySelector("#player-controll");
        this.next = document.querySelector(".next");
        this.back = document.querySelector(".back");
        this.aside_animate = document.querySelector(".aside-animate");
        this.music_cont = document.querySelectorAll(".music-app .music-cont .music-details");
    }
    PlayUi(index = 0) {
        this.index_start = index;
        let data = api.data[this.index_start];
        let audio_src = this.music[this.index_start];
        this.music_layer_title.innerText = data.name;
        this.music_layer_name.innerText = data.author;
        this.music_layer_img.setAttribute("src", data.imgSrc);
        this.audio.setAttribute("src", audio_src.getAttribute("audio-src"));
        this.PlayControll(true);
    }
    PlayControll(state) {
        try {
            this.audio.play();
        }
        catch (e) {
            console.log(e);
        }
        this.music_layer_img.parentElement.setAttribute("rotate-animate", state ? "true" : "false");
        if (state) {
            this.aside_animate.children[1].style.display = "block";
            this.aside_animate.children[0].style.display = "none";
        }
        else {
            this.aside_animate.children[1].style.display = "none";
            this.aside_animate.children[0].style.display = "block";
        }
        let min = 0;
        let sec = 0;
        let durMin = 0;
        let durSec = 0;
        this.audio.addEventListener("timeupdate", ({ target }) => {
            sec = Math.floor(target.currentTime) % 60;
            min = Math.floor(target.currentTime / 60);
            if (sec < 10) {
                sec = `0${sec}`;
            }
            if (min < 10) {
                min = `0${min}`;
            }
            this.current_time.innerText = `${min}:${sec}`;
            this.range.children[0].style.width = `${(target.currentTime / target.duration) * 100}%`;
        });
        this.audio.addEventListener("playing", ({ target }) => {
            durMin = Math.floor(target.duration / 60);
            durSec = Math.floor(target.duration % 60);
            this.total_time.innerText = `${durMin}:${durSec}`;
        });
    }
    SlideControll(postion, width) {
        this.audio.currentTime = (postion / width) * this.audio.duration;
        this.range.children[0].style.width = `${(postion / width) * 100}%`;
    }
    StopControll(target) {
        if (target.getAttribute("data-status") == "puse") {
            this.PlayControll(false);
            this.audio.pause();
            target.setAttribute("data-status", "play");
        }
        else {
            this.PlayControll(true);
            target.setAttribute("data-status", "puse");
        }
    }
}
