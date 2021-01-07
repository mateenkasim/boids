let boids = [];
let canvasWidth;
let canvasHeight;
const colors = ['red','blue','orange','green','yellow','magenta'];


function setup() {
  canvasWidth = windowWidth;
  canvasHeight = windowHeight;
  createCanvas(canvasWidth, canvasHeight);
  angleMode(DEGREES);

  // Initialize 
  for (let i = 0; i < 150; i++) {
    boids.push(new Boid(Boid.viewRange*2*cos(i*5)+canvasWidth/2, Boid.viewRange*2*sin(i*5)+canvasHeight/2));
  }
}

function draw() {
  background('black');
  boids.forEach(x => x.display());
  moveBoids();
}

function mouseClicked() {
  boids.push(new Boid(mouseX, mouseY, Math.random()*4-2, Math.random()*4-2));
}

function moveBoids() {
  boids.forEach(boid => {
    let v1 = rule1(boid);
    let v2 = rule2(boid);
    let v3 = rule3(boid);
    let v4 = rule4(boid);
    //let v5 = rule5(boid);

    boid.vel.add(v1);
    boid.vel.add(v2);
    boid.vel.add(v3);
    boid.vel.add(v4);
    //boid.vel.add(v5);
  });
  boids.forEach(boid => {
    boid.limitVel();
    boid.position.add(p5.Vector.div(boid.vel,1));
  });
}