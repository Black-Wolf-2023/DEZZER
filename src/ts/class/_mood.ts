enum Dark {
  "--main-color" = "#f9fafe",
  "--shadow-color" = "rgba(104, 118, 153, 0.712)",
  "--primary-color" = "linear-gradient(to right, #6190e8, #a7bfe8)",
  "--content-color" = "#070f25",
  "--gray-color" = "#070f25",
  "--gray-color-2" = "#fff",
  "--white-color" = "#10182bef",
}
enum Light {
  "--main-color" = "#112048",
  "--primary-color" = "linear-gradient(to right, #1d3258, #33496e)",
  "--content-color" = "#f9fafe",
  "--shadow-color" = "rgba(191, 202, 226, 0.548)",
  "--gray-color" = "rgba(191, 202, 226, 0.548)",
  "--gray-color-2" = "rgba(41, 48, 66, 0.712)",
  "--white-color" = "#fff",
}

export class Mood {
  mood: HTMLElement;
  darkcolorsName: string[];
  lightcolorsName: string[];
  darkcolorsValue: string[];
  lightcolorsValue: string[];

  constructor() {
    this.mood = document.querySelector(".mode") as HTMLElement;
    this.darkcolorsName = Object.keys(Dark);
    this.lightcolorsName = Object.keys(Light);
    this.darkcolorsValue = Object.values(Dark);
    this.lightcolorsValue = Object.values(Light);
  }

  SelectMood() {
    this.mood.getAttribute("mode") == "light"
      ? this.mood.setAttribute("mode", "dark")
      : this.mood.setAttribute("mode", "light");

    if (this.mood.getAttribute("mode") == "dark") {
      for (let item in this.darkcolorsName) {
        document.documentElement.style.setProperty(
          `${this.darkcolorsName[item]}`,
          `${this.darkcolorsValue[item]}`
        );
      }
    } else {
      for (let item in this.darkcolorsName) {
        document.documentElement.style.setProperty(
          `${this.lightcolorsName[item]}`,
          `${this.lightcolorsValue[item]}`
        );
      }
    }
  }
}
