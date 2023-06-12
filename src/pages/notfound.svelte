<script>
  import CodeBlock from "../lib/CodeBlock.svelte";
</script>

<style>
    * {
        margin-bottom: 0;
    }
    a {
        font-size: 1.5em;
        font-weight: bold;
    }
</style>

<svelte:head>
    <title>Package not found</title>
</svelte:head>

<main>
    <h1>Whoops, something has gone wrong!</h1>
    <h2>The package <CodeBlock>{window.location.pathname.substring(1)}</CodeBlock> was not found</h2>

    <br />
    <br />

    <a href="/">Go back</a>
</main>