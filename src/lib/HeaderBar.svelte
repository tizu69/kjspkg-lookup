<script lang="ts">
	import { afterNavigate, goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { AppBar } from '@skeletonlabs/skeleton';
	import { IconArrowLeft, IconGridDots, IconSearch } from '@tabler/icons-svelte';
	import { fly } from 'svelte/transition';
	import consts from './consts';
	import { base } from '$app/paths';

	function getQuery(): string {
		return $page.route.id == '/s/[query]'
			? $page.params.query == '*'
				? ''
				: $page.params.query
			: '';
	}
	let searched = getQuery();

	let inputElement: HTMLInputElement;

	afterNavigate(() => (searched = getQuery()));
</script>

<svelte:window on:keypress={() => inputElement.focus()} />

<AppBar
	gridColumns="md:grid-cols-3 grid-cols-[auto_1fr]"
	slotDefault="place-self-center"
	shadow="shadow-lg"
>
	<svelte:fragment slot="lead">
		<span class="flex items-center gap-2">
			{#if consts.WHERE_TO[$page.route.id ?? ''] != undefined}
				<button
					class="btn-icon hover:variant-soft-primary"
					on:click={() => goto(base + (consts.WHERE_TO[$page.route.id ?? ''] ?? '/'))}
				>
					<IconArrowLeft />
				</button>
			{:else}
				<button
					class="btn-icon hover:variant-soft-primary"
					on:click={() => goto(base + '/s/*')}
				>
					<IconGridDots />
				</button>
			{/if}

			<span class="hidden items-center gap-2 md:flex">
				<span class="divider-vertical md:hidden" />

				<img src={consts.LOGO} alt="logo" class="aspect-square h-8 rounded-token" />
				KJSPKG Lookup
			</span>
		</span>
	</svelte:fragment>

	<div class="input-group input-group-divider w-full grid-cols-[auto_1fr] md:w-fit">
		<div class="text-surface-400">
			<IconSearch />
		</div>

		<input
			type="search"
			placeholder="Search for packages"
			bind:this={inputElement}
			bind:value={searched}
			on:change={() => {
				goto(`/s/${searched || '*'}`);
			}}
		/>
	</div>
</AppBar>
