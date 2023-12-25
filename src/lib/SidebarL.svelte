<script lang="ts">
	import { page } from '$app/stores';
	import { slide } from 'svelte/transition';
	import PackageList from '../routes/s/[query]/PackageList.svelte';
	import consts from './consts';
	import { currentAuthorStore, packageListStore } from './stores';

	$: conditionAuthor =
		$packageListStore == undefined || $currentAuthorStore == '' || $page.route.id != '/p/[package]';

	$: sidebarHidden =
		consts.NO_SIDEBAR.includes($page.route.id!) || (conditionAuthor);

	$: filteredCurrentAuthor = Object.entries($packageListStore ?? {}).filter((p) => {
		const locatorInfo = p[1].match(consts.LOCATOR_REGEX) ?? [null, null, null, null, null];
		const author = locatorInfo[1];
		return author == $currentAuthorStore;
	});
</script>

{#if !sidebarHidden}
	<div
		class="bg-surface-700 flex h-full w-96 flex-col gap-2 overflow-y-scroll p-2"
		transition:slide={{ axis: 'x' }}
	>
		{#if !conditionAuthor}
			<h3 class="h4 text-center mt-4">Same author</h3>
			<PackageList p={filteredCurrentAuthor} />
		{/if}
	</div>
{/if}
