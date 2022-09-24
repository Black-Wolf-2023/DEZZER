import { Api } from "./_api.js";

let api = new Api();

export class MusicPlayerControll {
  music_icon: NodeList;
  music: NodeList;
  music_layer_img: HTMLElement;
  music_layer_title: HTMLElement;
  music_layer_name: HTMLElement;
  audio: HTMLAudioElement;
  current_time: HTMLElement;
  total_time: HTMLElement;
  range: HTMLElement;
  paly_pause: HTMLElement;
  index_start = 0;
  next: HTMLElement;
  back: HTMLElement;
  music_cont: NodeList;
  aside_animate: HTMLElement;

  constructor() {
    this.music_icon = document.querySelectorAll(".muisc .img span ion-icon");
    this.music = document.querySelectorAll(".muisc");
    this.music_layer_img = document.querySelector(
      ".music-layer .img img"
    ) as HTMLElement;
    this.music_layer_title = document.querySelector(
      ".music-layer h3"
    ) as HTMLElement;
    this.music_layer_name = document.querySelector(
      ".music-layer h5"
    ) as HTMLElement;
    this.audio = document.querySelector("#main-audio") as HTMLAudioElement;
    this.current_time = document.querySelector(".current-time") as HTMLElement;
    this.total_time = document.querySelector(".total-time") as HTMLElement;
    this.range = document.querySelector(".range") as HTMLElement;
    this.paly_pause = document.querySelector("#player-controll") as HTMLElement;
    this.next = document.querySelector(".next") as HTMLElement;
    this.back = document.querySelector(".back") as HTMLElement;
    this.aside_animate = document.querySelector(
      ".aside-animate"
    ) as HTMLElement;
    this.music_cont = document.querySelectorAll(
      ".music-app .music-cont .music-details"
    ) as NodeList;
  }

  PlayUi(index: number = 0) {
    this.index_start = index;
    let data = api.data[this.index_start];
    let audio_src = this.music[this.index_start] as HTMLElement;
    this.music_layer_title.innerText = data.name;
    this.music_layer_name.innerText = data.author;
    this.music_layer_img.setAttribute("src", data.imgSrc);
    this.audio.setAttribute("src", audio_src.getAttribute("audio-src")!);
    this.PlayControll(true);
  }

  PlayControll(state: boolean) {
    try {
      this.audio.play();
    } catch (e) {
      console.log(e);
    }
    this.music_layer_img.parentElement!.setAttribute(
      "rotate-animate",
      state ? "true" : "false"
    );

    if (state) {
      this.aside_animate.children[1].style.display = "block";
      this.aside_animate.children[0].style.display = "none";
    } else {
      this.aside_animate.children[1].style.display = "none";
      this.aside_animate.children[0].style.display = "block";
    }

    let min: any = 0;
    let sec: any = 0;

    let durMin = 0;
    let durSec = 0;

    this.audio.addEventListener("timeupdate", ({ target }) => {
      sec = Math.floor(target!.currentTime) % 60;
      min = Math.floor(target!.currentTime / 60);
      if (sec < 10) {
        sec = `0${sec}`;
      }
      if (min < 10) {
        min = `0${min}`;
      }
      this.current_time.innerText = `${min}:${sec}`;
      this.range.children[0].style.width = `${
        (target!.currentTime / target!.duration) * 100
      }%`;
    });

    this.audio.addEventListener("playing", ({ target }) => {
      durMin = Math.floor(target!.duration / 60);
      durSec = Math.floor(target!.duration % 60);
      this.total_time.innerText = `${durMin}:${durSec}`;
    });
  }

  SlideControll(postion: number, width: number) {
    this.audio.currentTime = (postion / width) * this.audio.duration;
    this.range.children[0].style.width = `${(postion / width) * 100}%`;
  }

  StopControll(target: any) {
    if (target.getAttribute("data-status") == "puse") {
      this.PlayControll(false);
      this.audio.pause();
      target.setAttribute("data-status", "play");
    } else {
      this.PlayControll(true);
      target.setAttribute("data-status", "puse");
    }
  }
}
