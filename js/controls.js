class Controls {
  constructor(game) {
    this.game = game;
    this.ship = this.game.ship;
  }

  keyboardEvents() {
    window.addEventListener("keyup", (e) => {
      switch (e.code) {
        case "ArrowRight":
          if (this.ship.x + this.ship.width < 500) {
            this.ship.moveRight();
          }
          break;
        case "ArrowLeft":
          if (this.ship.x > 1) {
            this.ship.moveLeft();
          }
          break;
        case "ArrowDown":
          this.ship.shoot();

          break;
      }
    });
  }
}
