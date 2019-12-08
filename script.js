let canvas = document.querySelector("#canvas");
let ctx = canvas.getContext("2d");
let width = 1000;
let height = 600;
let friction = 0.8;
let keys = [];

//vytvoříme si obrázek pro hráče
let hero = new Image();
hero.src = "obrazky/elf_left.png";

//přidáme canvasu šířku a výšku
canvas.width = width;
canvas.height = height;

//vytvoření herního objektu hráče
let player = {
  //x a y nastavíme tak, aby se nám hráč zobrazil dole uprostřed stránky
  x: width / 2,
  y: height - 30,
  width: 30,
  height: 30,
  speed: 4,
  velX: 0,
  velY: 0
};

//funkce, která bude vykreslovat hlavní objekty, aktualizovat čas atd.
function update() {
  //volaní funkce pro pohyb
  movement();

  ctx.drawImage(hero, player.x, player.y, player.width, player.height);
  requestAnimationFrame(update);
}

function movement() {
  //pravá šipka
  if (keys[39]) {
    if (player.velX < player.speed) {
      player.velX++;
    }
  }
  //levá šipka
  if (keys[37]) {
    if (player.velX > -player.speed) {
      player.velX--;
    }
  }

  //přidání tření 
  player.velX *= friction;

  //pohyb hráče
  player.x += player.velX;
  player.y += player.velY;

  //Smazaní objektu 
  ctx.clearRect(0, 0, width, height);
}

//poslouchače pro práci s klávesami
document.body.addEventListener("keydown", function(e) {
  keys[e.keyCode] = true;
});

document.body.addEventListener("keyup", function(e) {
  keys[e.keyCode] = false;
});

//poslouchač, který čeká na načtení stránky, jakmile se stránka načte, spustí se funkce update
window.addEventListener("load", update);
