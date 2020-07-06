// const p5 = require('p5');

// const ui = require('./ui.js');

function display (p, pos, vel) {
  //p.line(pos.x, pos.y, (pos.x + vel.x), (pos.y + vel.y));
  //p.fill(0);
  //p.ellipse(pos.x, pos.y, 50);
  p.point(pos.x, pos.y);

}

function update (p, t, pos, vel, seed) {
  const w = p.windowWidth;
  const h = p.windowHeight;

  pos.x = mod((pos.x + vel.x), w);
  pos.y = mod((pos.y + vel.y), h);

  var r = p5.Vector.fromAngle(p.noise(seed, t) * p.TWO_PI);
  vel.x = r.x;
  vel.y = r.y;

  vel.add(flow(p, pos)).mult(3);
}

function flow (p, pos) {
  let r = p.noise(pos.x / 100, pos.y / 100) * p.TWO_PI;
  return p5.Vector.fromAngle(r).mult(2);
}

function mod (x, n) {
  return ((x % n) + n ) % n;
}

var sketch = function (p) {
  const w = p.windowWidth;
  const h = p.windowHeight;
  let t = 0;
  let n = 800;
  let particles = [];


  p.setup = function() {
    p.colorMode(p.HSB);
    p.createCanvas(w, h);
    p.stroke(0, 10, 30, 30, 30, 30);
    p.stroke("#962323");


//possible colors:   #8C0404  #C62127 #582B36 #

   // p.strokeWeight(6);

    for (var i = 0; i < n; i++) {
      particles.push({
          pos: p.createVector(p.random(w), p.random(h)),
          vel: p.createVector(0,0),
          seed: i
        });
    }
  };

  p.draw = function() {
    particles.forEach( function(prtcl) {
      display(p, prtcl.pos, prtcl.vel);
      update(p, t, prtcl.pos, prtcl.vel, prtcl.seed);
    });
    t += 0.002;
  };
};

new p5(sketch);
