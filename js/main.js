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
    this.car = null;
    this.controls = null;
    this.enemies = [];
    this.frames = 0;
  }

  //start
  start() {
    this.car = new Player(this, 200, 95, 100, 50);
    this.controls = new Controls(this);
    this.controls.keyboardEvents();
    this.intervalId = setInterval(() => {
      this.update();
    }, 1000 / 60);
  }

  update() {
    this.ctx.clearRect(0, 0, this.width, this.height);
    this.frames++;
    this.drawBackground();
    this.drawScores();
    this.car.draw();
    this.createEnemies();
    this.enemies.forEach((enemy) => {
      enemy.x--;

      enemy.draw();
    });
    this.checkGameOver();
  }

  createEnemies() {
    if (this.frames % 300 === 0) {
      this.enemies.push(new Enemy(this));
    }
  }

  checkGameOver() {
    const car = this.car;
    const crashed = this.enemies.some(function (enemy) {
      return car.crashWith(enemy);
    });

    if (crashed) {
      this.stop();
    }
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
    let score = Math.floor(this.frames / 60);
    this.ctx.font = "30px serif";
    this.ctx.fillStyle = "grey";
    this.ctx.fillText(`Score: ${score}`, 400, 30);
  }
}
