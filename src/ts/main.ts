import { Data } from "./interface/_data.js";
import { Api } from "./class/_api.js";
import { HeaderConrolls, ScrollControlls } from "./class/_header.js";
import { MusicPlayerControll } from "./class/_music_controll.js";
import { Mood } from "./class/_mood.js";

new HeaderConrolls().Show_Hide_Controller();
new ScrollControlls().ScrollLeft();
new ScrollControlls().ScrollRight();

let api = new Api();
let scrollcontrolls = new ScrollControlls();
let music_app = document.querySelector(".music-app");

let song_num = document.querySelector(".song-num") as HTMLElement;

song_num.innerHTML = ` ${api.data.length.toString()} Song`;

for (let data of api.data) {
  scrollcontrolls.music_list_container.insertAdjacentHTML(
    "beforeend",
    `
            <div class="muisc" audio-src = "${data.audiosSrc}">
                <div class="img"><span><ion-icon name="play-circle-outline"></ion-icon></span><img
                    src="${data.imgSrc}" alt=""></div>
                <div class="name">${data.name}</div>
                <div class="author">${data.author}</div>
            </div>
    `
  );

  music_app?.insertAdjacentHTML(
    "beforeend",
    `
           <div class="music-cont">
                <div class="music-details">
                    <span>0${data.id}</span>
                    <img src="${data.imgSmSrc}" alt="">
                    <ion-icon name="caret-forward-outline"></ion-icon>
                    <span>${data.name}</span>
                </div>
                <div class="music-controll-details">
                    <span>${data.author}</span>
                    <span>3:02</span>
                    <ion-icon name="heart-circle-outline"></ion-icon>
                </div>
            </div>
    `
  );
}

let musicplayercontroll = new MusicPlayerControll();

function Handel_Data() {
  musicplayercontroll.paly_pause.setAttribute("data-status", "puse");
}

musicplayercontroll.music_icon.forEach((e: any, i) => {
  e.addEventListener("click", () => {
    musicplayercontroll.PlayUi(i);
    Handel_Data();
  });
});

for (let item of musicplayercontroll.music_cont) {
  item.addEventListener("click", (e: any) => {
    musicplayercontroll.PlayUi(
      Array.from(musicplayercontroll.music_cont).indexOf(item)
    );
    Handel_Data();
  });
}

musicplayercontroll.range.addEventListener("click", (e: any) => {
  musicplayercontroll.SlideControll(e.offsetX, e.target!.clientWidth);
  musicplayercontroll.PlayControll(true);
  Handel_Data();
});

musicplayercontroll.range.addEventListener("mouseenter", ({ target }) => {
  target!.children[0].children[0].style.opacity = 1;
});
musicplayercontroll.range.addEventListener("touchstart", ({ target }) => {
  target!.children[0].children[0].style.opacity = 1;
});

musicplayercontroll.range.addEventListener("mouseleave", ({ target }) => {
  target!.children[0].children[0].style.opacity = 0;
});

musicplayercontroll.range.addEventListener("touchcancel", ({ target }) => {
  target!.children[0].children[0].style.opacity = 0;
});

musicplayercontroll.paly_pause.addEventListener("click", () => {
  musicplayercontroll.StopControll(musicplayercontroll.paly_pause);
});

musicplayercontroll.next.addEventListener("click", () => {
  musicplayercontroll.index_start < api.data.length - 1
    ? ++musicplayercontroll.index_start
    : false;
  musicplayercontroll.PlayUi(musicplayercontroll.index_start);
  Handel_Data();
});
musicplayercontroll.back.addEventListener("click", () => {
  musicplayercontroll.index_start > 0
    ? --musicplayercontroll.index_start
    : false;
  musicplayercontroll.PlayUi(musicplayercontroll.index_start);
  Handel_Data();
});

musicplayercontroll.audio.addEventListener("ended", () => {
  musicplayercontroll.index_start == api.data.length - 1
    ? musicplayercontroll.PlayUi(0)
    : musicplayercontroll.PlayUi(++musicplayercontroll.index_start);
});

let mood = new Mood();

mood.mood.addEventListener("click", () => {
  mood.SelectMood();
});
