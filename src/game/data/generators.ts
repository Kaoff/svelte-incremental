import { Generator } from '../generator';

export const defaultGenerators = [
    new Generator({
        id: 0,
        name: 'Uncle Bob',
        cost: 10,
        costMult: 1.1,
        generatePerSec: 0.1,
        funFact: 'Your uncle Bob. He can clone himself to make more willies.'
    }),
    new Generator({
        id: 1,
        name: 'The Pan™',
        cost: 100,
        costMult: 1.12,
        generatePerSec: 0.5,
        funFact: 'That pan you saw on teleshopping. Not that good, but can make willies.'
    }),
];
