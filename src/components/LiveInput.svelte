<script>
    import { store, updateKey } from '../store.js';
    export let liveKey;

    let value;
</script>

<main>
    <p>{liveKey}: { $store[liveKey] }</p>
    <input bind:value={value}>
    <button on:click={updateKey(liveKey, value)}>Submit</button>
</main>