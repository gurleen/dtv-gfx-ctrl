<script>
    import { sumBy } from 'lodash-es';
    import { casparEvent } from '../store';

    export let item

    let playing = false
    let showItems = false

    let totalDuration = sumBy(item.items, (x) => x.duration)
    
    let timer = undefined
    let timeRemaining = 0
    $: secondsRemaining = Math.floor(timeRemaining / 1000)
    $: millisecondsRemaining = timeRemaining % 1000
    $: pctComplete = timeRemaining / totalDuration || 0

    function queueItems(items) {
        casparEvent("QUEUE", items[0].key)
        if(items.length > 1) {
            setTimeout(queueItems, items[0].duration - 500, items.slice(1))
        }
        else if(items.length == 1) {
            setTimeout(casparEvent, items[0].duration - 500, "QUEUE BLANK")
        }
    }

    function play() {
        playing = true
        let diff = Date.now() + totalDuration
        timer = setInterval(() => {
           timeRemaining = diff - Date.now() 
           if(timeRemaining <= 0) { 
               clearInterval(timer) 
               timeRemaining = 0
               playing = false
            }
        }, 100);
        casparEvent("LOAD AND PLAY", item.items[0].key)
        queueItems(item.items.slice(1))
    }

    function clear() {
        playing = false
        casparEvent("BLANK")
    }

    function toggle() {
        playing? clear() : play()
    }
</script>

<main>
    <div class="row">
        <p>{item.type.toUpperCase()}</p>
        <!-- svelte-ignore a11y-invalid-attribute -->
        <a href="#" on:click={() => showItems = !showItems} class="name">{item.name}</a>
        <p>{Math.floor(totalDuration/1000)}s</p>
        <div class="spacer"></div>
        {#if playing}
        <p>{secondsRemaining}.{millisecondsRemaining}</p>
        <progress value={pctComplete}></progress>
        {/if}
        <button class={playing? 'playing': 'not-playing'} on:click={toggle}>
        {playing? 'Clear' : 'Play'}
        </button>
    </div>
    {#if showItems}
    <div class="col">
        {#each item.items as video}
            <p><span class="bold">{video.name}</span>: {Math.floor(video.duration/1000)}s</p>
        {/each}
    </div>
    {/if}
</main>


<style>
    main {
        display: flex;
        flex-direction: column;
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
        margin-right: 15px;
    }

    .name {
        font-weight: bold;
    }

    .spacer {
        flex-grow: 1;
    }

    .row {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: start;
        width: 100%;
    }

    .col {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: start;
        justify-content: center;
    }

    .bold {
        font-weight: bold;
    }

    a {
        color: white;
    }
</style>