class Actor {
  constructor(x, y, shape) {
    this.x = x;
    this.y = y;
    this.shape = shape;
  }

  draw(ctx) {
    ctx.save();
    ctx.fillStyle = "red";
    ctx.fillRect(this.x, this.y, CELL_SIZE, CELL_SIZE);
    ctx.restore();
  }

  update() {}
}

class Text extends Actor {
  constructor(x, y, value, font) {
    super();
    this.x = x;
    this.y = y;
    this.value = value;
    this.font = font;
  }

  draw(ctx) {
    ctx.save();
    ctx.fillStyle = "white";
    ctx.font = this.font;
    ctx.fillText(this.value, this.x, this.y);
    ctx.restore();
  }

  //update() {}
}

class Streak extends Actor {
  constructor(x, y, length) {
    super();
    this.x = x;
    this.y = y;
    this.length = length;
  }

  draw(ctx) {
    ctx.save();
    ctx.lineWidth = 3;
    ctx.fillStyle = "white";
    ctx.strokeStyle = "white";
    ctx.beginPath();
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(this.x + this.length, this.y + this.length);
    ctx.stroke();
    ctx.restore();
  }

  update() {
    this.x -= 15;
    this.y -= 15;
    if (this.x < 0) {
      this.x = WIDTH;
    }

    if (this.y < 0) {
      this.y = HEIGHT;
    }
  }
}

class Ship extends Actor {
  constructor(x, y, angle) {
    super();
    this.x = x;
    this.y = y;
    this.angle = angle;
    this.xShake = 0;
    this.yShake = 0;
    this.speed = 0;
  }

  draw(ctx) {
    ctx.save();
    ctx.translate(WIDTH / 2, HEIGHT / 2);
    ctx.rotate((this.angle * Math.PI) / 180);
    ctx.translate(this.x + this.xShake, this.y + this.yShake);
    ctx.lineWidth = 3;
    ctx.fillStyle = "white";
    ctx.strokeStyle = "white";
    ctx.fill(SPACE_SHIP);
    ctx.restore();
  }

  update() {
    this.xShake = randomIntFromInterval(-2, 2);
    this.yShake = randomIntFromInterval(-2, 2);
    this.y += this.speed;
  }
}

class Button extends Actor {
  constructor(x, y, w, h, text, buttonColor, textColor, onClick) {
    super();
    this.x = x;
    this.y = y;
    this.text = text;
    this.buttonColor = buttonColor;
    this.originalButtonColor = buttonColor;
    this.textColor = textColor;
    this.originalTextColor = textColor;
    this.w = w;
    this.h = h;
    this.collide = true;
    this.onClick = onClick;
  }

  draw(ctx) {
    ctx.save();

    ctx.fillStyle = this.buttonColor;
    ctx.strokeStyle = this.textColor;

    ctx.roundRect(this.x, this.y, this.w, this.h, 10).fill();
    ctx.roundRect(this.x, this.y, this.w, this.h, 10).stroke();

    ctx.fillStyle = this.textColor;
    ctx.font = `${this.h / 1.8}px Helvetica`;
    ctx.fillText(this.text, this.x + 20, this.y + 70);
    ctx.restore();
  }

  update(collisions) {
    let mouse = false;
    for (let col of collisions) {
      if (col instanceof Mouse) {
        this.buttonColor = this.originalTextColor;
        this.textColor = this.originalButtonColor;
        mouse = true;
        if (col.click) {
          // TODO: this happens if you click off the button and drag onto it
          this.onClick();
          return true;
        }
      }
    }
    if (!mouse) {
      this.buttonColor = this.originalButtonColor;
      this.textColor = this.originalTextColor;
    }
  }
}

class Mouse extends Actor {
  constructor(x, y) {
    super();
    this.x = x;
    this.y = y;
    this.collide = true;
    this.w = 2;
    this.h = 2;
  }

  draw(ctx) {
    ctx.save();
    ctx.fillStyle = "yellow";
    ctx.fillRect(this.x, this.y, this.w, this.h, 10);
    ctx.restore();
  }

  update() {}
}

class Background extends Actor {
  constructor() {
    super();
    this.fadeStart = 999999999;
    this.color = "black";
  }

  draw(ctx) {
    ctx.save();
    ctx.fillStyle = this.color;
    ctx.fillRect(0, 0, WIDTH, HEIGHT);
    ctx.restore();
  }

  update(collisions, globalCounter) {
    if (this.fadeStart <= globalCounter) {
      let progress = (globalCounter - this.fadeStart) / 150;
      if (progress >= 1) {
        this.color = "rgb(135,206,235)";
      } else {
        this.color = getColor(progress, [
          "rgb(0,0,0)", // Black
          "rgb(135,206,235)", // Sky Blue
        ]);this.x += this.speed;
      }
    }
  }
}

class Future extends Actor {
  constructor(counter, onCounter) {
    super();
    this.counter = counter;
    this.onCounter = onCounter;
  }

  update(collisions, globalCounter) {
    if (globalCounter >= this.counter) {
      this.onCounter();
      return true;
    }
  }
}

class Rectangle extends Actor {
  constructor(x,y,w,h,color) {
    super();
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.color = color;
  }

  draw(ctx) {
    ctx.save();
    ctx.strokeStyle = this.color;
    ctx.roundRect(this.x, this.y, this.w, this.h, 10).stroke();
    ctx.restore();
  }
}

class DirectionalParticle extends Actor {
  constructor(x, y, angle, count, frequency, length, size, color, spread) {
    super();
    this.x = x;
    this.y = y;
    this.angle = angle;
    this.length = length;
    this.size = size;
    this.color = color;
    this.particles = [];
    this.count = count;
    this.frequency = frequency;
    this.speed = 0;
    this.spread = spread;
  }

  draw(ctx) {
    for (let part of this.particles) {
      part.draw(ctx);
    }
  }

  update() {
    let toRemove = [];

    this.x += this.speed;
    this.y += this.speed;

    for (let part of this.particles) {
      if (part.update()) {
        toRemove.push(part);
      }
    }
    // Remove dead parts
    this.particles = this.particles.filter(function (el) {
      return toRemove.indexOf(el) < 0;
    });

    // Add new ones
    let random = Math.random();
    if (random < this.frequency) {
      for (let i = 0; i < this.count; i++) {
        this.particles.push(
          new Particle(
            this.x,
            this.y,
            this.angle,
            this.length,
            this.size,
            this.color,
            this.spread
          )
        );
      }
    }
  }
}

class Particle extends Actor {
  constructor(x, y, angle, length, size, color, spread) {
    super();
    this.speed = 15;
    this.x = x;
    this.y = y;
    this.angle = angle;
    this.length = length;
    this.size = size;
    this.initialColor = color;
    this.color = color[0];
    this.counter = 0;
    this.spread = spread;
  }

  draw(ctx) {
    ctx.save();
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI); // Draw circle
    ctx.fill();
    ctx.restore();
  }

  update() {
    this.x -=
      this.speed * Math.sin((-this.angle / 360) * 2 * Math.PI) +
      randomIntFromInterval(-this.spread, this.spread);
    this.y -=
      this.speed * Math.cos((-this.angle / 360) * 2 * Math.PI) +
      randomIntFromInterval(-this.spread, this.spread);
    this.size = Math.max(this.size + randomIntFromInterval(0, 3), 0);

    this.color = getColor(this.counter / this.length, this.initialColor);

    this.counter++;
    if (this.counter > this.length) {
      return true;
    }
  }
}
