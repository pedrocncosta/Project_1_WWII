class Bullet {
  constructor(game,x ,y) {
    this.game = game;
    this.x = x;
    this.y = y;
    this.width = 50;
    this.height = 30;
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

  draw() {
    this.img.src = "./docs/assets/imgs/soviet-submarine-s-56.png";
    this.game.ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }
}
