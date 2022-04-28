class Game {
  constructor() {
    this.canvas = document.getElementById("canvas");
    this.ctx = this.canvas.getContext("2d");
    this.background = new Image();
    this.x = 0;
    this.y = 0;
    this.width = 740;
    this.height = 520;
    this.intervalId = null;
    this.ship = null;
    this.controls = null;
    this.myStore = null;
    this.fish = [];
    this.submarines = [];
    this.deepCharges = [];
    this.torpedos = [];
    this.frames = 0;
    this.score = 0;
    this.highestScore = 0;
    this.timer = 90;
    this.explosion = new Audio(
      "./docs/assets/sounds/8d82b5_Halo_3_Wraith_Shot_Explosion_Only_Sound_Effect.mp3"
    );
    this.launchCharge = new Audio("./docs/assets/sounds/launcher.mp3");
  }

  start() {
    this.ship = new Player(this, 200, 73, 90, 30);

    this.checkHighScore();

    this.controls = new Controls(this);
    this.controls.keyboardEvents();
    this.intervalId = setInterval(() => {
      this.update();
    }, 1000 / 60);
  }

  update() {
    this.timer = 90 - Math.floor(this.frames / 60);
    this.ctx.clearRect(0, 0, this.width, this.height);
    this.frames++;
    this.drawBackground();
    this.drawScores();
    this.ship.draw();
    this.createSubmarines();
    this.createTorpedos();
    this.createSealife();

    this.createHighScore();

    this.torpedos.forEach((torpedo, i, arr) => {
      if (torpedo.y == this.ship.y + this.ship.height) {
        arr.splice(i, 1);
      }
    });

    this.torpedos.forEach((enemy) => {
      enemy.y--;

      enemy.draw();
    });

    this.deepCharges.forEach((enemy) => {
      enemy.y++;

      enemy.draw();
    });
    this.submarines.forEach((enemy) => {
      enemy.x--;

      enemy.draw();
    });
    this.fish.forEach((enemy) => {
      enemy.x++;

      enemy.draw();
    });
    this.giveMePoints();
    this.checkGameOver();
    this.drawTimer();
  }

  createSealife() {
    if (this.frames % 500 === 0) {
      this.fish.push(new Sealife(this));
    }
  }

  createSubmarines() {
    if (this.frames % 200 === 0) {
      this.submarines.push(new Enemy(this));
    }
  }

  createTorpedos() {
    if (this.frames % 200 === 0) {
      this.submarines.forEach((submarine) => {
        submarine.shoot("./docs/assets/imgs/torpedo.png");
      });
    }
  }

  checkGameOver() {
    const ship = this.ship;
    const crashed = this.torpedos.some(function (enemy) {
      return ship.crashWith(enemy);
    });
    if (crashed) {
      this.explosion.play();
      alert("You have been shot!");
      this.stop();
    }
    if (this.timer <= 0) {
      alert("Time is up!");
      this.stop();
    }
  }

  giveMePoints() {
    this.submarines.forEach((submarine, index, arr) => {
      this.deepCharges.forEach((deepCharge, i, a) => {
        if (submarine.crashWith(deepCharge)) {
          this.explosion.play();
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
    this.ctx.fillText(`Score: ${this.score}`, 620, 30);
  }

  drawTimer() {
    this.ctx.font = "30px Arial";
    this.ctx.fillStyle = "grey";
    this.ctx.fillText(`Time: ${this.timer}`, 30, 30);
  }

  createHighScore() {
    this.ctx.font = "32px serif";
    this.ctx.fillStyle = "white";

    if (this.highestScore < this.score) {
      this.highestScore = this.score;
      localStorage.setItem("highestScore", this.highestScore);
      document.getElementsByClassName(
        "highestScore"
      )[0].innerHTML = `Highest Score: ${this.highestScore}`;
    }
  }

  checkHighScore() {
    this.myStore = localStorage.getItem("highestScore");
    if (this.myStore) {
      this.highestScore = this.myStore;
    }
    document.getElementsByClassName(
      "highestScore"
    )[0].innerHTML = `Highest Score: ${this.highestScore}`;
  }
}
