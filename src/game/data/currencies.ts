import { Currency } from '../currency';

export const currencies: { [name: string]: Currency } = {
    money: new Currency(0, "Money"),
    wood: new Currency(1, "Wood"),
    stone: new Currency(2, "Stone"),
};