class Monarch {
    constructor(identity, predecessor) {
        this.identity = identity;
        this.regnalName = generateRegnalName();
        this.regnalNumber = computeRegnal();
        this.number = 1;

        [this.reignStart, this.reignStartAge] = generateReignStart();
        [this.reignEnd, this.reignEndAge] = generateReignEnd();
        this.reignDuration = computeReign();
        this.events = [];

        if(this.identity.father != undefined) {
            this.number = this.predecessor.number + 1;
        }

        this.successor = undefined;
        this.predecessor = predecessor;

        if(garanteedChildren == true || this.identity.fertilityStart < this.identity.death) {
            this.identity.married = True;
            while(this.identity.children == []) {
                this.identity.generateChildren();
            }
        }
    }

    computeRegnal() {

    }

    generateRegnalName() {

    }

    generateReignStart() {

    }

    generateReignEnd() {

    }

    computeReign() {

    }
}

class Person {
    constructor(birth, sex, father) {
        this.name = this.generateName(sex);
        this.family = this.generateDynasty();
        this.sex = sex;
        this.birth = birth;
        this.father = father;
        this.religion = this.generateReligion();
        this.traits = [];

        this.longevity = 1;
        this.maturity = this.computeMaturity();
        this.health = this.generateHealth();
        this.death = this.generateDeath();
        
        [this.fertility, this.fertilityStart] = this.generateFertility();
        this.children = [];
        this.nbChild = 0;
        this.generation = 0;

        this.number = "1";
        this.monarch = [];
        this.abdication = false;

    }

    generateName(sex) {
        return randomName(sex);
    }

    generateDynasty() {

    }

    generateReligion() {

    }

    generateDeath() {


        return new Date(this.birth.getFullYear() + age, Math.floor(Math.random()*12), Math.floor(Math.random()*31));
    }

    generateHealth() {
        return 0;
    }

    generateFertility() {
        return [undefined, undefined];
    }

    generateChildren() {

        function generateChild() {

        }
    }

    computeLifespan() {
        var age = this.death.getFullYear() - this.birth.getFullYear();
        if(this.death.getMonth() < this.birth.getMonth()) {
            age--;
        } else {
            if(this.death.getMonth() == this.birth.getMonth()) {
                if(this.death.getDate()<this.birth.getDate()) {
                    age--;
                }
            }
        }

        return age;
    }

    computeSuccessor() {
        return null;
    }

    computeMaturity() {        
        return new Date(this.birth.getFullYear() + maturity[0], this.birth.getMonth() + maturity[1], this.birth.getDate() + maturity[2]);
    }

    toString() {

    }

    json() {

    }
}

var maturity = [21, 0, 0];

var minAge = 25;

var founder = new Person(new Date(154, 04, 05), "M", undefined);

console.log(founder);