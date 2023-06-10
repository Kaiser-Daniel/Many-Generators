export default class Person {
    constructor(ID, birth, sex, parent) {
        this.ID = ID;
        this.name = this.generateName(sex);
        this.sex = sex;
        this.birth = birth;
        this.parent = parent;
        this.religion = this.generateReligion();
        this.traits = [];
        this.generation = this.computeGeneration();

        this.longevity = this.generateLongevity();
        this.maturity = this.computeMaturity();
        this.health = this.generateHealth();
        this.death = this.computeDeath();
        this.life = this.computeLife();
        this.libido = this.generateLibido();

        this.wealth = this.generateWealth();
        this.title = this.generateTitle();
    }    

    generateName(sex) {
        return randomName(sex);
    }

    generateReligion() {
        return undefined;
    }

    generateLongevity() {
    }

    generateHealth() {
        var parentBonus;
        if(this.parent == undefined) {
            parentBonus = 5;
        } else {
            parentBonus = this.parent.health;
            parentLongevity = this.parent.longevity;
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

    generateLibido() {
        return Math.floor(Math.random()*10)/10;
    }

    generateWealth() {
        return Math.floor(Math.random()*1000);
    }

    generateTitle() {
        return undefined;
    }

    computeDeath() {
        const averageLifespan = (80 + (this.health -400)/10)*this.longevity;

        const standardDeviation = 5/this.longevity;

        const lifespan = generateLifespan(averageLifespan, standardDeviation);
        
        function generateLifespan(averageLifespan, standardDeviation) {
            let sum = 0;
            for(let i=0; i<12; i++) {
                sum += Math.random()*2-1;
            }

            const randomValue = sum/6;

            const lifespan = average + randomValue*standardDeviation;

            return lifespan;
        }

        const deathYear = this.birth + Math.floor(lifespan);
        const deathMonth = Math.floor((lifespan - Math.floor(lifespan))*12);
        const deathDay = Math.floor(((lifespan - Math.floor(lifespan))*12 - Math.floor((lifespan - Math.floor(lifespan))*12))*30);

        return new Date(deathYear, deathMonth, deathDay);
    }

    computeLife() {
        return this.death - this.birth;
    }

    computeMaturity() {
        return this.birth + this.life/2;
    }
}