<script>
    import { casparEvent, updateKey } from '../store.js'

    export let item

    let timer = undefined
    let playing = false
    let timeRemaining = 0
    $: secondsRemaining = Math.floor(timeRemaining / 1000)
    $: millisecondsRemaining = timeRemaining % 1000
    $: pctComplete = timeRemaining / item.duration || 0

    function play() {
        casparEvent("LOAD AND PLAY", item.key)
        playing = true
        let diff = Date.now() + item.duration
        timer = setInterval(() => {
           timeRemaining = diff - Date.now() 
           if(timeRemaining <= 0) { 
               clearInterval(timer) 
               timeRemaining = 0
               playing = false
            }
        }, 100);
    }

    function clear() {
        clearInterval(timer)
        playing = false
        timeRemaining = 0
    }

    function toggle() {
        playing? clear() : play()
    }
</script>

<main>
    <p>{item.type.toUpperCase()}</p>
    <p class="name">{item.name}</p>
    <div class="spacer"></div>
    {#if playing}
    <p>{secondsRemaining}.{millisecondsRemaining}</p>
    <progress value={pctComplete}></progress>
    {/if}
    <button class={playing? 'playing': 'not-playing'} on:click={toggle}>
    {playing? 'Clear' : 'Play'}
    </button>
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
        margin-right: 15px;
    }

    .name {
        font-weight: bold;
    }

    .spacer {
        flex-grow: 1;
    }
</style>