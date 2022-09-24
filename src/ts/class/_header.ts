
 
export class HeaderConrolls {
  header: HTMLElement;
  aside: HTMLElement;
  constructor() {
    this.header = document.querySelector("header")!;
    this.aside = document.querySelector("aside")!;
  }

  Show_Hide_Controller() {
    let icon = this.header.querySelector(".toggler");

    icon?.addEventListener("click", () => {
      this.aside.getAttribute("show") == "true"
        ? this.aside.setAttribute("show", "false")
        : this.aside.setAttribute("show", "true");
    });
  }
}

export class ScrollControlls {
  scroll_right = document.querySelector(".scroll-right");
  scroll_left = document.querySelector(".scroll-left");
  music_list_container = document.querySelector(
    ".music-list .container"
  ) as HTMLElement;

  ScrollRight() {
    this.scroll_right?.addEventListener("click", () => {
      this.music_list_container.scrollLeft -= 220;
    });
  }

  ScrollLeft() {
    this.scroll_left?.addEventListener("click", () => {
      this.music_list_container.scrollLeft += 220;
    });
  }
}


let header = document.querySelector('header') as HTMLElement;


window.addEventListener('scroll', (e) => {
  window.scrollY > 10 ? header.style.top = '0' : header.style.top = '2%';
  
})
