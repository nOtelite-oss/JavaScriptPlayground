class Particle {
  constructor(x, y, vx, vy) {
    this.x = x;
    this.y = y;
    this.vx = vx;
    this.vy = vy;
  }

  move(time) {
    this.x += this.vx * time;
    this.y += this.vy * time;
  }

  bounce(width, height) {
    if (this.x < 0 || this.x > width) {
      this.vx = -this.vx;
    }
    if (this.y < 0 || this.y > height) {
      this.vy = -this.vy;
    }
  }
}

const NUM_PARTICLES = 200;
const BOX_WIDTH = 1436;
const BOX_HEIGHT = 749;
const TIME_STEP = 0.1;

let particles = [];
for (let i = 0; i < NUM_PARTICLES; i++) {
  let x = Math.random() * BOX_WIDTH;
  let y = Math.random() * BOX_HEIGHT;
  let vx = Math.random() * 20 - 10;
  let vy = Math.random() * 20 - 10;
  particles.push(new Particle(x, y, vx, vy));
}

function simulate() {
  let cellSize = Math.ceil(Math.sqrt(particles.length));

  let grid = [];
  for (let i = 0; i < cellSize; i++) {
    grid[i] = [];
    for (let j = 0; j < cellSize; j++) {
      grid[i][j] = [];
    }
  }

  for (let i = 0; i < particles.length; i++) {
    let particle = particles[i];

    // Calculate the cell coordinates
    let cellX = Math.floor(particle.x / cellSize);
    let cellY = Math.floor(particle.y / cellSize);

    grid[cellX][cellY].push(particle);
  }

  for (let i = 0; i < cellSize; i++) {
    for (let j = 0; j < cellSize; j++) {
      let cell = grid[i][j];

      for (let k = 0; k < cell.length; k++) {
        let particle = cell[k];

        if (particle.x <= 0 || particle.x >= canvas.width - 5) {
          particle.vx *= -1;
        }
        if (particle.y <= 0 || particle.y >= canvas.height - 5) {
          particle.vy *= -1;
        }

        for (let l = k + 1; l < cell.length; l++) {
          let other = cell[l];

          let dx = particle.x - other.x;
          let dy = particle.y - other.y;
          let distanceSquared = dx * dx + dy * dy;

          if (distanceSquared < 25) {
            let vx = particle.vx;
            particle.vx = other.vx;
            other.vx = vx;

            let vy = particle.vy;
            particle.vy = other.vy;
            other.vy = vy;
          }
        }
      }
    }
  }
}
for (let i = 0; i < particles.length; i++) {
  let particle = particles[i];

  particle.x += particle.vx;
  particle.y += particle.vy;
}
setInterval(simulate, 100);

const canvas = document.getElementById('simulation');
const ctx = canvas.getContext('2d');

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let particle of particles) {
    ctx.fillRect(particle.x, particle.y, 5, 5);
  }
}

setInterval(function () {
  simulate();
  draw();
}, 100);
