<script>
  import CodeBlock from "../lib/CodeBlock.svelte";

</script>
<style>
    :global(body) {
        margin: 0;
    }
    h1, h2 {
        margin-top: 0;
        margin-bottom: 15px;
    }
    div {
        margin-bottom: 5vh;
    }

    #icons {
        display: flex;
        justify-content: center;
        column-gap: 25px;
    }
    #icons > a > img {
        height: 30px;
        filter: invert(1);

        transition: filter .2s;
    }
    #icons > a > img:hover {
        filter: invert(.7);
    }

    @media only screen and (max-width: 600px) {
        #logo {
            height: 250px;
        }
    }
</style>

<main>
    <img id="logo" src="https://raw.githubusercontent.com/Modern-Modpacks/assets/main/Icons/Other/kjspkg.png" alt="logo">

    <div>
        <h1>KJSPKG LOOKUP</h1>
        <h2>Show other people the packages you love!</h2>
    </div>

    <div>
        <p>
            This website serves as a means to share KJSPKG packages more easily. 
            <br />
            <br />
            Don't know what KJSPKG is? Click the GitHub logo at the bottom of the page
            <br />
            <br />
            To link a package, simply do: <CodeBlock>{window.location.origin}/#[package-name]</CodeBlock>!
        </p>
    </div>

    <div id="icons">
        <a href="https://github.com/Modern-Modpacks/kjspkg"><img title="KJSPKG Source" src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBkPSJNMTIgMGMtNi42MjYgMC0xMiA1LjM3My0xMiAxMiAwIDUuMzAyIDMuNDM4IDkuOCA4LjIwNyAxMS4zODcuNTk5LjExMS43OTMtLjI2MS43OTMtLjU3N3YtMi4yMzRjLTMuMzM4LjcyNi00LjAzMy0xLjQxNi00LjAzMy0xLjQxNi0uNTQ2LTEuMzg3LTEuMzMzLTEuNzU2LTEuMzMzLTEuNzU2LTEuMDg5LS43NDUuMDgzLS43MjkuMDgzLS43MjkgMS4yMDUuMDg0IDEuODM5IDEuMjM3IDEuODM5IDEuMjM3IDEuMDcgMS44MzQgMi44MDcgMS4zMDQgMy40OTIuOTk3LjEwNy0uNzc1LjQxOC0xLjMwNS43NjItMS42MDQtMi42NjUtLjMwNS01LjQ2Ny0xLjMzNC01LjQ2Ny01LjkzMSAwLTEuMzExLjQ2OS0yLjM4MSAxLjIzNi0zLjIyMS0uMTI0LS4zMDMtLjUzNS0xLjUyNC4xMTctMy4xNzYgMCAwIDEuMDA4LS4zMjIgMy4zMDEgMS4yMy45NTctLjI2NiAxLjk4My0uMzk5IDMuMDAzLS40MDQgMS4wMi4wMDUgMi4wNDcuMTM4IDMuMDA2LjQwNCAyLjI5MS0xLjU1MiAzLjI5Ny0xLjIzIDMuMjk3LTEuMjMuNjUzIDEuNjUzLjI0MiAyLjg3NC4xMTggMy4xNzYuNzcuODQgMS4yMzUgMS45MTEgMS4yMzUgMy4yMjEgMCA0LjYwOS0yLjgwNyA1LjYyNC01LjQ3OSA1LjkyMS40My4zNzIuODIzIDEuMTAyLjgyMyAyLjIyMnYzLjI5M2MwIC4zMTkuMTkyLjY5NC44MDEuNTc2IDQuNzY1LTEuNTg5IDguMTk5LTYuMDg2IDguMTk5LTExLjM4NiAwLTYuNjI3LTUuMzczLTEyLTEyLTEyeiIvPjwvc3ZnPg==" alt="github"></a>
        <a href="https://modernmodpacks.site"><img title="Modern Modpacks Website" src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0xMiAwYzYuNjIzIDAgMTIgNS4zNzcgMTIgMTJzLTUuMzc3IDEyLTEyIDEyLTEyLTUuMzc3LTEyLTEyIDUuMzc3LTEyIDEyLTEybTIuNTU3IDE2aC01LjExNWMuNTQ2IDIuNDYgMS40NDEgNC4xMTQgMi41NTggNS43NDQgMS4xOTQtMS43NDEgMi4wNDEtMy40MSAyLjU1Ny01Ljc0NG0tNy4xNTcgMGgtNC41NjdjMS4yMzYgMi44MjUgMy43MDQgNC45NzIgNi43NTUgNS43MTYtMS4wNDgtMS43MzMtMS43ODMtMy42NTgtMi4xODgtNS43MTZtMTMuNzY3IDBoLTQuNTY3Yy0uMzkxIDEuOTg4LTEuMDk1IDMuODg3LTIuMTc1IDUuNjk0IDMuMDEyLS43NjMgNS41MTctMi44OTUgNi43NDItNS42OTRtLTE0LjAwNS02aC00Ljk2MmMtLjI2NyAxLjMxMy0uMjY3IDIuNjg1IDAgNGg0LjkxNWMtLjExOS0xLjMyOS0uMTAxLTIuNjcyLjA0Ny00bTcuNjYxIDBoLTUuNjQ3Yy0uMTY1IDEuMzI2LS4xODUgMi42NzItLjA1MyA0aDUuNzUzYy4xMzMtMS4zMjguMTExLTIuNjczLS4wNTMtNG02Ljk3NyAwaC00Ljk2M2MuMTQ4IDEuMzI4LjE2NiAyLjY3MS4wNDggNGg0LjkxNWMuMjYtMS4yODUuMjczLTIuNjQ4IDAtNG0tMTIuMTU2LTcuNzI5Yy0zLjA3Ny43MzItNS41NjcgMi44ODYtNi44MTEgNS43MjloNC42NTNjLjQzNS0yLjA0MiAxLjE3OC0zLjk4NSAyLjE1OC01LjcyOW0yLjM1NS0uMDQ4Yy0xLjA4OSAxLjc3LTEuOTEgMy40NTMtMi40NjMgNS43NzdoNC45MjdjLS41MzQtMi4yNDYtMS4zMzctMy45NDgtMi40NjQtNS43NzdtMi4zNjguMDY5YzEuMDEzIDEuODEyIDEuNzMzIDMuNzYgMi4xNDYgNS43MDhoNC42NTRjLTEuMjMyLTIuODE2LTMuNzYyLTQuOTU4LTYuOC01LjcwOCIvPjwvc3ZnPg==" alt="site"></a>
    </div>
</main>