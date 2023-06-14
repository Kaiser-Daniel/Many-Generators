import Person from './person.js';

export default class Family{
    constructor() {
        this.members = [];
        this.relationships = {};
        this.marriages = {};
        this.houses = {};

        this.founder = new Person(0, new Date(2001, 6, 7), "M", undefined);
        this.members.push(this.founder);
    }
}