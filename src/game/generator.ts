export class Generator {
    public id: number;
    public name: string;
    public bought: number = 0;
    public generated: number = 0;
    public generatePerSec: number = 0;
    public cost: number;
    public costMult: number;

    constructor(id: number, name: string, generatePerSec: number, cost: number, costMult: number) {
        this.id = id;
        this.name = name;
        this.generatePerSec = generatePerSec;
        this.cost = cost;
        this.costMult = costMult;
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
            Makes ${this.generatePerSec} wps.
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
            this.cost = this.totalCost(this.bought + 1);

            return totalCost;
        }

        return 0;
    }
}