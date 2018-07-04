import * as PIXI from "pixi.js";
import "fpsmeter";
import IGame from "./interfaces/IGame";

const Game = {} as IGame;

const fpsmeter = new FPSMeter();
fpsmeter.set("graph", 1);
fpsmeter.set("theme", "transparent");
fpsmeter.set("heat", 1);

Game.initialize = function(width: number, height: number, scaleMode?: number) {
  Game.counter = 0;
  Game.app = new PIXI.Application(width, height);
  PIXI.settings.SCALE_MODE = scaleMode ? scaleMode : PIXI.SCALE_MODES.NEAREST;

  Game.canvas = Game.app.view;

  // Stop mouse right clicks
  Game.canvas.addEventListener("contextmenu", (event) => {
    event.preventDefault();
  });

  // Stop middle mouse button scroll
  Game.canvas.addEventListener("mousedown", (event) => {
    if (event.which === 2) event.preventDefault();
  });

  // Fill window with Game
  document.body.style.margin = "0";
  document.body.style.overflow = "hidden";
  document.body.appendChild(Game.canvas);

  Game.canvas.width = width;
  Game.canvas.height = height;
  Game.canvas.style.widows = width + "px";
  Game.canvas.style.height = height + "px";

  Game.app.renderer.resize(Game.canvas.width, Game.canvas.height);
};

Game.update = function(fn: (delta: number) => void) {
  Game.app.ticker.add((delta) => {
    fpsmeter.tickStart();
    fn(delta);
    fpsmeter.tick();
  });
};

export { Game };
