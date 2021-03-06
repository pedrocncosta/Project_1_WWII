class Enemy {
  constructor(game) {
    this.game = game;
    this.x = 600;
    this.y = 120 + Math.floor(Math.random() * 300);
    this.width = 60;
    this.height = 20;
    this.img = new Image();
  }

  left() {
    return this.x;
  }
  right() {
    return this.x + this.width;
  }

  top() {
    return this.y;
  }

  bottom() {
    return this.y + this.height;
  }

  shoot(source) {
    this.game.torpedos.push(
      new Bullet(this.game, this.x + this.width / 2, this.y, source)
    );
  }

  draw() {
    this.img.src = "./docs/assets/imgs/mysubmarine.png";
    this.game.ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }

  crashWith(obstacle) {
    return !(
      this.bottom() < obstacle.top() ||
      this.top() > obstacle.bottom() ||
      this.right() < obstacle.left() ||
      this.left() > obstacle.right()
    );
  }
}
