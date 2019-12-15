//tímto si odchytíme canvas z HTML
let canvas = document.querySelector("#canvas");
let ctx = canvas.getContext("2d");
let width = 1000;
let height = 600;
let friction = 0.8;
let gravity = 0.3;
let keys = [];
let platforms = [];
let presents = [];
let gingerbreads = [];
let spikes = [];

let game = {
  introduction: document.querySelector("#introduction"),
  startButton: document.querySelector("#start"),
  canvas: document.querySelector("#canvas")
};

//vytvoření herního objektu hráče
let player = {
  //x a y nastavíme tak, aby se nám hráč zobrazil dole uprostřed stránky
  x: width / 2,
  y: height - 30,
  width: 30,
  height: 30,
  speed: 4,
  velX: 0,
  velY: 0,
  jumping: false,
  grounded: false
};

//vytvoříme si obrázek pro hráče
let hero = new Image();
hero.src = "obrazky/elf_left.png";

//vytvořáme si obrázek pro plošinu
let platformImage = new Image();
platformImage.src = "obrazky/platform.png";

let spike = new Image();
spike.src = "obrazky/spike.png";

let present = new Image();
present.src = "obrazky/present.png";

let gingerbread = new Image();
gingerbread.src = "obrazky/gingerbread.png";

//přidáme canvasu šířku a výšku
canvas.width = width;
canvas.height = height;

//funkce na vytvoření plošin
function createPlatforms() {
  //leva strana
  platforms.push({
    x: 0,
    y: 0,
    width: 0,
    height: height
  });
  //spodni strana
  platforms.push({
    x: 0,
    y: height - 2,
    width: width,
    height: 51
  });
  //prava strana
  platforms.push({
    x: width - 3,
    y: 0,
    width: 0,
    height: height
  });

  platforms.push({
    x: 100,
    y: 520,
    width: 150,
    height: 15
  });

  platforms.push({
    x: 850,
    y: 520,
    width: 150,
    height: 15
  });

  platforms.push({
    x: 700,
    y: 440,
    width: 200,
    height: 15
  });

  platforms.push({
    x: 850,
    y: 360,
    width: 100,
    height: 15
  });

  platforms.push({
    x: 300,
    y: 440,
    width: 350,
    height: 15
  });


  platforms.push({
    x: 100,
    y: 360,
    width: 350,
    height: 15
  });

  platforms.push({
    x: 700,
    y: 360,
    width: 100,
    height: 15
  });

  platforms.push({
    x: 600,
    y: 280,
    width: 150,
    height: 15
  });

  platforms.push({
    x: 150,
    y: 280,
    width: 250,
    height: 15
  });

  platforms.push({
    x: 800,
    y: 200,
    width: 150,
    height: 15
  });
  platforms.push({
    x: 0,
    y: 200,
    width: 150,
    height: 15
  });

  platforms.push({
    x: 150,
    y: 120,
    width: 650,
    height: 15
  });
}

//funkce na vytvoření perníčk§
function createGingerbreads() {
  gingerbreads.push({
    x: 750,
    y: 410,
    width: 30,
    height: 30
  });

  gingerbreads.push({
    x: 670,
    y: 250,
    width: 30,
    height: 30
  });
}

//funkce na vytvoření dárků
function createPresents() {
  presents.push({
    x: 150,
    y: 250,
    width: 30,
    height: 30
  });

  presents.push({
    x: 450,
    y: 90,
    width: 30,
    height: 30
  });
}

//funkce na vytvoření překážek
function createSpikes() {
  spikes.push({
    x: 710,
    y: 410,
    width: 30,
    height: 30
  });

  spikes.push({
    x: 250,
    y: 90,
    width: 30,
    height: 30
  });

  spikes.push({
    x: 650,
    y: 90,
    width: 30,
    height: 30
  });

  spikes.push({
    x: 870,
    y: 170,
    width: 30,
    height: 30
  });

  spikes.push({
    x: 250,
    y: 250,
    width: 30,
    height: 30
  });
}

// první funkce, která se spustí po načtení stránky, spustí úvodní okno
function introduction() {
  createPlatforms();
  createSpikes();
  createPresents();
  createGingerbreads();

  changeWindow("introduction");

  game.startButton.addEventListener("click", startGame);
}

// funkce, která přepne stránku na hru a spustí neustále opakující se funkci update
function startGame() {
  changeWindow("game");
  update();
}

// funkce, která přepíná okna
function changeWindow(name) {
  // nejprve všechny obrazovky skryjeme
  game.introduction.style = "none"; // úvod
  game.canvas.style.visibility = "hidden"; // herní plocha

  // podle parametru zobrazíme příslušnou obrazovku
  if (name === "introduction") {
    // úvod je flexbox, nastavíme na flex
    game.introduction.style.display = "flex";
  } else if (name === "game") {
    // herní plocha je blokový prvek, nastavíme na block
    game.canvas.style.visibility = "visible";
  }
}

//funkce na vykreslení plošin
function drawPlatforms() {
  for (var i = 0; i < platforms.length; i++) {
    ctx.drawImage(
      platformImage,
      platforms[i].x,
      platforms[i].y,
      platforms[i].width,
      platforms[i].height
    );

    let dir = platformColCheck(player, platforms[i]);

    if (dir === "l" || dir === "r") {
      player.velX = 0;
      player.jumping = false;
    } else if (dir === "b") {
      player.jumping = false;
      player.grounded = true;
    } else if (dir === "t") {
      player.velY *= -1;
    }
  }
}

//funkce, která bude vykreslovat hlavní objekty, aktualizovat čas atd.
function update() {
  //volaní funkce pro pohyb
  movement();
  drawPlatforms();
  drawSpikes();
  drawItems();


  ctx.drawImage(hero, player.x, player.y, player.width, player.height);
  requestAnimationFrame(update);
}

//funkce, která vykresluje perníčky a dárečky
function drawItems() {
  for (var i = 0; i < presents.length; i++) {
    ctx.drawImage(
      present,
      presents[i].x,
      presents[i].y,
      presents[i].width,
      presents[i].height
    );
  }

  for (var i = 0; i < gingerbreads.length; i++) {
    ctx.drawImage(
      gingerbread,
      gingerbreads[i].x,
      gingerbreads[i].y,
      gingerbreads[i].width,
      gingerbreads[i].height
    );
  }
}

//funkce, která vykresluje překážky
function drawSpikes() {
  for (var i = 0; i < spikes.length; i++) {
    ctx.drawImage(
      spike,
      spikes[i].x,
      spikes[i].y,
      spikes[i].width,
      spikes[i].height);
  }
}


function platformColCheck(player, platform) {
  // získáme vektory
  let vX = player.x + player.width / 2 - (platform.x + platform.width / 2);
  let vY = player.y + player.height / 2 - (platform.y + platform.height / 2);

  let hWidths = player.width / 2 + platform.width / 2;
  let hHeights = player.height / 2 + platform.height / 2;
  let colDir = null;

  // pomocí porovnávání zjistíme, z jaké strany naše postava na plošinu naráží
  if (Math.abs(vX) < hWidths && Math.abs(vY) < hHeights) {
    let oX = hWidths - Math.abs(vX);
    let oY = hHeights - Math.abs(vY);
    if (oX >= oY) {
      if (vY > 0) {
        colDir = "t";
        player.y += oY;
      } else {
        colDir = "b";
        player.y -= oY;
      }
    } else {
      if (vX > 0) {
        colDir = "l";
        player.x += oX;
      } else {
        colDir = "r";
        player.x -= oX;
      }
    }
  }
  return colDir;
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

  if (keys[38] || keys[32]) {
    // šipka nahoru nebo mezerník
    if (!player.jumping && player.grounded) {
      player.jumping = true;
      player.grounded = false;
      player.velY = -player.speed * 2;
    }
  }

  //přidání tření
  player.velX *= friction;
  //přidání gracitace
  player.velY += gravity;

  //pohyb hráče
  player.x += player.velX;
  player.y += player.velY;

  if (player.grounded) {
    player.velY = 0;
  }

  //Smazaní objektu 
  ctx.clearRect(0, 0, width, height);

  player.grounded = false;
}

//poslouchače pro práci s klávesami
document.body.addEventListener("keydown", function (e) {
  keys[e.keyCode] = true;
});

document.body.addEventListener("keyup", function (e) {
  keys[e.keyCode] = false;
});

//poslouchač, který čeká na načtení stránky, jakmile se stránka načte, spustí se funkce update
window.addEventListener("load", introduction);