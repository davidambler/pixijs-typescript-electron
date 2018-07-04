import * as PIXI from "pixi.js";

export default interface IGame {
  initialize(width: number, height: number, scaleMode?: number): void;
  app: PIXI.Application;
  counter: number;
  canvas: HTMLCanvasElement;
  update(fn: (delta: number) => void);
}
