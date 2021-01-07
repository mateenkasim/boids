# Boids
A flocking algorithm based on Craig Reynold's original Boids model. Implemented using p5.js functionality.

[View Here.](https://editor.p5js.org/mateenkasim/full/dM79WCTdc)

## The algorithm
Flocking is based on 3 rules: **separation** (avoid crashing into other boids), **alignment** (moving to the center of mass of other boids), and **steering** (aligning the velocity vector to that of other boids). This creates flocking behavior where no individual boid is the "leader" of the flock. These boids have been given an additional **range of vision**, so they can only align to and steer with the boids within their field of view. This creates groups within the flock that break apart and come together, as real flocks appear to do. The boids are also encouraged to steer away from the **edges** of the canvas.

All rules are implented as vector additions to each boid's velocity vector.

## Sources
- [Pseudocode explanation of Boids in general](http://www.vergenet.net/~conrad/boids/pseudocode.html)
- [Destin Sandlin's video on flocking via YouTube, *Smarter Every Day*](https://www.youtube.com/watch?v=4LWmRuB-uNU)
