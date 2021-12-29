<script>
    import RundownItem from '../components/RundownItem.svelte';
    let rundown = [
        {
            name: "Intro",
            type: "video",
            key: "INTROVIDEO",
            duration: 30000
        },
    ];
</script>

<main>
    {#each rundown as item}
        <RundownItem item={item}></RundownItem>
    {/each}
</main>

<style>
    main {
        display: flex;
        flex-direction: column;
        align-items: center;
        height: 500px;
        width: 800px;
        border: 1px solid black;
        background-color: rgb(49, 58, 77);
        color: white;
        padding: 10px;
        padding-top: 15px;
        margin: 5px;
    }
</style>
