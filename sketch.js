let boids = [];
let canvasWidth;
let canvasHeight;
const colors = ['red','blue','orange','green','yellow','magenta'];
let qt;

function setup() {
  canvasWidth = windowWidth;
  canvasHeight = windowHeight;
  createCanvas(canvasWidth, canvasHeight);
  angleMode(DEGREES);

  // Initialize 
  for (let i = 0; i < 400; i++) {
    boids.push(new Boid(Boid.viewRange*2*cos(i*5)+canvasWidth/2, Boid.viewRange*2*sin(i*5)+canvasHeight/2));
  }
}

function draw() {
  qt = new Quadtree({x:0, y:0, width:canvasWidth, height:canvasHeight}, 10, 4);
  background('black');
  boids.forEach(boid => {
    boid.display();
    qt.insert({x:boid.position.x-boid.diameter, y:boid.position.y-boid.diameter, width:boid.diameter*2, height:boid.diameter*2, b:boid});
  });
  moveBoids();
}

function mouseClicked() {
  boids.push(new Boid(mouseX, mouseY, Math.random()*4-2, Math.random()*4-2));
}

function moveBoids() {
  boids.forEach(boid => {
    let close = qt.retrieve({x:boid.position.x-boid.diameter, y:boid.position.y-boid.diameter, width:boid.diameter*2, height:boid.diameter*2, b:boid});

    let v1 = rule1(boid, close);
    let v2 = rule2(boid, close);
    let v3 = rule3(boid, close);
    let v4 = rule4(boid, close);

    boid.vel.add(v1);
    boid.vel.add(v2);
    boid.vel.add(v3);
    boid.vel.add(v4);
  });
  boids.forEach(boid => {
    boid.limitVel();
    boid.position.add(p5.Vector.div(boid.vel,1));
  });
}
