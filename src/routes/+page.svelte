<link rel='stylesheet' href='%sveltekit.assets%/global.css'>

<script lang="ts">
	import type { Generator } from '../game/generator';
    import { onMount } from 'svelte';
    import { Game, game } from '../game/game';
	import { startLoop } from '../game/gameLoop';

    let gameInstance: Game;
    let willies: number;
    let williesPerSec: string;
    let williesPerClick: number;
    let generators: Generator[];

    let buyAmmount: number = 1;

    $: {
        willies = gameInstance.data.willies;
        williesPerSec = gameInstance.getWillyPerSecond().toFixed(2);
        williesPerClick = gameInstance.data.williesPerClick;
        generators = gameInstance.data.generators;
    }

    game.subscribe((g) => {
        gameInstance = g;
    });

    const onClick = () => {
        gameInstance.clickForWillies();
    };

    onMount(() => {
        startLoop();
    });
</script>

<section id="game">
    <div class="willies">
        <div class="willies-value">{willies} willies</div>
        <div class="willies-persec">({williesPerSec}/s)</div>
        <button on:click={onClick}>Click for {williesPerClick} willies.</button>
    </div>
    
    <div class="generator-list">
        {#each generators as generator}
        <button 
            disabled={!generator.canBuy(1, willies)} 
            on:click={() => gameInstance.buyGenerator(generator.id, 1)}
            >
            Buy {buyAmmount} {generator.name} [{generator.cost} willies] | {generator.getDescription()}
        </button>
        {/each}
    </div>
</section>

<style lang="scss">
    #game {
        width: 100%;
        height: 100%;
    }

    button {
        appearance: none;
        border-radius: 5px;
        border: solid 1px;
        padding: 16px;
    }
    
    .generator-list {
        button {
            display: block;
        }
    }
</style>