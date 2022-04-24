class Controls {
  constructor(game) {
    this.game = game;
    this.car = this.game.car;
  }

  keyboardEvents() {
    window.addEventListener("keydown", (e) => {
      switch (e.code) {
        case "ArrowRight":
          if (this.car.x + this.car.width < 500) {
            this.car.moveRight();
          }
          break;
        case "ArrowLeft":
          if (this.car.x > 1) {
            this.car.moveLeft();
          }
          break;
      }
    });
  }
}
