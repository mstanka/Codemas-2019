let canvas = document.querySelector("#canvas");
let width = 1000;
let height = 600;

canvas.width = width;
canvas.height = height;

let player = {
    x: width / 2,
    y: height - 15,
    width: 30,
    height: 30,
    speed: 4
};