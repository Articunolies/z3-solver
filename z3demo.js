import { init } from 'z3-solver';

const { Context } = await init();
const { Solver, Int, And, Or, Distinct } = new Context("main");

// Inside the Fence
let solver = new Solver();
let x = Int.const('x');
let y = Int.const('y');

solver.add(And(x.gt(5), x.lt(10), y.gt(15), y.lt(25)));

console.log(await solver.check());
let model = solver.model();
let xVal = model.eval(x);
let yVal = model.eval(y);
console.log(`Inside the fence: x = ${xVal}, y = ${yVal}`);

// On the Fence
solver = new Solver();
x = Int.const('x');
y = Int.const('y');

solver.add(Or(And(x.eq(5), y.gt(15), y.lt(25)), And(y.eq(15), x.gt(5), x.lt(10))));

console.log(await solver.check());
model = solver.model();
xVal = model.eval(x);
yVal = model.eval(y);
console.log(`On the fence: x = ${xVal}, y = ${yVal}`);

// Outside the Fence
solver = new Solver();
x = Int.const('x');
y = Int.const('y');

solver.add(And(Or(x.lt(5), x.gt(10), y.lt(15), y.gt(25)), x.ge(8), y.ge(20)));

console.log(await solver.check());
model = solver.model();
xVal = model.eval(x);
yVal = model.eval(y);
console.log(`Outside the fence: x = ${xVal}, y = ${yVal}`);