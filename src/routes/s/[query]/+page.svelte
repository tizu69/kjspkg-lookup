<script lang="ts">
	import PackageList from './PackageList.svelte';

	import { page } from '$app/stores';
	import CenterLoader from '$lib/CenterLoader.svelte';
	import { filteredPackagesStore, packageListStore } from '$lib/stores';
	import { filterObjectByKey, initPackageList } from '$lib/utils';
	import { onMount } from 'svelte';
	import { base } from '$app/paths';

	let state: 'loading' | 'ready' | 'fail' = $packageListStore == undefined ? 'loading' : 'ready';

	onMount(async () => {
		state = (await initPackageList()) ? 'ready' : 'fail';
	});

	$: $filteredPackagesStore = Object.entries(
		($page.params.query == '*'
			? $packageListStore
			: filterObjectByKey($packageListStore ?? {}, $page.params.query)) ?? {}
	);
</script>

<h1 class="h3 mt-4 text-center">
	{#if $page.params.query == '*'}
		All the packages
	{:else}
		<a href="{base}/s/*" class="anchor no-underline">All the packages</a> matching
		{`"${$page.params.query}"`}
	{/if}
</h1>

{#if state == 'loading'}
	<CenterLoader />
{:else if state == 'ready' && $filteredPackagesStore.length == 0}
	<p>No packages found</p>
{:else if state == 'ready'}
	<dl class="grid grid-cols-1 gap-2 lg:grid-cols-2">
		<PackageList p={$filteredPackagesStore} />
	</dl>
{:else if state == 'fail'}
	<p>Something went wrong</p>
{/if}
