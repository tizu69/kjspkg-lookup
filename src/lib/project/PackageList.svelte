<script lang="ts">
	import { base } from '$app/paths';
	import { page } from '$app/stores';
	import consts from '$lib/consts';
	import { packageNameToReadableFormat } from '$lib/utils';
	import { createEventDispatcher } from 'svelte';
	import { flip } from 'svelte/animate';
	import { fade } from 'svelte/transition';

	const dispatch = createEventDispatcher();

	export let p: [string, string][] = [];
	/** name and author are sorted alphabetically. */
	export let sortBy: '' | 'name' | 'author' | 'downloads' | 'views' = '';
	export let showAvatar = true;
	export let showDetails = true;
	export let showName = true;

	$: sortedP = (() => {
		switch (sortBy) {
			case '':
				return p;
			case 'name':
				return [...p].sort((_a, _b) => {
					const a = _a[0];
					const b = _b[0];

					return a == b ? 0 : a < b ? -1 : 1;
				});
			case 'author':
				return [...p].sort((_a, _b) => {
					const a = (_a[1].match(consts.LOCATOR_REGEX)!)[1];
					const b = (_b[1].match(consts.LOCATOR_REGEX)!)[1];
					
					return a == b ? 0 : a < b ? -1 : 1;
				})
			default:
				return [];
		}
	})();
</script>

{#each sortedP as [name, locator], i (name)}
	{@const locatorInfo = locator.match(consts.LOCATOR_REGEX) ?? [null, null, null, null, null]}
	{@const author = locatorInfo[1]}
	{@const repo = locatorInfo[2]}
	{@const branch = locatorInfo[3]}
	{@const path = locatorInfo[4]}

	<a
		href={`${base}/p/${name}`}
		class="card flex p-4 hover:variant-soft-primary"
		on:click={() => dispatch('select', name)}
		class:!variant-filled-primary={$page.params.package == name}
		animate:flip={{ delay: i * 25, duration: 1000 }}
		transition:fade={{ delay: i * 25, duration: 300 }}
	>
		{#if showAvatar}
			<img
				src={consts.AVATARS + author}
				alt="author's profile avatar"
				class="my-auto mr-4 aspect-square h-8 rounded-token"
			/>
		{/if}
		<dl>
			<dt class="select-text font-bold">{packageNameToReadableFormat(name)}</dt>
			<dd class="text-sm opacity-50">
				{#if branch && showDetails}
					on branch <span class="select-text">{branch.substring(1)}</span>
				{/if}
				{#if path && showDetails}
					at path <span class="select-text">{path.substring(1)}</span>
				{/if}
				{#if name != repo && showDetails}
					in repo <span class="select-text">{repo}</span>
				{/if}

				{#if showName}
					by <span class="select-text">{author}</span>
				{/if}
			</dd>
		</dl>
	</a>
{/each}
