# Boids
A flocking algorithm based on Craig Reynold's original Boids model. Implemented using p5.js functionality. Initialized with a set number of boids, but clicking on the screen adds new boids into the simulation.

[View Here.](https://editor.p5js.org/mateenkasim/full/dM79WCTdc)

## The algorithm
Flocking is based on 3 rules: **separation** (avoid crashing into other boids), **alignment** (moving to the center of mass of other boids), and **steering** (aligning the velocity vector to that of other boids). This creates flocking behavior where no individual boid is the "leader" of the flock. These boids have been given an additional **range of vision**, so they can only align to and steer with the boids within their field of view. This creates groups within the flock that break apart and come together, as real flocks appear to do. The boids are also encouraged to steer away from the **edges** of the canvas.

All rules are implented as vector additions to each boid's velocity vector. Boids added by clicking are given pseudo-randomized velocity vectors.

## Edits
1. Initial boids examined all other boids for proximity before changing their velocity vectors. As in all many-particle simulations, this checking is a huge bottleneck. Obviously, there are some pairs of boids that should not be checked for proximity (e.g. boids on opposite sides of the canvas). To optimize, [Timo Hausmann's](https://github.com/timohausmann) quadtree implementation was used to decrease the number of proximity checks. Quick analytics showed 1/2 (and sometimes 1/4) as many boids being checked every iteration. Number of boids that can be simulated with little to no lag went up from 150 to up to 400.

## Sources
- [Pseudocode explanation of Boids in general](http://www.vergenet.net/~conrad/boids/pseudocode.html)
- [Destin Sandlin's video on flocking via YouTube, *Smarter Every Day*](https://www.youtube.com/watch?v=4LWmRuB-uNU)
- [Timo Hausmann's easy-to-use quadtree](https://github.com/timohausmann/quadtree-js)
