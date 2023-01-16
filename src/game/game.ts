import { writable } from 'svelte/store';
import { defaultGenerators } from './data/generators';
import type { Generator } from './generator';

export interface GameData {
    willies: number;
    generators: Generator[];
    williesPerClick: number;
}

export class Game {
    data: GameData;
    willyPerSecond: number = 0;

    constructor() {
        this.data = {
            willies: 0,
            generators: defaultGenerators,
            williesPerClick: 1,
        };
    }

    public update(deltaT: number) {
        for (const gen of this.data.generators) {
            this.data.willies += gen.generate(deltaT);
        }
    }

    public clickForWillies() {
        this.data.willies += this.data.williesPerClick;
    }

    public getWillyPerSecond(): number {
        return this.data.generators.reduce((acc, curr) => {
            return acc + curr.getGenerationPerSec()
        }, 0);
    }

    public buyGenerator(id: number, amount: number) {
        const generator = this.data.generators.find((v) => v.id === id);

        if (generator) {
            this.data.willies -= generator?.buy(amount, this.data.willies);
        }
    }
}

export const game = writable<Game>(new Game());