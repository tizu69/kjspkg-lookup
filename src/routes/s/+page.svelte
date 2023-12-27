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

<div class="mt-4 md:flex justify-between">
	<h1 class="h3">
		{#if !$page.url.searchParams.get('q')}
			Found <span>{$packageStatusStore.search.d.length}</span> packages
		{:else}
			Found
			<span>{resultedFilter.length}</span>
			<a href="{base}/s" class="anchor no-underline">
				{resultedFilter.length == 1 ? 'package' : 'packages'}
			</a>

			{#if queryParams.author && filteredAuthor.length > 0}
				<button
					class="transition-all hover:variant-filled-error hover:rounded hover:p-1 hover:px-2 hover:line-through"
					on:click={() => {
						let q = queryParams;
						delete q.author;
						goto(`${base}/s?q=${generateInputString(q)}`);
					}}
				>
					made by {queryParams.author}
				</button>
			{/if}
			{#if queryParams.ROOT != ''}
				matching
				<button
					class="transition-all hover:variant-filled-error hover:rounded hover:p-1 hover:px-2 hover:line-through"
					on:click={() => {
						let q = queryParams;
						q.ROOT = '';
						goto(`${base}/s?q=${generateInputString(q)}`);
					}}
				>
					{queryParams.ROOT}
				</button>
			{/if}
			{#if queryParams._details == 'i'}
				<button
					class="transition-all hover:variant-filled-error hover:rounded hover:p-1 hover:px-2 hover:line-through"
					on:click={() => {
						let q = queryParams;
						delete q._details;
						goto(`${base}/s?q=${generateInputString(q)}`);
					}}
				>
					(detailed)
				</button>
			{/if}
		{/if}
	</h1>

	<div class="flex space-x-2 flex-wrap">
		<button
			class="anchor"
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

		<button
			class="anchor"
			on:click={() => ($userPreferencesStore.compact = !$userPreferencesStore.compact)}
		>
		<span class="inline md:hidden">{$userPreferencesStore.compact ? 'Show icons' : 'Hide icons'}</span>
		<span class="md:inline hidden">{$userPreferencesStore.compact ? 'List view' : 'Compact view'}</span>
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
	<dl
		class="grid grid-cols-1 gap-2"
		class:lg:grid-cols-2={!$userPreferencesStore.compact}
		class:md:grid-cols-2={$userPreferencesStore.compact}
		class:lg:grid-cols-3={$userPreferencesStore.compact}
	>
		<PackageList
			p={resultedFilter}
			showAvatar={!queryParams.author}
			showName={!queryParams.author}
			showDetails={queryParams._details == 'i'}
			sortBy={$userPreferencesStore.sortBy}
			compact={$userPreferencesStore.compact}
		/>
	</dl>
{:else if state == 'fail'}
	<p>Something went wrong</p>
{/if}
