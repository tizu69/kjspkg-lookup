<script>
    import {extract} from "fuzzball";

    export let search = true
    export let prettify
    export let packages

    let packageNames = Object.keys(packages)
    let searchValue
    let prevSearchValue = ""
    let bestResults

    setInterval(() => {
        if(searchValue==prevSearchValue) return

        prevSearchValue = searchValue
        if (prevSearchValue==null || prevSearchValue=="") {
            bestResults = packageNames
            return
        }

        let searchResult = extract(searchValue, packageNames)
        bestResults = []
        searchResult.forEach(r => {
            if (r[1]>50) bestResults.push(r[0])
        })

    }, 1)
</script>

<style>
    #search {
        display: flex;
        flex-direction: row;
        align-items: center;

        margin-block: 2vh;
        gap: 15px;
    }
    #search > img {
        height: 35px;
        width: 35px;
        filter: invert(1);

        transition: opacity .15s;
    }
    #search > input {
        width: 90vw;
    }
    #search > img:hover {
        opacity: .5;
        cursor: pointer;
    }

    main {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    #cards {
        display: flex;
        flex-direction: column;
        align-items: center;

        width: 90vw;
    }
    #card {
        width: 100%;
        margin-bottom: 20px;

        background-color: var(--active-color);
        border: 15px var(--fg-color) solid;
        border-radius: 30px;

        text-decoration: none;
        color: var(--font-color);

        transition: transform .5s;
    }
    #card:hover {
        transform: scale(102%);
    }
    #cards:hover #card:not(:hover) {
        transform: scale(98%);
    }
    #card > h1, h2 {
        margin-block: 15px;
    }

    @media (prefers-reduced-motion) {
        #card:hover {
            transform: scale(100%);
        }
        #cards:hover #card:not(:hover) {
            transform: scale(100%);
        }
    }
</style>

<main>
    <div id="search">
        <img on:click={() => {search=false}} title="Back" alt="arrow" src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pg0KPCEtLSBVcGxvYWRlZCB0bzogU1ZHIFJlcG8sIHd3dy5zdmdyZXBvLmNvbSwgR2VuZXJhdG9yOiBTVkcgUmVwbyBNaXhlciBUb29scyAtLT4NCjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+DQo8c3ZnIGZpbGw9IiMwMDAwMDAiIHZlcnNpb249IjEuMSIgaWQ9IkNhcGFfMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgDQoJIHdpZHRoPSI4MDBweCIgaGVpZ2h0PSI4MDBweCIgdmlld0JveD0iMCAwIDU1OC45NTcgNTU4Ljk1NyINCgkgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+DQo8Zz4NCgk8Zz4NCgkJPHBvbHlnb24gcG9pbnRzPSI0NjIuNzQ1LDAgOTYuMjEyLDI3OS40NzkgNDYyLjc0NSw1NTguOTU3IDQ2Mi43NDUsNDE5LjIyMSAyNzguNzEzLDI3OS40NzkgNDYyLjc0NSwxMzkuNzM4IAkJIi8+DQoJPC9nPg0KPC9nPg0KPC9zdmc+" />
        <input type="text" name="search" placeholder="Search" autocomplete="off" bind:value={searchValue}>
    </div>

    <div id="cards">
        {#if bestResults!=null}
            {#each bestResults.sort() as result}
                <a id="card" href="#{result}">
                    <h1>{prettify(result.replaceAll("-", " "))}</h1>
                    <h2>{packages[result]}</h2>
                </a>
            {/each}
        {/if}
    </div>
</main>