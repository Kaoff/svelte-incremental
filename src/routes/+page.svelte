<script lang="ts">
	import { onMount } from 'svelte';
	import type { Currency } from '../game/currency';
	import { Game, game } from '../game/game';
	import { startLoop } from '../game/gameLoop';

    let gameInstance: Game;
    let currencies: Currency[];

    $: {
        currencies = Object.values(gameInstance.data.currencies);
    }

    game.subscribe((g) => {
        gameInstance = g;
    });

    const onButtonClick = () => {
        game.update(g => ({
            ...g,
            moneyPerSecond: g.moneyPerSecond + 1,
        }));
    };

    onMount(() => {
        startLoop();
    });
</script>

<div>
    {#each currencies as currency}
        {#if currency.value > 0}
            <p>{currency.name}: {currency.value}</p>
        {/if}
    {/each}
</div>