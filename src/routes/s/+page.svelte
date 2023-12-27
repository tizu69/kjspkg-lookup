<script lang="ts">
	import { goto } from '$app/navigation';
	import { base } from '$app/paths';
	import { page } from '$app/stores';
	import consts from '$lib/consts';
	import { packageStatusStore, packageListStore, userPreferencesStore } from '$lib/stores';
	import {
		filterObjectByKey,
		generateInputString,
		initPackageList,
		parseInputString
	} from '$lib/utils';
	import { onMount } from 'svelte';
	import { contextMenu } from '$lib/overlays/contextMenu';
	import { IconCheck } from '@tabler/icons-svelte';
	import { IconBlank, PackageList, Author, CenterLoader } from '$lib/index';

	let state: 'loading' | 'ready' | 'fail' = $packageListStore == undefined ? 'loading' : 'ready';

	onMount(async () => {
		state = (await initPackageList()) ? 'ready' : 'fail';
	});

	$: queryParams = parseInputString($page.url.searchParams.get('q') ?? '');

	$: $packageStatusStore.search.d = Object.entries(
		(!$page.url.searchParams.get('q')
			? $packageListStore
			: filterObjectByKey($packageListStore ?? {}, queryParams.ROOT)) ?? {}
	);
	$: $packageStatusStore.search.v =
		$packageStatusStore.search.d.length != Object.keys($packageListStore ?? {}).length;

	$: filteredAuthor = $packageStatusStore.search.d.filter((p) => {
		const locatorInfo = p[1].match(consts.LOCATOR_REGEX)!;
		const author = locatorInfo[1];
		return author == queryParams.author;
	});

	$: resultedFilter = queryParams.author ? filteredAuthor : $packageStatusStore.search.d;
</script>

<svelte:head>
	<title>{$page.url.searchParams.get('q') || 'Search'} - KJSPKG Lookup</title>
</svelte:head>

<div class="mt-4 flex justify-between">
	<h1 class="h3">
		{#if !$page.url.searchParams.get('q')}
			{$packageStatusStore.search.d.length} packages available
		{:else}
			Found
			<span class="select-text">{resultedFilter.length}</span>
			<a href="{base}/s" class="anchor no-underline"
				>{resultedFilter.length == 1 ? 'package' : 'packages'}</a
			>

			{#if queryParams.author && filteredAuthor.length > 0}
				<span>
					made by
					<a
						href="https://github.com/{queryParams.author}"
						class="anchor no-underline"
						target="_blank"
					>
						{queryParams.author}
					</a>
				</span>
			{/if}
			{#if queryParams.ROOT != ''}
				<span>matching {`"${queryParams.ROOT}"`}</span>
			{/if}
			{#if queryParams._details == 'i'}
				<span>(detailed)</span>
			{/if}
		{/if}
	</h1>

	<div class="flex gap-2">
		<button
			class="anchor hidden md:inline"
			use:contextMenu={{
				initiator: 'left',
				items: [
					{
						label: 'Name (a-z)',
						name: 'name'
					},
					{
						label: 'Author (a-z)',
						name: 'author'
					}
					/* {
						label: 'Download count',
						name: 'downloads'
					},
					{
						label: 'Views',
						name: 'views'
					} */
				].map(({ label, name }) => ({
					type: 'ITEM',
					label,
					icon: $userPreferencesStore.sortBy == name ? IconCheck : IconBlank,
					// @ts-expect-error me lazy. be like me.
					action: () => ($userPreferencesStore.sortBy = name)
				}))
			}}
		>
			{$userPreferencesStore.sortBy != ''
				? `Sorted by ${$userPreferencesStore.sortBy}`
				: 'Unsorted'}
		</button>

		{#if queryParams._details != 'i'}
			<button
				class="anchor hidden md:inline"
				on:click={() => {
					let q = queryParams;
					q._details = 'i';
					q.ROOT == '*' && (q.ROOT = '');
					goto(`${base}/s?q=${generateInputString(q)}`);
				}}
			>
				Show details
			</button>
		{/if}
	</div>
</div>

{#if queryParams.author && filteredAuthor.length > 0}
	<Author p={filteredAuthor[0]} c={filteredAuthor.length} />
{/if}

{#if state == 'loading'}
	<CenterLoader />
{:else if state == 'ready' && resultedFilter.length == 0}
	<p>Here, have a cookie, if that makes you feel any better: 🍪</p>
	<p class="text-sm opacity-50">
		Fun fact: You can use '@author:name' to view packages made by an author. What 'bout using
		'@details' to get technical details on each package?
	</p>
{:else if state == 'ready'}
	<dl class="grid grid-cols-1 gap-2 lg:grid-cols-2">
		<PackageList
			p={resultedFilter}
			showAvatar={!queryParams.author}
			showName={!queryParams.author}
			showDetails={queryParams._details == 'i'}
			sortBy={$userPreferencesStore.sortBy}
		/>
	</dl>
{:else if state == 'fail'}
	<p>Something went wrong</p>
{/if}
