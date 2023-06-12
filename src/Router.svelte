<link href="https://pvinis.github.io/iosevka-webfont/3.4.1/iosevka.css" rel="stylesheet" />

<script>
    import Index from "./pages/index.svelte"
    import Info from "./pages/info.svelte"
    import Notfound from "./pages/notfound.svelte";

    // TODO: add embed and fix reloading
    let pkginfo
    if (window.location.hash) {
        let pkgname = window.location.hash.substring(1)

        fetch("https://raw.githubusercontent.com/Modern-Modpacks/kjspkg/main/pkgs.json").then(r => {
            r.json().then(j => {
                if (!Object.keys(j).includes(pkgname)) pkginfo = "404"
                else {
                    let regname = j[pkgname].split("@")[0]
                    let branch = j[pkgname].includes("@") ? j[pkgname].split("@").at(-1) : "main"
                    fetch(`https://raw.githubusercontent.com/${regname}/${branch}/.kjspkg`).then(i => {
                        i.json().then(info => {pkginfo=info})
                    })
                }
            })
        })
    }
    else pkginfo = "main"
</script>

<style>
    :root {
        --bg-color: #440b67;
        --fg-color: #c37ee5;
        --font-color: #ffffff;
    }

    :global(body) {
        background-color: var(--bg-color);

        color: var(--font-color);
        font-family: 'Iosevka Web', 'Courier New', Courier, monospace;
        text-align: center;

        display: flex;
        flex-direction: column;
        align-items: center;
    }

    :global(br), :global(img) {
        user-select: none;
    }

    :global(h1) {
        font-size: 3em;
    }
    :global(h2) {
        font-size: 1.5em;
    }
    :global(h3) {
        font-size: 1.35em;
    }
    :global(h4) {
        font-size: 1.1em;
    }
    :global(p) {
        font-size: 1.25em;
    }

    :global(a) {
        text-decoration: none;
        color: var(--fg-color);

        transition: opacity .1s;
    }
    :global(a:hover) {
        opacity: .5;
    }

    @media only screen and (max-width: 600px) {
        :global(h1) {
            font-size: 2em;
        }
        :global(h2) {
            font-size: 1em;
        }
        :global(h3) {
            font-size: .9em;
        }
        :global(h4) {
            font-size: .8em;
        }
        :global(p) {
            font-size: .95em;
        }
    }
</style>

<main>
    {#if pkginfo==null} 
        <div />
    {:else if pkginfo=="main"}
        <Index />
    {:else if pkginfo=="404"}
        <Notfound />
    {:else}
        <Info pkginfo={pkginfo}/>
    {/if}
</main>