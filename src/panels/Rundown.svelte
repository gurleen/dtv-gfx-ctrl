<script>
    import VideoRundownItem from '../components/VideoRundownItem.svelte';
    import WebRundownItem from '../components/WebRundownItem.svelte';
    import PlaylistRundownItem from '../components/PlaylistRundownItem.svelte';
    import SortableList from 'svelte-sortable-list';
    import { casparEvent } from '../store';
    let rundown = [
        {
            name: "Scorebug",
            type: "web",
            key: "http://localhost:8080/scorebug-old/vue.html",
            toggleKey: "scoreboard:toggle",
            duration: 0,
            layer: 10
        },
        {
            name: "Home Slider",
            type: "web",
            dependent: true,
            // key: "http://localhost:8080/scorebug-old/vue.html",
            toggleKey: "scoreboard:toggle-home",
            duration: 0,
            layer: 10
        },
        {
            name: "Away Slider",
            type: "web",
            dependent: true,
            toggleKey: "scoreboard:toggle-away",
            duration: 0,
            layer: 10
        },
        {
            name: "Matchup",
            type: "video",
            key: "MATCHUP",
            duration: 13000,
            layer: 9
        },
        {
            name: "DU Starting 5",
            type: "video",
            key: "STARTING5",
            duration: 6000,
            layer: 9
        },
        {
            name: "Hannah Nihill 1000 Points",
            type: "video",
            key: "MILESTONE",
            duration: 20000,
            layer: 9
        },
        {
            name: "Break 1",
            type: "playlist",
            layer: 8,
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

    let showUpload = false
    let uploadedFile = undefined

    $: {
        if (uploadedFile && uploadedFile[0]) {
            uploadedFile[0].text().then((text) => {
                rundown = JSON.parse(text)
                showUpload = false
            })
        }
    }

    let onSort = rd => { rundown = rd.detail };

    let children = []

    function blank() {
        casparEvent("BLANK")
        children.forEach((c) => { 
            if(c.cancelQueue) c.cancelQueue()
        })
    }

    function downloadRundown() {
        let link = document.createElement('a')
        link.download = 'rundown.json'
        let jsonStr = JSON.stringify(rundown, undefined, 2)
        let blob = new Blob([jsonStr], {type: 'text/plain'})
        link.href = window.URL.createObjectURL(blob)
        link.click()
    }
</script>

<main>
    <h2>Run of Show</h2>
    <div class="row">
        <button class="playing" on:click={blank}>BLANK ALL CHANNELS</button>
        <button on:click={downloadRundown}>Save Rundown</button>
        <button on:click={() => showUpload = !showUpload}>Open Rundown</button>
    </div>
    {#if showUpload}
        <input type="file" bind:files={uploadedFile}>
    {/if}
    <div class="list-container">
        <SortableList list={rundown} key="name" on:sort={onSort} let:item let:index>
            {#if item.type == "web"}
                <WebRundownItem bind:this={children[index]} item={item}></WebRundownItem>
            {:else if item.type == "video"}
                <VideoRundownItem bind:this={children[index]} item={item}></VideoRundownItem>
            {:else if item.type == "playlist"}
                <PlaylistRundownItem bind:this={children[index]} item={item}></PlaylistRundownItem>
            {/if}
        </SortableList>
    </div>
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

    .list-container {
        overflow: scroll;
        width: 95%;
    }

    .row {
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: space-around;
    }
</style>
