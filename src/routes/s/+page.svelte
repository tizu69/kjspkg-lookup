<script lang="ts">
	import { goto } from '$app/navigation';
	import { base } from '$app/paths';
	import { onMount } from 'svelte';
	
	onMount(() => goto(base + '/s/*'));
</script>

<p>Redirecting to <a href="{base}/s/*" class="anchor">/s/*</a></p>