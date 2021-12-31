<script>
    import { store } from '../store.js';

    let time = new Date()

    setInterval(() => {
        time = new Date()
    }, 500);
</script>

<main>
    <h3>{time.toTimeString()}</h3>
    <h3>{$store.homeName} <span class="light">{$store.homeScore}</span> - <span class="light">{$store.awayScore}</span> {$store.awayName}</h3>
    <h4><span class="light">{$store.homeTO}</span> TIMEOUTS <span class="light">{$store.awayTO}</span></h4>
    <h3>{$store.period} - {$store.clock} - <span class="light">{$store.shotClock}</span></h3>
</main>

<style>
    main {
        display: flex;
        flex-direction: column;
        align-items: center;
        height: 400px;
        width: 300px;
        border: 1px solid black;
        background-color: rgb(49, 58, 77);
        color: white;
        padding: 10px;
        margin: 5px;
    }

    .light {
        font-weight: lighter;
    }
</style>