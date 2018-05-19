var points = [];
var steps = 0; //current step
var hueBase = 180; //base color out of 360
var hueRange = 60; //variance off of base
var maxSteps = 1000; //steps to completion
var numPoints = 10; //points per group
var subGroups = 4; //particle groups
var animation_speed = 5; //how many steps per frame
var sinkFactor = .99; //how fast distance decreases

var orbitMin = 0; //minimum rotation
var orbitMax = .01; //maximum rotation

function Point(x = 0, y = 0){
  this.x = x;
  this.y = y;
  this.orbit;
  this.hue = random(hueRange) + hueBase;
  this.orbitSpeed = random(orbitMin, orbitMax);
  
  this.update = function(){
    var d = distP(this, this.orbit);
    d *= sinkFactor
    var a = atan2P(this, this.orbit);
    a += this.orbitSpeed;
    this.x = cos(a)*d + this.orbit.x;
    this.y = sin(a)*d + this.orbit.y;
  }
  
  this.render = function(){
    stroke(this.hue, 60, 100, .01);
    line(this.x, this.y, this.orbit.x, this.orbit.y);
  }
}

function distP(p1, p2){
  return dist(p1.x, p1.y, p2.x, p2.y);
}

function atan2P(p1, p2){
  return atan2(p1.y - p2.y, p1.x - p2.x);
}

function setup(){
  createCanvas();
  colorMode(HSB);
  blendMode(ADD);
  windowResized();
  init();
}

function init(){
  points = [];
  clear();
  background(0);
  steps = 0;
  
  for (var j = 0; j < subGroups; j++){
    var sPoints = [];
    for (var i = 0; i < numPoints; i++){
      sPoints.push(new Point(random(width), random(height)));
    }
    var l = sPoints.length;
    for (var i = 0; i < l; i++){
      var a = i;
      while (a == i) a = floor(random(l));
      sPoints[i].orbit = sPoints[a];
    }
    points.push(sPoints);
  }
}

function draw(){
  for (var n = 0; n < animation_speed; n++){
    for (var j = 0; j < points.length; j++){
      var sPoints = points[j];
      var l = sPoints.length;
      for (var i = 0; i < l; i++){
        var p = sPoints[i];
        p.update();
        p.render();
      }
    }
    steps++;
  }
  if (steps > maxSteps) noLoop();
}

function mousePressed(){
  init();
  loop();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  pixelDensity(1);
  init();
  loop();
}