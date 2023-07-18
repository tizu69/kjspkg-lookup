<script>
    import CodeBlock from "../lib/CodeBlock.svelte";

    export let pkginfo
    export let sourcelink

    let pkgname
    let versions
    let loaders

    setInterval(() => {pkgname = window.location.hash.substring(1); versions = getversions(); loaders = getloaders()}, 1)

    export let prettify
    let linkify = str => {
        let newstr = []
        str.split(" ").forEach(w => {
            if(w.startsWith("http://") || w.startsWith("https://")) newstr.push(`<a href="${w}">${w}</a>`)
            else newstr.push(w)
        })
        return newstr.join(" ")
    }

    let getversions = () => {
        let versions = []
        pkginfo.versions.forEach(ver => {
            versions.push("1."+(10+ver))
        });
        return versions.join(", ")
    }
    let getloaders = () => {
        let loaders = []
        pkginfo.modloaders.forEach(m => {
            loaders.push(prettify(m))
        })
        return loaders.join(", ")
    }
    let getdepsandincompats = arr => {
        let newarr = []
        arr.forEach(i => {
            if (i.includes(":")) newarr.push(prettify(`${i.split(":").at(-1).replaceAll("-", " ").replaceAll("_", " ")} (${i.split(":")[0]})`))
            else newarr.push(prettify(i.replaceAll("-", " ").replaceAll("_", " ")))
        })
        return newarr.join(", ")
    }
</script>

<style>
    main {
        display: grid;
        height: 100vh;
    }

    #maininfo {
        margin-top: 3vh;
    }
    #maininfo > * {
        margin-bottom: 0;
        margin-top: 1.5vh;
    }

    #generalinfo > * {
        margin-block: 15px;
    }

    h1, h2, h3 {
        margin-inline: 20px;
    }

    h4 {
        align-self: flex-end;
    }
</style>

<svelte:head>
    <title>{pkgname ? prettify(pkgname.replaceAll("-", " ")) : null}</title>
</svelte:head>

<main>
    <div id="maininfo">
        <h1>{pkgname ? prettify(pkgname.replaceAll("-", " ")) : null}</h1>
        <h2>{@html linkify(pkginfo.description)}</h2>
        <h3>By {pkginfo.author}</h3>
    </div>

    <div id="generalinfo">
        <h3>Available for:</h3>
        <p>{versions}</p>
        <p>{loaders}</p>

        {#if pkginfo.dependencies.length || pkginfo.incompatibilities.length}
            <br />
        {/if}

        {#if pkginfo.dependencies.length}
            <h3>Dependencies:</h3>
            <p>{getdepsandincompats(pkginfo.dependencies)}</p>
        {/if}
        {#if pkginfo.incompatibilities.length}
            <h3>Incompatibilities:</h3>
            <p>{getdepsandincompats(pkginfo.incompatibilities)}</p>
        {/if}

        <br />

        <h3>Commands:</h3>
        <p><CodeBlock>kjspkg install {pkgname}</CodeBlock> to install</p>
        <p><CodeBlock>kjspkg remove {pkgname}</CodeBlock> to remove</p>
        <p><CodeBlock>kjspkg update {pkgname}</CodeBlock> to update</p>
        <p><CodeBlock>kjspkg pkg {pkgname}</CodeBlock> to see more info</p>

        <br />

        <div id="icons">
            <a href={sourcelink}><img id="logo" title="Source code" src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBkPSJNMTIgMGMtNi42MjYgMC0xMiA1LjM3My0xMiAxMiAwIDUuMzAyIDMuNDM4IDkuOCA4LjIwNyAxMS4zODcuNTk5LjExMS43OTMtLjI2MS43OTMtLjU3N3YtMi4yMzRjLTMuMzM4LjcyNi00LjAzMy0xLjQxNi00LjAzMy0xLjQxNi0uNTQ2LTEuMzg3LTEuMzMzLTEuNzU2LTEuMzMzLTEuNzU2LTEuMDg5LS43NDUuMDgzLS43MjkuMDgzLS43MjkgMS4yMDUuMDg0IDEuODM5IDEuMjM3IDEuODM5IDEuMjM3IDEuMDcgMS44MzQgMi44MDcgMS4zMDQgMy40OTIuOTk3LjEwNy0uNzc1LjQxOC0xLjMwNS43NjItMS42MDQtMi42NjUtLjMwNS01LjQ2Ny0xLjMzNC01LjQ2Ny01LjkzMSAwLTEuMzExLjQ2OS0yLjM4MSAxLjIzNi0zLjIyMS0uMTI0LS4zMDMtLjUzNS0xLjUyNC4xMTctMy4xNzYgMCAwIDEuMDA4LS4zMjIgMy4zMDEgMS4yMy45NTctLjI2NiAxLjk4My0uMzk5IDMuMDAzLS40MDQgMS4wMi4wMDUgMi4wNDcuMTM4IDMuMDA2LjQwNCAyLjI5MS0xLjU1MiAzLjI5Ny0xLjIzIDMuMjk3LTEuMjMuNjUzIDEuNjUzLjI0MiAyLjg3NC4xMTggMy4xNzYuNzcuODQgMS4yMzUgMS45MTEgMS4yMzUgMy4yMjEgMCA0LjYwOS0yLjgwNyA1LjYyNC01LjQ3OSA1LjkyMS40My4zNzIuODIzIDEuMTAyLjgyMyAyLjIyMnYzLjI5M2MwIC4zMTkuMTkyLjY5NC44MDEuNTc2IDQuNzY1LTEuNTg5IDguMTk5LTYuMDg2IDguMTk5LTExLjM4NiAwLTYuNjI3LTUuMzczLTEyLTEyLTEyeiIvPjwvc3ZnPg==" alt="github"></a>
        </div>
    </div>

    <h4>Confused about what this is? Checkout the <a href="/">main page</a></h4>
</main>