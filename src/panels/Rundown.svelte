<script>
    import VideoRundownItem from '../components/VideoRundownItem.svelte';
    import WebRundownItem from '../components/WebRundownItem.svelte';
    import PlaylistRundownItem from '../components/PlaylistRundownItem.svelte';
    import { casparEvent } from '../store';
    let rundown = [
        {
            name: "Scorebug",
            type: "web",
            key: "http://localhost:8080/scorebug-old/vue.html",
            toggleKey: "scoreboard:toggle",
            duration: 0
        },
        {
            name: "Home Slider",
            type: "web",
            dependent: true,
            // key: "http://localhost:8080/scorebug-old/vue.html",
            toggleKey: "scoreboard:toggle-home",
            duration: 0
        },
        {
            name: "Away Slider",
            type: "web",
            dependent: true,
            toggleKey: "scoreboard:toggle-away",
            duration: 0
        },
        {
            name: "Matchup",
            type: "video",
            key: "MATCHUP",
            duration: 13000
        },
        {
            name: "Hannah Nihill 1000 Points Milestone",
            type: "video",
            key: "MILESTONE",
            duration: 20000
        },
        {
            name: "Break 1",
            type: "playlist",
            items: [
                {
                    name: "Matchup Wipe",
                    type: "video",
                    key: "MATCHUPWIPE",
                    duration: 5000
                },
                {
                    name: "Giant 30s",
                    type: "video",
                    key: "GGMA1000496H",
                    duration: 30000
                },
                {
                    name: "Flex Tape Clear",
                    type: "video",
                    key: "FLEXTAPECLEAR",
                    duration: 30000
                }
            ]
        }
    ];

    function blank() {
        casparEvent("BLANK")
    }
</script>

<main>
    <h2>Run of Show</h2>
    <button class="playing" on:click={blank}>BLANK ALL CHANNELS</button>
    {#each rundown as item}
        {#if item.type == "web"}
            <WebRundownItem item={item}></WebRundownItem>
        {:else if item.type == "video"}
            <VideoRundownItem item={item}></VideoRundownItem>
        {:else if item.type == "playlist"}
            <PlaylistRundownItem item={item}></PlaylistRundownItem>
        {/if}
    {/each}
</main>

<style>
    main {
        display: flex;
        flex-direction: column;
        align-items: center;
        height: 500px;
        width: 600px;
        border: 1px solid black;
        background-color: rgb(49, 58, 77);
        color: white;
        padding: 10px;
        padding-top: 0px;
        margin: 5px;
    }
</style>
