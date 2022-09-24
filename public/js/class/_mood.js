var Dark;
(function (Dark) {
    Dark["--main-color"] = "#f9fafe";
    Dark["--shadow-color"] = "rgba(104, 118, 153, 0.712)";
    Dark["--primary-color"] = "linear-gradient(to right, #6190e8, #a7bfe8)";
    Dark["--content-color"] = "#070f25";
    Dark["--gray-color"] = "#070f25";
    Dark["--gray-color-2"] = "#fff";
    Dark["--white-color"] = "#10182bef";
})(Dark || (Dark = {}));
var Light;
(function (Light) {
    Light["--main-color"] = "#112048";
    Light["--primary-color"] = "linear-gradient(to right, #1d3258, #33496e)";
    Light["--content-color"] = "#f9fafe";
    Light["--shadow-color"] = "rgba(191, 202, 226, 0.548)";
    Light["--gray-color"] = "rgba(191, 202, 226, 0.548)";
    Light["--gray-color-2"] = "rgba(41, 48, 66, 0.712)";
    Light["--white-color"] = "#fff";
})(Light || (Light = {}));
export class Mood {
    constructor() {
        this.mood = document.querySelector(".mode");
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
                document.documentElement.style.setProperty(`${this.darkcolorsName[item]}`, `${this.darkcolorsValue[item]}`);
            }
        }
        else {
            for (let item in this.darkcolorsName) {
                document.documentElement.style.setProperty(`${this.lightcolorsName[item]}`, `${this.lightcolorsValue[item]}`);
            }
        }
    }
}
