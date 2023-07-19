const canvas = document.querySelector("canvas");

console.log(canvas);

const cntx = canvas.getContext("2d");

console.log(cntx);

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Create a player
class Player {
  constructor() {
    this.position = {
      x: 100,
      y: 100,
    };
    this.width = 45;
    this.height = 45;
  }
  draw() {
    cntx.fillStyle = "gray";
    cntx.fillRect(this.position.x, this.position.y, this.width, this.height);
  }
}

const player = new Player();
player.draw();
