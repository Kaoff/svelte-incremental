export interface GeneratorProperties {
    id: number;
    name: string;
    generatePerSec: number;
    cost: number;
    costMult: number;
    funFact?: string;
}

export class Generator {
    public id: number;
    public name: string;
    public bought: number = 0;
    public generated: number = 0;
    public generatePerSec: number = 0;
    public baseCost: number;
    public cost: number;
    public costMult: number;
    public funFact?: string;

    constructor({id, name, generatePerSec, cost, costMult, funFact}: GeneratorProperties) {
        this.id = id;
        this.name = name;
        this.generatePerSec = generatePerSec;
        this.baseCost = cost;
        this.cost = cost;
        this.costMult = costMult;
        this.funFact = funFact;
    }

    public generate(deltaTime: number): number {
        this.generated += this.generatePerSec * this.bought * deltaTime;
        
        if (this.generated >= 1) {
            const deltaValue = Math.floor(this.generated);

            this.generated -= deltaValue;

            return deltaValue;
        }
        
        return 0;
    }

    public getGenerationPerSec() {
        return this.bought * this.generatePerSec;
    }

    public getDescription() {
        return `
            ${this.funFact}
            Each makes ${this.generatePerSec} willies/s
        `;
    }

    public totalCost(amount: number) {
        return Math.floor(this.cost * (Math.pow(this.costMult, amount - 1)));
    }

    public canBuy(amount: number, willies: number) {
        return this.totalCost(amount) <= willies;
    }

    public buy(amount: number = 1, willies: number): number {
        if (this.canBuy(amount, willies)) {
            const totalCost = this.totalCost(amount);

            this.bought += amount;
            this.cost = Math.floor(this.baseCost * (Math.pow(this.costMult, this.bought)));

            return totalCost;
        }

        return 0;
    }
}