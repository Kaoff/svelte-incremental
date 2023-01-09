import { writable } from 'svelte/store';
import { currencies } from './data/currencies';

export interface GameData {
    currencies: {
        [name: string]: Currency;
    };
}

export class Game {
    data: GameData;
    moneyPerSecond: number = 1;

    constructor() {
        this.data = {
            currencies,
        };
    }
}

export const game = writable<Game>(new Game());