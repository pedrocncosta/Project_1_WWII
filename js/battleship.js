class Player {
  constructor(game, x, y, width, height) {
    this.game = game;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.img = new Image();
  }

  draw() {
    this.img.src = "./docs/assets/imgs/battleship.png";
    this.game.ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }

  shoot() {
    this.game.deepCharges.push(
      new Bullet(
        this.game,
        this.x + this.width / 2,
        this.y + this.height,
        "../docs/assets/imgs/Mine.png"
      )
    );
      
  }
  moveLeft() {
    this.x -= 10;
  }
  moveRight() {
    this.x += 10;
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

  crashWith(obstacle) {
    return !(
      this.bottom() < obstacle.top() ||
      this.top() > obstacle.bottom() ||
      this.right() < obstacle.left() ||
      this.left() > obstacle.right()
    );
  }
}
