import Person from './person.js';

var founder = new Person(0, new Date(2001, 6, 7), "M", undefined);

console.log(founder.birth);
console.log(founder.death);
console.log(founder);