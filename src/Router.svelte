<script>
    import Index from "./pages/index.svelte";
    import Info from "./pages/info.svelte";
    import Notfound from "./pages/notfound.svelte";
    import Search from "./pages/search.svelte";

    // TODO: add embed
    let packages
    let pkgname = ""
    let pkginfo
    let branch
    let path
    let regname

    let search = false

    let prettify = str => {
        let newstr = ""
        let bigletter = true

        for(const i of str) {
            if (bigletter) newstr += i.toUpperCase()
            else newstr += i

            bigletter = false
            if ([" ", "("].includes(i)) bigletter=true
        }

        return newstr
    }

    fetch(
        "https://raw.githubusercontent.com/Modern-Modpacks/kjspkg/main/pkgs.json"
    ).then(r => {
        r.json().then((j) => {packages=j})
    })

    setInterval(() => {
        if (window.location.hash) {
            if (packages==null || (pkgname!=null && pkgname==window.location.hash.substring(1))) return
            pkgname = window.location.hash.substring(1);
            if (!Object.keys(packages).includes(pkgname)) pkginfo = "404";
            else {
                regname = packages[pkgname].split("@")[0].split("$")[0];
                branch = packages[pkgname].includes("@")
                    ? packages[pkgname].split("@").at(-1)
                    : "main";
                path = packages[pkgname].includes("$")
                    ? packages[pkgname].split("@")[0].split("$").at(-1)
                    : null
                fetch(
                    `https://raw.githubusercontent.com/${regname}/${branch}${path!=null ? "/"+path : ""}/.kjspkg`
                ).then((i) => {
                    i.json().then((info) => {
                        pkginfo = info;
                    });
                });
            }
        } else pkginfo = "main";
    }, 1)
</script>

<main>
    {#if pkginfo == null}
        <div />
    {:else if pkginfo == "main"}
        {#if search}
            <Search prettify={prettify} packages={packages} bind:search={search} />
        {:else}
            <Index bind:search={search} />
        {/if}
    {:else if pkginfo == "404"}
        <Notfound />
    {:else}
        <Info
            {pkginfo}
            prettify={prettify}
            sourcelink="https://github.com/{regname}/tree/{branch}{path!=null ? "/"+path : ""}"
        />
    {/if}
</main>

<style>
    :root {
        --bg-color: #440b67;
        --fg-color: #c37ee5;
        --active-color: #6b10a3;
        --font-color: #ffffff;
    }
    @font-face {
        font-family: kubefont;
        src: url(https://kubejs.com/Montserrat-Medium.ttf);
    }

    :global(body) {
        background-color: var(--bg-color);

        color: var(--font-color);
        font-family: kubefont, "Courier New", Courier, monospace;
        text-align: center;

        display: flex;
        flex-direction: column;
        align-items: center;

        -ms-overflow-style: none;
        scrollbar-width: none;
    }
    :global(body::-webkit-scrollbar) {
        display: none;
    }

    :global(br),
    :global(img) {
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

    :global(a:not(#card)) {
        text-decoration: none;
        color: var(--fg-color);

        transition: opacity 0.1s;
    }
    :global(a:not(#card):hover) {
        opacity: 0.5;
    }

    :global(button) {
        font-size: 2em;
        padding: 10px;

        cursor: pointer;

        border-color: var(--fg-color);
        border-width: 5px;
        border-style: solid;
        border-radius: 15px;

        background-color: var(--bg-color);
        transition: background-color .1s;

        color: var(--font-color);
        font-family: kubefont, "Courier New", Courier, monospace;
        font-weight: bold;
    }
    :global(button:hover) {
        background-color: var(--active-color);
    }
    :global(button:active) {
        background-color: var(--fg-color);
    }
    :global(input) {
        background-color: var(--active-color);

        box-sizing: border-box;
        padding: 10px;

        height: 5vh;

        border-radius: 15px;
        border-color: var(--fg-color);
        border-width: 5px;
        border-style: solid;

        color: var(--font-color);
    }
    :global(input), :global(input::placeholder) {
        font-family: kubefont, "Courier New", Courier, monospace;
        font-weight: bold;
        font-size: 1.25em;
    }
    :global(input::placeholder) {
        color: var(--fg-color);
    }
    :global(input:focus) {
        outline: none;
    }

    :global(#icons) {
        display: flex;
        justify-content: center;
        column-gap: 25px;
    }
    :global(#icons > a > img) {
        height: 30px;
        filter: invert(1);

        transition: filter 0.2s;
    }
    :global(#icons > a > img:hover) {
        filter: invert(0.7);
    }

    @media only screen and (max-width: 600px) {
        :global(h1) {
            font-size: 1.7em;
        }
        :global(button) {
            font-size: 1.7em;
        }
        :global(h2) {
            font-size: .7em;
        }
        :global(input) {
            font-size: .7em;
        }
        :global(h3) {
            font-size: 0.6em;
        }
        :global(h4) {
            font-size: 0.5em;
        }
        :global(p) {
            font-size: 0.65em;
        }
    }
</style>
