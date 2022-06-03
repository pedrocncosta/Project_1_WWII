class Sealife {
  constructor(game) {
    this.game = game;
    this.x = 0;
    this.y = 200 + Math.floor(Math.random() * 200);
    this.width = 55;
    this.height = 35;
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
    this.img.src = "./docs/assets/imgs/shark.png";
    this.game.ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }
}
