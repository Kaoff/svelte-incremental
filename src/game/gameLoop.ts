import { game, type Game } from './game';

let instance: Game;
game.subscribe(n => instance = n);

const ms = 100;
// const autoSaveTime = 60000;

let interval: number;

let lastRunTime = Date.now();
let deltaT: number = 0;


const gameLoop = () => {
    const currentTime = Date.now();

    deltaT = Math.max(Math.min((currentTime - lastRunTime) / 1000, 1), 0);
    lastRunTime = currentTime;

    instance.data.currencies.money.add(instance.moneyPerSecond * deltaT);

    game.set(instance);
}

export const startLoop = () => {
    interval = window.setInterval(gameLoop, ms);
}