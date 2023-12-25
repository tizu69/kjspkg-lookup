<script lang="ts">
	import { page } from '$app/stores';
	import { slide } from 'svelte/transition';
	import consts from './consts';
	import PackageList from '../routes/s/[query]/PackageList.svelte';
	import { filteredPackagesStore, packageListStore } from './stores';

	$: conditionSearch =
		$packageListStore == undefined ||
		$filteredPackagesStore.length == 0 ||
		$filteredPackagesStore.length == Object.values($packageListStore).length;
	$: sidebarHidden =
		consts.NO_SIDEBAR.includes($page.route.id!) || conditionSearch;
</script>

{#if !sidebarHidden}
	<div
		class="bg-surface-700 flex h-full w-96 flex-col gap-2 overflow-y-scroll p-2"
		transition:slide={{ axis: 'x' }}
	>
		{#if !conditionSearch}
			<h3 class="h4 text-center mt-4">Latest search results</h3>
			<PackageList p={$filteredPackagesStore} />
		{/if}
	</div>
{/if}
