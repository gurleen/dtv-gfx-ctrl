<script>
    import { casparEvent, updateKey } from '../store.js'

    export let item

    let loadedOnce = false
    let playing = false

    function toggle() {
        playing = !playing
        updateKey(item.toggleKey, null)
    }

    function load() {
        loadedOnce = true
        playing = false
        casparEvent("CG ADD", item.key, item.layer)
    }
</script>

<main>
    <p contenteditable="true" bind:innerHTML={item.layer}>{item.layer}</p>
    <p>{item.type.toUpperCase()}</p>
    <p class="name">{item.name}</p>
    <div class="spacer"></div>
    <button class={playing? 'playing': 'not-playing'} on:click={toggle}>
    {playing? 'Clear' : 'Play'}
    </button>
    {#if !(item.dependent || false)}
    <button on:click={load}>
        {loadedOnce? "Reload" : "Load"}
    </button>
    {/if}
</main>

<style>
    main {
        display: flex;
        align-items: center;
        justify-content: start;
        padding-left: 10px;
        background-color: rgb(37, 44, 60);
        width: 98%;
        min-height: 50px;
    }
    
    p, button {
        margin: 5px;
    }

    button {
        margin-right: 15px;
    }

    .name {
        font-weight: bold;
    }

    .spacer {
        flex-grow: 1;
    }
</style>