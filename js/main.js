class Game {
  constructor() {
    this.canvas = document.getElementById("canvas");
    this.ctx = this.canvas.getContext("2d");
    this.background = new Image();
    this.x = 0;
    this.y = 0;
    this.width = 500;
    this.height = 700;
    this.intervalId = null;
    this.ship = null;
    this.controls = null;
    this.submarines = [];
    this.torpedos = [];
    this.frames = 0;
    this.score = 0;
    this.timer = 5000;
  }

  start() {
    this.ship = new Player(this, 200, 110, 90, 30);
    this.controls = new Controls(this);
    this.controls.keyboardEvents();
    this.intervalId = setInterval(() => {
      this.update();
    }, 10);
  }

  update() {
    this.timer--;
    this.ctx.clearRect(0, 0, this.width, this.height);
    this.frames++;
    this.drawBackground();
    this.drawScores();
    this.ship.draw();
    this.createSubmarines();
    this.torpedos.forEach((enemy) => {
      enemy.y++;

      enemy.draw();
    });
    this.submarines.forEach((enemy) => {
      enemy.x--;

      enemy.draw();
    });
    this.giveMePoints();
    this.checkGameOver();
    this.drawTimer();
  }

  createSubmarines() {
    if (this.frames % 200 === 0) {
      this.submarines.push(new Enemy(this));
    }
  }

  checkGameOver() {
    const ship = this.ship;
    const crashed = this.torpedos.some(function (enemy) {
      return ship.crashWith(enemy);
    });
    if (crashed) {
      this.stop();
    }
    if (this.timer <= 0) {
      this.stop();
    }
  }

  giveMePoints() {
    this.submarines.forEach((submarine, index, arr) => {
      this.torpedos.forEach((torpedo, i, a) => {
        if (submarine.crashWith(torpedo)) {
          a.splice(i, 1);
          arr.splice(index, 1);
          this.score++;
        }
      });
    });
  }

  stop() {
    clearInterval(this.intervalId);
  }

  drawBackground() {
    this.background.src = "./docs/assets/imgs/blue-water.jpg";
    this.ctx.drawImage(
      this.background,
      this.x,
      this.y,
      this.width,
      this.height
    );
  }

  drawScores() {
    this.ctx.font = "30px serif";
    this.ctx.fillStyle = "grey";
    this.ctx.fillText(`Score: ${this.score}`, 350, 30);
  }

  drawTimer() {
    this.ctx.font = "30px serif";
    this.ctx.fillStyle = "grey";
    this.ctx.fillText(`Time: ${this.timer}`, 30, 30);
  }
}
