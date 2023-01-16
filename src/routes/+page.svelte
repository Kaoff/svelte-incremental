<link rel='stylesheet' href='%sveltekit.assets%/global.css'>

<script lang="ts">
	import type { Generator } from '../game/generator';
    import { onMount } from 'svelte';
    import { Game, game } from '../game/game';
	import { startLoop } from '../game/gameLoop';
	import GeneratorViewer from '../components/GeneratorViewer.svelte';
	import Willy from '../components/icons/Willy.svelte';

    let gameInstance: Game;
    let willies: number;
    let williesPerSec: string;
    let williesPerClick: number;
    let generators: Generator[];

    let buyAmount: number = 1;

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
        <div class="willies-value">
            <div class="value">{willies} {willies > 1 ? 'willies' : 'willy'}</div>
            <div class="persec">({williesPerSec}/s)</div>
        </div>
        <div class="willies-clicker" on:keydown on:click={onClick}><Willy /></div>
    </div>
    
    <div class="generator-list">
        {#each generators as generator}
        <GeneratorViewer 
            disabled={!generator.canBuy(1, willies)} 
            on:click={() => gameInstance.buyGenerator(generator.id, 1)}
            {generator}
        >
            Buy {buyAmount} {generator.name} [{generator.cost} willies] | {generator.getDescription()}
        </GeneratorViewer>
        {/each}
    </div>
</section>

<style lang="scss">
    #game {
        height: 100vh;
        display: flex;
        flex-direction: row;
        align-items: center;

        .willies {
            height: 100%;
            flex-grow: 1;
            text-align: center;
            position: relative;

            &-value {
                position: absolute;
                top: 0;
                width: 100%;
                font-size: 3em;

                .value {
                    height: 1em;

                }

                .persec {
                    font-size: 0.5em;
                }
            }
        
            &-clicker {
                $clicker-size: 400px;

                width: $clicker-size;
                height: $clicker-size;
                position: absolute;
                top: calc(50% - ($clicker-size / 2));
                left: calc(50% - ($clicker-size / 2));
            }
        }

        .generator-list {
            border-left: 1px solid;
            display: flex;
            flex-direction: column;
            height: 100%;
            width: 500px;
        }
    }

    
</style>