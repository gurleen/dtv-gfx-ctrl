<script>
    export let item;
</script>

<main>
    <p>{item.type.toUpperCase()}</p>
    <p class="name">{item.name}</p>
    <div class="spacer"></div>
    <button>Play</button>
</main>

<style>
    main {
        display: flex;
        align-items: center;
        justify-content: start;
        padding-left: 10px;
        background-color: rgb(37, 44, 60);
        width: 90%;
        min-height: 50px;
    }
    
    p, button {
        margin: 5px;
    }

    button {
        margin-right: 10px;
    }

    .name {
        font-weight: bold;
    }

    .spacer {
        flex-grow: 1;
    }
</style>