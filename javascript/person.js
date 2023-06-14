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
        let parentBonus;
        if(this.parent == undefined) {
            parentBonus = 100;
        } else {
            parentBonus = this.parent.longevity;
        }
        let min = 0.95*(parentBonus-20);
        let max = 1.05*(parentBonus+20);
        let longevity = Math.floor(Math.random()*(max-min)+min);
        return longevity;
    }

    generateHealth() {
        let parentBonus;
        let parentLongevity;
        if(this.parent == undefined) {
            parentBonus = 5;
            parentLongevity = 1;
        } else {
            parentBonus = this.parent.health;
            parentLongevity = this.parent.longevity;
        }
        let min = 400*(parentLongevity + 5*this.longevity)/10 + parentBonus;

        let max = 1500*(parentLongevity*1.2 + 3*this.longevity)/10 + parentBonus;

        let health = Math.floor(Math.random()*(max-min)+min)

        if(health>9000) {
            this.longevity *= 1.04;
        } else {
            if(health<6000) {
                this.longevity *= 0.97;
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
        const averageLifespan = (80 + (this.health-9000)/25)*this.longevity/1000;

        const standardDeviation = 500/this.longevity;

        const lifespan = generateLifespan(averageLifespan, standardDeviation);
        
        function generateLifespan(averageLifespan, standardDeviation) {
            let sum = 0;
            for(let i=0; i<12; i++) {
                sum += Math.random()*2-1;
            }

            const randomValue = sum/6;

            const lifespan = averageLifespan + randomValue*standardDeviation;

            return lifespan;
        }

        console.log(lifespan);

        const deathYear = this.birth.getFullYear() + Math.floor(lifespan);
        const deathMonth = Math.floor((lifespan - Math.floor(lifespan))*12);
        const deathDay = Math.floor(((lifespan - Math.floor(lifespan))*12 - Math.floor((lifespan - Math.floor(lifespan))*12))*30);

        console.log(deathYear + " " + deathMonth + " " + deathDay)

        return new Date(deathYear, deathMonth, deathDay);
    }

    computeLife() {
        return Math.floor((this.death - this.birth)/3.1536e10);
    }

    computeMaturity() {
        return this.birth + this.life/2;
    }

    computeGeneration() {
        if(this.parent == undefined) {
            return 0;
        } else {
            return this.parent.generation + 1;
        }
    }

}