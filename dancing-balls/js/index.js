var canvas = document.querySelector("canvas");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext("2d");

var mouse = {
  x: undefined,
  y: undefined
};

var maxRadius = 45;

var colorArray = ["#105B63", "#FFFAD5", "#FFD34E", "#DB9E36", "#BD4932"];

window.addEventListener("mousemove", function(event) {
  mouse.x = event.x;
  mouse.y = event.y;
});

window.addEventListener("resize", function(event) {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  init();
});

function Circle(x, y, dx, dy, radius) {
  this.x = x;
  this.y = y;
  this.dx = dx;
  this.dy = dy;
  this.radius = radius;
  this.minRadius = radius;
  this.color = colorArray[Math.floor(Math.random() * colorArray.length)];

  this.draw = function() {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.fillStyle = this.color;
    c.fill();
  };

  this.update = function() {
    if (this.x + radius > innerWidth || this.x - this.radius < 0) {
      this.dx = -this.dx;
    }

    if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
      this.dy = -this.dy;
    }

    this.x += this.dx;
    this.y += this.dy;

    //interactivity

    if (
      mouse.x - this.x < 50 &&
      mouse.x - this.x > -50 &&
      mouse.y - this.y < 50 &&
      mouse.y - this.y > -50
    ) {
      if (this.radius < maxRadius) {
        this.radius += 1;
      }
    } else if (this.radius > this.minRadius) {
      this.radius -= 1;
    }

    this.draw();
  };
}

var circleArray = [];

function init() {
  circleArray = [];

  for (var i = 0; i < 800; i++) {
    var x = Math.random() * (innerWidth - radius * 3) + radius;
    var y = Math.random() * (innerHeight - radius * 3) + radius;
    var dx = Math.random() - 0.5;
    var dy = Math.random() - 0.5;
    var radius = Math.random() * 5 + 1;

    circleArray.push(new Circle(x, y, dx, dy, radius));
  }
}

function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, innerWidth, innerHeight);

  for (var i = 0; i < circleArray.length; i++) {
    circleArray[i].update();
  }
}

init();

animate();