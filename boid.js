// Go to center of mass of flock
function rule1(boid) {
  let com = createVector();
  let res = createVector();
  let count = 0;
  if (boids.length > 1) {
    boids.forEach(neighbor => {
      let d = p5.Vector.dist(boid.position,neighbor.position);
      if (boid !== neighbor && d < Boid.viewRange) {
        com.add(neighbor.position);
        count++;
      }
    })
    if (count > 0){
      com.div(count); 
      res = com.sub(boid.position);
    }

    res.div(500);
  }

  return res;
}

// Avoid collisions
function rule2(boid) {
  let range = 20;
  let res = createVector(0, 0);
  let count = 0;
  boids.forEach( neighbor => {
    let d = p5.Vector.dist(boid.position,neighbor.position);
    if ((d > 0) && (d < range)) {
      let diff = p5.Vector.sub(boid.position, neighbor.position);
      diff.normalize();
      diff.div(d);
      res.add(diff);
      count++;
    }
  })

  if (count > 0) {
    res.div(count);
  }
  if (res.mag() > 0) {
    res.normalize();
    res.mult(Boid.vLimit);
    res.sub(boid.velocity);
    res.limit(0.2);
  }
  return res;
}

// Match velocity of flock
function rule3(boid) {
  let res = createVector();
  let count = 0;
  if (boids.length > 1) {
    boids.forEach(neighbor => {
      let d = p5.Vector.dist(boid.position,neighbor.position);
      if (boid !== neighbor && d < Boid.viewRange) {
        res.add(p5.Vector.sub(neighbor.vel,boid.vel));
        count++;
      }
    })
    if (count > 0)
      res.div((count)*8);
  }

  return res;
}

// Avoid walls
function rule4(boid) {
  let res = createVector();
  if (boid.position.x < 40) {
    res.add(0.6);
  }
  if (boid.position.x > canvasWidth - 40) {
    res.add(-0.6);
  }
  if (boid.position.y < 40) {
    res.add(0,0.6);
  }
  if (boid.position.y > canvasHeight - 40) {
    res.add(0,-0.6);
  }
  return res;
}

class Boid {
  constructor(x=canvasWidth/2, y=canvasHeight/2, vx=0, vy=0) {
    this.position = createVector(x, y);
    this.vel = createVector(vx, vy);
    this.diameter = 12;
    this.color = colors[Math.floor(Math.random()*colors.length)];
  }

  static get vLimit() {
    return 5;
  }
  
  static get viewRange() {
    return 40;
  }

  display() {
    push();
    fill(this.color);
    translate(this.position.x, this.position.y);
    rotate(this.vel.heading() - 90);
    triangle(0,0,this.diameter,0,this.diameter / 2,this.diameter * 1.73);
    pop()
    
  }

  limitVel() {
    if (this.vel.mag() > Boid.vLimit) {
      this.vel.normalize();
      this.vel.mult(Boid.vLimit);
    }
    if (this.vel.mag() < 3) {
      this.vel.normalize();
      this.vel.mult(3);
    }
  }

}
