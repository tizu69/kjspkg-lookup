<script>
    let data
</script>

<style>
    b {
        background-color: rgba(0, 0, 0, .45);
        border-radius: 10px;
        padding: 5px;
    }
</style>

<b title="Click to copy" bind:this={data} on:mousedown={() => {navigator.clipboard.writeText(data?.innerText)}}>
    <slot />
</b>