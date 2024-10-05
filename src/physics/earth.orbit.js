

// DATA FOR EARTH's ORBIT

let a = 1.00000261; //semi major axis of earth in AU
let e = 0.01671123; //eccentricity of earth's orbit
let b = a * Math.sqrt(1 - Math.pow(e, 2)); //semi minor axis
let c = e * a; //distance from centre to a focus

// COORDINATES OF FOCUS - coordinates of focus

let xc = -c;
let yc = 0;
let zc = 0;

// SEQUENCE OF ANGLES - creates an array of 80 values from -pi to pi radians

const numOfPts = 80;
const piPts = Array.from({length: numOfPts}, (v, i) => -Math.PI + (i * (2* Math.PI) / (numOfPts - 1)));

// PARAMETRIC EQUATIONS - calculating coordinates of points on the ellipse

x = piPts.map( p => a * Math.cos(p) - e);
y = piPts.map( p => a * Math.sqrt(1 - Math.pow(e, 2)) * Math.sin(p));
z = new Array (80).fill(0);


