<script lang="ts">
	import type { Generator } from '../game/generator';
	import Button from './Button.svelte';
	import Willy from './icons/Willy.svelte';

    export let generator: Generator;
    export let disabled: boolean;

</script>

<div class="generator-viewer">
    <Button {disabled} on:click>
        <div class="amount">
            <div>{generator.name} <span class="bought">({generator.bought})</span></div>
            <div class="cost">{generator.cost} <div class="icon"><Willy/></div></div>
        </div>
        <div class="description">{generator.getDescription()}</div>
    </Button>
</div>

<style lang="scss">
    .generator-viewer {
        margin-bottom: 12px;
        width: 100%;

        .amount {
            display: flex;
            justify-content: space-between;
            width: 100%;
            font-weight: 600;
            font-size: 2em;
            border-bottom: 1px solid;
            padding-bottom: 6px;
            margin-bottom: 6px;

            .bought {
                font-size: 0.5em;
                font-weight: 300;
            }
        }

        .description {
            font-weight: 300;
            font-style: italic;
        }

        .cost {
            display: flex;

            .icon {
                margin-left: 6px;
                width: 30px;
                display: flex;
                align-items: center;
            }
        }
    }
</style>