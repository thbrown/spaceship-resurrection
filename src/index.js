import { Background } from "./actors/Background.js";
import { Button } from "./actors/Button.js";
import { newComponent, getCount } from "./actors/components/ComponentFactory";
import { DirectionalParticle } from "./actors/DirectionalParticle.js";
import { Future } from "./actors/Future.js";
import { Grid } from "./actors/Grid.js";
import { Mouse } from "./actors/Mouse.js";
import { Rectangle } from "./actors/Rectangle.js";
import { MenuShip } from "./actors/MenuShip.js";
import { Streak } from "./actors/Streak.js";
import { Text } from "./actors/Text.js";
import { Keyboard } from "./actors/Keyboard.js";
import { Ship } from "./actors/Ship.js";

import { WIDTH, HEIGHT, FIRE_COLORS } from "./Constants.js";
import {
  randomIntFromInterval,
  collide,
  randomLetter,
  toRad,
  createTransform,
} from "./Utils.js";

const canvasElem = document.querySelector("canvas");
const ctx = canvasElem.getContext("2d");

const mouse = new Mouse(0, 0);
const background = new Background();
const keyboard = new Keyboard();

let centeredActor = undefined;

//let actors = initMainMenu();
let actors = initBuild();

let globalCounter = 0;
function clock() {
  globalCounter++;

  // Clear the canvas first
  ctx.fillStyle = "grey";
  ctx.fillRect(0, 0, WIDTH, HEIGHT);

  // Adjust camera position to center ship (if enabled)
  ctx.save();
  if (centeredActor) {
    // TODO - assuming centeredActor is always a Ship, fix (COM)
    let xTrans = centeredActor.x + centeredActor.COM.x;
    let yTrans = centeredActor.y + centeredActor.COM.y;

    ctx.translate(WIDTH/2,HEIGHT/2); // We want the ship at the center of the screen, not at the top left corner
    ctx.rotate(-toRad(centeredActor.theta)); // Comment this out if we don't want fixed rotation
    ctx.translate(-xTrans, -yTrans);

  }

  // Draw all actors
  for (let actor of actors) {
    ctx.save();
    actor.draw(ctx);
    ctx.restore();
  }

  // Restore centered
  ctx.restore();

  // Update all actors
  let toRemove = [];

  for (let actor of actors) {
    // Get everything colliding with this actor
    let collisions = [];
    for (let otherActor of actors) {
      if (actor === otherActor) {
        continue;
      }
      if (collide(actor, otherActor)) {
        collisions.push(otherActor);
      }
    }

    if (actor.update(collisions, globalCounter, actors)) {
      toRemove.push(actor);
    }
  }

  // Remove dead actors
  actors = actors.filter(function (el) {
    return toRemove.indexOf(el) < 0;
  });

  window.requestAnimationFrame(clock);
}

window.requestAnimationFrame(clock);

function initMainMenu() {
  centeredActor = undefined;
  let all = [];
  all.push(background);
  for (let i = 0; i < 100; i++) {
    all.push(
      new Streak(
        randomIntFromInterval(0, WIDTH),
        randomIntFromInterval(0, HEIGHT),
        randomIntFromInterval(10, 70)
      )
    );
  }
  all.push(new Text(20, 100, "Spaceship Resurrection", "100px Helvetica"));

  let particles = new DirectionalParticle(
    540,
    380,
    -45,
    2,
    1,
    20,
    5,
    FIRE_COLORS,
    4
  );
  all.push(particles);
  let ship = new MenuShip(-100, -100, 135);
  all.push(ship);
  all.push(
    new Button(
      945,
      600,
      350,
      100,
      "Play Now",
      "black",
      "white",
      "70px Helvetica",
      75,
      mouse,
      () => {
        // Start background gradient
        background.fadeStart = globalCounter;
        // Move Ship
        ship.speed = -10;
        // Move Particles
        particles.speed = 7;
        // Queue Explosion
        actors.push(
          new Future(globalCounter, 120, keyboard, () => {
            actors.push(
              new DirectionalParticle(
                WIDTH,
                HEIGHT,
                -65,
                1,
                1,
                60,
                500,
                FIRE_COLORS,
                50
              )
            );
            // Queue Blackout
            actors.push(
              new Future(globalCounter, 100, keyboard, () => {
                actors.push(
                  new DirectionalParticle(
                    WIDTH,
                    HEIGHT,
                    -65,
                    1,
                    1,
                    70,
                    500,
                    ["rgb(0,0,0)", "rgb(0,0,0)"],
                    50
                  )
                );
                // Queue Instructions
                actors.push(
                  new Future(globalCounter, 90, keyboard, () => {
                    actors = actors.filter(function (el) {
                      return el.constructor.name === "Future";
                    });
                    actors.push(
                      new Rectangle(0, 0, WIDTH, HEIGHT, "black", true)
                    );
                    actors.push(
                      new Text(
                        20,
                        270,
                        "You've crashed on a hostile planet, but you've escaped death for now...",
                        "39px Helvetica"
                      )
                    );
                    // Queue Instructions 2
                    actors.push(
                      new Future(globalCounter, 180, keyboard, () => {
                        actors.push(
                          new Text(
                            20,
                            310,
                            "However, the same can't be said for your spaceship.",
                            "39px Helvetica"
                          )
                        );
                        // Queue Instructions 2
                        actors.push(
                          new Future(globalCounter, 180, keyboard, () => {
                            actors.push(
                              new Text(
                                20,
                                400,
                                "Rebuild your ship and escape to the space station to survive.",
                                "39px Helvetica"
                              )
                            );
                            actors.push(
                              new Text(
                                20,
                                490,
                                "[Press any key to continue]",
                                "39px Helvetica"
                              )
                            );
                            // Queue Remove All & Show Build Screen
                            actors.push(
                              new Future(
                                globalCounter,
                                undefined,
                                keyboard,
                                () => {
                                  actors = initBuild();
                                }
                              )
                            );
                          })
                        );
                      })
                    );
                  })
                );
              })
            );
          })
        );
      }
    )
  );
  all.push(mouse);
  return all;
}

function initBuild() {
  centeredActor = undefined;
  let all = [];
  background.fadeStart = undefined;
  background.color = "black";
  all.push(background);
  all.push(
    new Text(
      20,
      40,
      'Click and drag the components to rebuild your ship! When finished click "Launch!"',
      "30px Helvetica"
    )
  );
  all.push(new Rectangle(50, 70, 550, 550, "white"));
  all.push(new Rectangle(650, 70, 550, 550, "white"));
  let grid = new Grid(650, 70, mouse);
  all.push(grid);
  for (let i = 0; i < 5; i++) {
    all.push(
      newComponent(
        80 + i * 95,
        100 + i * 25,
        0,
        mouse,
        grid,
        randomLetter(),
        randomIntFromInterval(1, getCount() - 1),
        keyboard
      )
    );
  }

  let commandModule = newComponent(500, 500, 0, mouse, grid, null, 0);
  all.push(commandModule);
  grid.addComponent(commandModule, 5, 5, mouse);

  all.push(
    new Button(
      1100,
      640,
      200,
      50,
      "Launch!",
      "black",
      "white",
      "35px Helvetica",
      38,
      mouse,
      () => {
        actors = initFly(grid);
      }
    )
  );

  all.push(mouse);
  return all;
}

function initFly(grid) {
  let all = [];
  background.fadeStart = -1;
  background.color = "black";
  all.push(background);
  all.push(new Text(20, 40, "The space station is up", "30px Helvetica"));
  let ship = new Ship(WIDTH / 2, (HEIGHT * 2) / 3, grid, keyboard);
  all.push(ship);
  all.push(mouse);
  centeredActor = ship;
  return all;
}

CanvasRenderingContext2D.prototype.roundRect = function (x, y, w, h, r) {
  if (w < 2 * r) r = w / 2;
  if (h < 2 * r) r = h / 2;
  this.beginPath();
  this.moveTo(x + r, y);
  this.arcTo(x + w, y, x + w, y + h, r);
  this.arcTo(x + w, y + h, x, y + h, r);
  this.arcTo(x, y + h, x, y, r);
  this.arcTo(x, y, x + w, y, r);
  this.closePath();
  return this;
};

canvasElem.addEventListener("mousedown", function (e) {
  e.preventDefault();
  mouse.click = true;
});

canvasElem.addEventListener("mouseup", function (e) {
  e.preventDefault();
  mouse.click = false;
});

canvasElem.addEventListener("mousemove", function (e) {
  e.preventDefault();
  var rect = canvas.getBoundingClientRect();
  mouse.x = e.x - rect.left;
  mouse.y = e.y - rect.top;
});

document.addEventListener(
  "keydown",
  (event) => {
    //console.log("Down", event.key);
    keyboard.add(event.key);
  },
  false
);

document.addEventListener(
  "keyup",
  (event) => {
    //console.log("Up", event.key);
    keyboard.remove(event.key);
  },
  false
);
