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

// Children Puzzle
solver = new Solver(); 

// Define children and pets
const Bob = Int.const('Bob');
const Mary = Int.const('Mary');
const Cathy = Int.const('Cathy');
const Sue = Int.const('Sue');

const Dog = Int.val(0);
const Cat = Int.val(1);
const Bird = Int.val(2);
const Fish = Int.val(3);

// Each child has one unique pet
solver.add(And(
    Bob.eq(Dog),
    Sue.eq(Bird),
    Mary.neq(Fish),
    Or(Mary.eq(Cat), Mary.eq(Bird), Mary.eq(Dog)),
    Or(Cathy.eq(Cat), Cathy.eq(Fish), Cathy.eq(Bird), Cathy.eq(Dog)),
    Bob.neq(Mary),
    Bob.neq(Cathy),
    Bob.neq(Sue),
    Mary.neq(Cathy),
    Mary.neq(Sue),
    Cathy.neq(Sue)
));

// Check the solution
console.log(await solver.check());
const model2 = solver.model();
const bobPet = model2.eval(Bob).toString();
const maryPet = model2.eval(Mary).toString();
const cathyPet = model2.eval(Cathy).toString();
const suePet = model2.eval(Sue).toString();

const petNames = ['Dog', 'Cat', 'Bird', 'Fish'];

console.log(`Bob has the ${petNames[bobPet]}`);
console.log(`Mary has the ${petNames[maryPet]}`);
console.log(`Cathy has the ${petNames[cathyPet]}`);
console.log(`Sue has the ${petNames[suePet]}`);