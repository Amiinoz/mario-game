const canvas = document.querySelector("canvas");

console.log(canvas);

const cntx = canvas.getContext("2d");

console.log(cntx);

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const gravity = 1.5;

// Create a player
class Player {
  constructor() {
    this.position = {
      x: 100,
      y: 100,
    };
    this.velocity = {
      x: 0,
      y: 0,
    };
    this.width = 30;
    this.height = 30;
  }
  draw() {
    cntx.fillStyle = "gray";
    cntx.fillRect(this.position.x, this.position.y, this.width, this.height);
  }

  update() {
    this.draw();
    this.position.y += this.velocity.y;

    // if (this.position.y + this.height.y + this.velocity.y <= canvas.height)
    //   this.velocity.y += gravity;
    // else this.velocity.y = 0;

    if (this.position.y + this.height + this.velocity.y <= canvas.height) {
      this.velocity.y += gravity;
    } else {
      this.velocity.y = 0;
    }
  }
}

const player = new Player();

function animate() {
  requestAnimationFrame(animate);
  // console.log('test"');
  cntx.clearRect(0, 0, canvas.width, canvas.height);
  player.update();
}

animate();
