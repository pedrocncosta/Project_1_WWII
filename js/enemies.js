class Enemy {
  constructor(game) {
    this.game = game;
    this.x = 500;
    this.y = 200 + Math.floor(Math.random() * 400);
    this.width = 70;
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
    this.img.src = "./docs/assets/imgs/mysubmarine.png";
    this.game.ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }
}
