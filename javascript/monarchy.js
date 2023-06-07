class Monarch {
    constructor(identity, predecessor) {
        this.ID = 1;
        this.identity = identity;
        this.predecessor = predecessor;
        if(this.predecessor != undefined) {
            this.ID = this.predecessor.ID + 1;
        }

        this.regnalName = this.generateRegnalName();
        this.regnalNumber = this.computeRegnal();

        [this.reignStart, this.reignStartAge] = this.generateReignStart();
        [this.reignEnd, this.reignEndAge] = this.generateReignEnd();
        this.reignDuration = this.computeReign();
        this.events = [];

        reign += this.reignDuration;
        console.log(reign/this.ID);

        this.successor = this.nextMonarch();

        if(guaranteedChildren == true || this.identity.fertilityStart < this.identity.death) {
            this.identity.married = True;
            while(this.identity.children == []) {
                this.identity.generateChildren();
            }
        }
    }

    computeRegnal() {
        return regnal[this.identity.sex][this.regnalName];
    }

    generateRegnalName() {
        var name = "";


        if(Math.random()>(1/this.ID+0.33) && this.ID != 1 && Object.keys(regnal[this.identity.sex]).length>0) {
            var names = Object.keys(regnal[this.identity.sex]);
            var index = Math.floor(Math.random()*names.length);
            console.log(regnal[this.identity.sex]);
            name = names[index];
            regnal[this.identity.sex][name]++;
            console.log("Ancestral: " + name);
        } else {
            if(Math.random()>0.85) {
                name = this.identity.name;
            } else {
                name = this.identity.generateName(this.identity.sex);
            }
            regnal[this.identity.sex][name] = 1;
            console.log("Modern: " + name);
        }



        return name;
    }

    generateReignStart() {
        if(this.predecessor == undefined) {
            var start = this.identity.maturity;
            var end = this.identity.death;

            var year = Math.floor(Math.random()* (end.getFullYear()-start.getFullYear()))+start.getFullYear();
            var month = Math.floor(Math.random()*12);
            var day = Math.floor(Math.random()*30);

            start = new Date(year, month, day);

            var age = start.getFullYear() - this.identity.birth.getFullYear();
            if(start.getMonth()<this.identity.birth.getMonth()) {
                age--;
            } else {
                if(start.getMonth()==this.identity.birth.getMonth() && start.getDate()<this.identity.birth.getDate()) {
                    age--;
                }
            }
        } else {
            var start = this.predecessor.reignEnd;

            var age = start.getFullYear() - this.identity.birth.getFullYear();
            if(start.getMonth()<this.identity.birth.getMonth()) {
                age--;
            } else {
                if(start.getMonth()==this.identity.birth.getMonth() && start.getDate()<this.identity.birth.getDate()) {
                    age--;
                }
            }
        }
        return [start,age];
    }

    generateReignEnd() {
        var end = this.identity.death;

        var age = end.getFullYear() - this.identity.birth.getFullYear();
            if(end.getMonth()<this.identity.birth.getMonth()) {
                age--;
            } else {
                if(end.getMonth()==this.identity.birth.getMonth() && end.getDate()<this.identity.birth.getDate()) {
                    age--;
                }
            }
        return [end,age];
    }

    computeReign() {
        var duration = this.reignEnd.getFullYear() - this.reignStart.getFullYear();

        if(this.reignEnd.getMonth()<this.reignStart.getMonth()) {
            duration--;
        } else {
            if(this.reignEnd.getMonth()==this.reignStart.getMonth() && this.reignEnd.getDate()<this.reignStart.getDate()) {
                duration--;
            }
        }
        return duration;
    }

    nextMonarch() {
        var identity = founder.computeSuccessor(this.reignEnd, this);

        if(identity == null) {
            return null;
        }
        return new Monarch(identity, this);
    }

    toString() {
        var string = "name: "+ this.regnalName + " " +
         arabicToRoman(this.regnalNumber) + "<br>";
        
        string += "identity: "+ this.identity.toString() + "<br>";
        string += "reign: " +
            this.reignStart.getDay() + "." +
            this.reignStart.getMonth() + "." +
            this.reignStart.getFullYear() + " " +
            "(" +
            this.reignStartAge +
            ")" +
            "-" +
            this.reignEnd.getDay() + "." +
            this.reignEnd.getMonth() + "." +
            this.reignEnd.getFullYear() + " " +
            "(" +
            this.reignEndAge +
            ")" +
            "[" +
            this.reignDuration +
            "]<br>";

        return string;
    }

    json() {

    }
}

class Spouse {
    constructor(spouse) {

    }

    toString() {

    }

    json() {

    }
}

class Person {
    constructor(birth, sex, parent) {
        num ++;

        this.ID = this.generateID(parent);
        this.name = this.generateName(sex);
        this.family = this.generateDynasty();
        this.sex = sex;
        this.birth = birth;
        this.parent = parent;
        this.religion = this.generateReligion();
        this.traits = [];
        this.generation = this.computeGeneration();

        this.longevity = 1;
        this.maturity = this.computeMaturity();
        this.health = this.generateHealth();
        this.death = this.generateDeath();
        this.lifespan = this.computeLifespan();
        this.libido = 1;

        age += this.lifespan;
        
        this.marriage = this.generateMarriage();
        this.spouse = undefined;
        this.children = [];
        this.nbChild = 0;
        this.generateChildren();

        this.monarch = [];
        this.abdication = false;
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
                var threshold = 7.06 + 0.86 * (Math.floor(days/365)-15);
                if(Math.random()*100<threshold) {
                    var change = (Math.random()*300-100)/100;
                    simulateHealth-=change;
                }
            }

            if(simulateHealth<2 && days%45==0 && days>365*25) {
                var threshold = 25 + (3-simulateHealth)*20;

                if(Math.random()*(100 - 1.33 * Math.floor(days/365*5))<threshold) {
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
        var parentBonus;
        if(this.parent == undefined) {
            parentBonus = 5;
        } else {
            parentBonus = this.parent.health;
            this.longevity = this.parent.longevity;
        }
        var min = 400*this.longevity + parentBonus*10;

        var max = 1500*(this.longevity*(0.8-this.longevity/10));

        var health = Math.floor(Math.random()*(max-min)+min)/100

        if(health>7) {
            this.longevity *= 1.04;
        } else {
            if(health<5) {
                this.longevity *= 0.098;
            }
        }

        console.log(this.name + " health:" + health);
        console.log(this.name + " longevity:" + this.longevity);
        return health;
    }

    generateMarriage() {
        var minYear = this.maturity.getFullYear();
        var maxYear = this.death.getFullYear()-1;

        if(Math.random()<0.33+1/this.generation) {
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
            var fertility = 120-Math.floor((i-maturity[0])/10)*10;
            var controlDate = new Date(this.birth.getFullYear()+Math.floor(i), this.birth.getMonth()+(i-Math.floor(i))*12, this.birth.getDate());

            if(Math.random()<0.125 && controlDate>=this.marriage && !isNaN(this.marriage)) {
                laid++;

                if(Math.random() * (120 + children * 20) + Math.floor(children/5)*33 < fertility && controlDate>cooldown && controlDate<cutoff) {
                    children++;
                    var birth = new Date(controlDate.getFullYear(), controlDate.getMonth(), controlDate.getDate()+270+Math.floor(Math.random()*90-45));
                    cooldown = new Date(birth.getFullYear(), birth.getMonth(), birth.getDate() + Math.floor(Math.random()*1500));

                    this.generateChild(birth);
                }
            }
        }
    }

    generateChild(birth) {
        var sex = Math.random()>0.5 ? "M" : "F";

        this.children.push(new Person(birth, sex, this));
        this.nbChild++;
    }

    generateID(parent) {
        if(parent != undefined) {
            return parent.ID+"/"+(parent.nbChild+1).toString();
        } else {
            return "1";
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

    computeSuccessor(reignEnd, monarch) {
        if(this.birth < reignEnd) {
            var successor = null;
            for(var id in this.children) {
                var child = this.children[id];
                if(child.death > reignEnd && reignEnd > child.birth && child != monarch) {
                    return child;
                } else {
                    if(reignEnd > child.death) {
                        successor = child.computeSuccessor(reignEnd, monarch);
                        if(successor != null) {
                            return successor;
                        }
                    }
                }
            }
        }

        return null;
    }

    computeMaturity() {        
        return new Date(this.birth.getFullYear() + maturity[0], this.birth.getMonth() + maturity[1], this.birth.getDate() + maturity[2]);
    }

    computeGeneration() {
        if(this.parent == undefined) {
            return 1;
        } else {
            return this.parent.generation + 1;
        }
    }

    toString() {
        var string = this.name + " (" + this.sex + ")<br>";
        string +=
        this.birth.getDay() + "." +
        this.birth.getMonth() + "." +
        this.birth.getFullYear() + " " +
        "-" +
        this.death.getDay() + "." +
        this.death.getMonth() + "." +
        this.death.getFullYear() + " " +
        "(" + this.lifespan + ")";
        
        return string;
    }

    json() {

    }
}

var maturity = [21, 0, 0];

var guaranteedChildren = false;

var minAge = 25;

var cutoff = new Date(2500, 0, 1);

var num = 0;

var regnal = {"M": {}, "F": {}};

var age = 0;

var reign = 0;

var founder;

var king;

function generation() {
    regnal = {"M": {}, "F": {}};

    age = 0;

    reign = 0;

    num = 0;


    founder = new Person(new Date(1540, 04, 05), "M", undefined);

    king = new Monarch(founder, undefined);

    console.log(founder);
    console.log(king);
}

generation();

console.log(age/num);

var focus = king;

var text = document.getElementById("regents");
var string = "";

while(focus != null) {
    string += "<p>";

    string += focus.toString();

    string += "</p>";

    focus = focus.successor;
}