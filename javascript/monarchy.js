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
        this.lifespan = this.computeLifespan();
        
        this.marriage = this.generateMarriage();
        this.spouse = undefined;
        this.children = [];
        this.nbChild = 0;
        this.generation = 0;
        this.generateChildren();

        this.number = "1";
        this.monarch = [];
        this.abdication = false;


        console.log(this.death);
    }

    generateName(sex) {
        return randomName(sex);
    }

    generateDynasty() {
        return undefined;
    }

    generateReligion() {
        return undefined;
    }

    generateDeath() {
        var days = 0;
        var simulateHealth = this.health;

        var alive = true;
        while(alive) {
            days++;

            if(days%365==0 && days>365*25) {
                var threshold = 7.24 + 1.28 * (Math.floor(days/365)-15);
                if(Math.random()*100<threshold) {
                    var change = (Math.random()*300-100)/100;
                    simulateHealth-=change;
                }
            }

            if(simulateHealth<2 && days%45==0 && days>365*15) {
                var threshold = 25 + simulateHealth*20;

                if(Math.random()*(2 + 1.5 * Math.floor(days/365*5))<threshold) {
                    alive = false;
                    days += Math.floor(Math.random()*90);
                }
            }
        }

        var years = Math.floor(days/365);
        days -= years*365;
        var months = Math.floor(days/30);
        days -= months;
        var nbdays = days;


        return new Date(this.birth.getFullYear() + years, this.birth.getMonth() + months, this.birth.getDate() + nbdays);
    }

    generateHealth() {
        return Math.floor(Math.random()*800+400)/100;
    }

    generateMarriage() {
        var minYear = this.maturity.getFullYear();
        var maxYear = this.death.getFullYear()-1;

        if(Math.random()<0.5) {
            var year = Math.floor(Math.random()*(maxYear-minYear))+minYear;
            return new Date(year, Math.floor(Math.random()*12), Math.floor(Math.random()*31));
        } else {
            return NaN;
        }

    }

    generateChildren() {
        var laid = 0;
        var children = 0;
        var cooldown = this.birth;
        for(var i=maturity[0]; i< this.lifespan; i+=0.25) {
            var fertility = 120-Math.floor(i/10)*10;
            var controlDate = new Date(this.birth.getFullYear()+Math.floor(i), this.birth.getMonth()+i-Math.floor(i), this.birth.getDate());

            console.log(controlDate);
            if(Math.random()<0.33 && controlDate>=this.marriage && !isNaN(this.marriage)) {
                laid++;
                console.log("*moans*");

                if(Math.random() * (120 + children * 10) < fertility && controlDate>cooldown) {
                    console.log("Child spawned");
                    children++;
                    var birth = new Date(controlDate.getFullYear(), controlDate.getMonth(), controlDate.getDate()+270);
                    cooldown = new Date(birth.getFullYear(), birth.getMonth(), birth.getDate() + Math.floor(Math.random()*1500));
                }
            }
        }

        console.log(laid);
        console.log(children);

        function generateChild(birth) {

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