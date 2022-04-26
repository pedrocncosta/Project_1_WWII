class Bullet {
  constructor(game, x, y, img) {
    this.game = game;
    this.x = x;
    this.y = y;
    this.width = 10;
    this.height = 20;
    this.img = new Image();
    this.img.src = img;
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
    this.game.ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }
}
