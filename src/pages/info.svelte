<script>
  import CodeBlock from "../lib/CodeBlock.svelte";

    export let pkginfo
    let pkgname = window.location.hash.substring(1)

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
            if (i.includes(":")) newarr.push(prettify(`${i.split(":").at(-1)} (${i.split(":")[0]})`))
            else newarr.push(prettify(i))
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

    h4 {
        align-self: flex-end;
    }
</style>

<svelte:head>
    <title>{prettify(pkgname.replace("-", " "))}</title>
</svelte:head>

<main>
    <div id="maininfo">
        <h1>{prettify(pkgname.replace("-", " "))}</h1>
        <h2>{pkginfo.description}</h2>
        <h3>By {pkginfo.author}</h3>
    </div>

    <div id="generalinfo">
        <h3>Available for:</h3>
        <p>{getversions()}</p>
        <p>{getloaders()}</p>

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
        <p><CodeBlock>kjspkg pkg {pkgname}</CodeBlock> to see more info</p>
    </div>

    <h4>Confused about what this is? Checkout the <a href="/">main page</a></h4>
</main>