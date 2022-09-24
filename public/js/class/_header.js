export class HeaderConrolls {
    constructor() {
        this.header = document.querySelector("header");
        this.aside = document.querySelector("aside");
    }
    Show_Hide_Controller() {
        let icon = this.header.querySelector(".toggler");
        icon === null || icon === void 0 ? void 0 : icon.addEventListener("click", () => {
            this.aside.getAttribute("show") == "true"
                ? this.aside.setAttribute("show", "false")
                : this.aside.setAttribute("show", "true");
        });
    }
}
export class ScrollControlls {
    constructor() {
        this.scroll_right = document.querySelector(".scroll-right");
        this.scroll_left = document.querySelector(".scroll-left");
        this.music_list_container = document.querySelector(".music-list .container");
    }
    ScrollRight() {
        var _a;
        (_a = this.scroll_right) === null || _a === void 0 ? void 0 : _a.addEventListener("click", () => {
            this.music_list_container.scrollLeft -= 220;
        });
    }
    ScrollLeft() {
        var _a;
        (_a = this.scroll_left) === null || _a === void 0 ? void 0 : _a.addEventListener("click", () => {
            this.music_list_container.scrollLeft += 220;
        });
    }
}
let header = document.querySelector('header');
window.addEventListener('scroll', (e) => {
    window.scrollY > 10 ? header.style.top = '0' : header.style.top = '2%';
});
