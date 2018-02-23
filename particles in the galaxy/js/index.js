

/******************************************************************/


/**
 * I wanted to make one of those particle systems I'm currently reading http://natureofcode.com/book/chapter-1-vectors/
 * here are the processing examples converted to JScript
 * @author gary <garyconstable80@gmail.com>
 */


/******************************************************************/


var PVector = function( x, y ){ 
  this.x = x;
  this.y = y;
}

PVector.prototype.add = function( vector ){
    this.y = this.y + vector.y;
    this.x = this.x + vector.x;
} 

PVector.prototype.subtract = function( vector ){
    this.x = this.x - vector.x;
    this.y = this.y - vector.y;
}

PVector.prototype.multiply = function( n ){
   this.x = this.x * n;
   this.y = this.y * n;
}

PVector.prototype.divide = function( n ){
   this.x = this.x / n;
   this.y = this.y / n;
}

PVector.prototype.magnitude = function(){
  return Math.sqrt(this.x * this.x + this.y * this.y);
}

PVector.prototype.normalize = function(){
  var m = this.magnitude();
  this.divide(m);
} 

PVector.prototype.limit = function( max ){
    if (this.magnitude() > max) {
      this.normalize();
      this.multiply(max);
    }
  }


/******************************************************************/


var c = document.createElement('canvas');
    c.id = "canvas";
    c.width = $(window).width()-20;
    c.height =  $(window).height()-20;
    //c.style.border = "1px solid white";

    document.getElementsByTagName("body")[0].style.background = 'black';
    document.getElementsByTagName("body")[0].appendChild(c); 

var mousePos = {x:0,y:0};
    document.getElementById('canvas').onmousemove = function(e) {
        mousePos.x = e.clientX;
        mousePos.y = e.clientY;
    }


/******************************************************************/


var particle = function(){
    this.location = new PVector( (Math.random() * c.width), (Math.random() * c.height) );
    this.velocity = new PVector( 0, 0 );
    this.acceleration = 0;
    this.topspeed = 10;
} 

particle.prototype.update = function(){
    
    //mouse 
    var mouse = new PVector(mousePos.x,mousePos.y);
  
    //direction
    var dir = new PVector(mouse.x, mouse.y);
    dir.subtract(this.location);
    dir.normalize();
    dir.multiply(0.5);
  
    //acceleration
    this.acceleration = dir;
  
    //velocity
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.topspeed); 
  
    //position
    this.location.add(this.velocity);
}

particle.prototype.bounds = function(){
    
    if (this.location.x > c.width) {
        this.location.x = 0;
    } else if (this.location.x < 0) {
        this.location.x = c.width;
    }
 
    if (this.location.y > this.height) {
        this.location.y = 0;
    }  else if (this.location.y < 0) {
        this.location.y = c.height;
    }
}

particle.prototype.draw = function(){
  
    this.canvas = document.getElementById('canvas'); 
    this.ctx = canvas.getContext("2d");
    this.ctx.fillStyle = "#FFFFFF";
    this.ctx.fillRect(this.location.x,this.location.y,1,1); 
}


/******************************************************************/


window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame       ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame    ||
          function( callback ){
              window.setTimeout(callback, 1000 / 60);
          };
})();


/******************************************************************/


var particles = new Array(),
    max = 1500;    

for(var i=0; i<max;i++){
    particles.push( new particle() ); 
}

(function animloop(){
  requestAnimFrame(animloop);

  //clear the canvas
  ctx = canvas.getContext("2d");
  ctx.clearRect ( 0 , 0 , c.width , c.height );
  
  //draw the particles
  for(var i = 0; i<max; i++) {
    particles[i].update();
    particles[i].bounds();
    particles[i].draw(); 
  }
  
})(); 


/******************************************************************/