<script lang="ts">
    export let disabled: boolean;
</script>

<div class={`button ${$$props.class}`} class:disabled on:click on:keydown on:keypress on:keyup>
    <slot class="content" />
</div>

<style lang="scss">
    .button {
        border-radius: 6px;
        padding: 16px;
        width: 100%;
        text-decoration: none;
        background-color: white;

        &.disabled {
            color: lightgray;

            :global(svg) {
                opacity: 0.2;
            }
        }
    }
</style>