// import platform1 from "./images/platform1.png";
// console.log(platform1);

const platform1 = new Image();
platform1.src = "./images/platform1.png";
console.log(platform1);

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
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;

    if (this.position.y + this.height + this.velocity.y <= canvas.height) {
      this.velocity.y += gravity;
    } else {
      this.velocity.y = 0;
    }
  }
}

// create the platform
class Platform {
  constructor({ x, y, image }) {
    this.position = {
      x,
      y,
    };

    this.width = 100;
    this.height = 10;

    this.image = image;
  }
  // draw() {
  //   cntx.fillStyle = "green";
  //   cntx.fillRect(this.position.x, this.position.y, this.width, this.height);
  // }

  draw() {
    cntx.drawImage(this.image, this.position.x, this.position.y);
  }
}

const player = new Player();
// const platform = new Platform();
const platforms = [
  new Platform({
    x: 150,
    y: 250,
    image: platform1,
  }),
  new Platform({
    x: 500,
    y: 300,
  }),
];
const keys = {
  right: {
    pressed: false,
  },
  left: {
    pressed: false,
  },
};
// creating win or loose
let scrollOffset = 0;

// movements
function animate() {
  requestAnimationFrame(animate);
  // console.log('test"');
  cntx.clearRect(0, 0, canvas.width, canvas.height);
  player.update();
  // platform.draw();
  platforms.forEach((platform) => {
    platform.draw();
  });

  if (keys.right.pressed && player.position.x < 400) {
    player.velocity.x = 5;
  } else if (keys.left.pressed && player.position.x > 100) {
    player.velocity.x = -5;
  } else {
    player.velocity.x = 0;

    if (keys.right.pressed) {
      scrollOffset += 5;
      platforms.forEach((platform) => {
        platform.position.x -= 5;
      });
    } else if (keys.left.pressed) {
      scrollOffset -= 5;
      platforms.forEach((platform) => {
        platform.position.x += 5;
      });
    }
  }
  console.log(scrollOffset);
  // detect  platform collision
  platforms.forEach((platform) => {
    if (
      player.position.y + player.height <= platform.position.y &&
      player.position.y + player.height + player.velocity.y >=
        platform.position.y &&
      player.position.x + player.width >= platform.position.x &&
      player.position.x <= platform.position.x + platform.width
    ) {
      player.velocity.y = 0;
    }
  });
  if (scrollOffset > 2500) {
    console.log("win");
  }
}

animate();
99;

addEventListener("keydown", ({ keyCode }) => {
  // console.log(event);
  console.log(keyCode);
  switch (keyCode) {
    case 65:
      console.log("left");
      keys.left.pressed = true;

      break;

    case 83:
      console.log("down");
      break;

    case 68:
      console.log("right");
      keys.right.pressed = true;
      break;

    case 87:
      console.log("up");
      player.velocity.y -= 7;
      break;
  }
});

addEventListener("keyup", ({ keyCode }) => {
  // console.log(event);
  console.log(keyCode);
  switch (keyCode) {
    case 65:
      console.log("left");
      keys.left.pressed = false;
      break;

    case 83:
      console.log("down");
      break;

    case 68:
      console.log("right");
      keys.right.pressed = false;
      break;

    case 87:
      console.log("up");
      player.velocity.y -= 20;
      break;
  }
});
