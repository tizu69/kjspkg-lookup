<script lang="ts">
	import { page } from '$app/stores';
	import consts from '$lib/consts';
	import { clipboard, popup } from '@skeletonlabs/skeleton';
	import { getToastStore } from '@skeletonlabs/skeleton';

	const toastStore = getToastStore();

	export let name = 'no-name';
	export let link = '';
</script>

{#each ['install', 'remove', 'update', '', 'pkg'] as t}
	{#if t}
		<button
			class="code pt-1 text-left *:pointer-events-none hover:brightness-110 active:scale-95"
			use:popup={{ event: 'click', placement: 'top', target: 'copy/' + t }}
			use:clipboard={`kjspkg ${t} ${name}`}
			on:click={() =>
				toastStore.trigger({
					message: 'Copied to clipboard!',
					hideDismiss: true,
					timeout: 1000,
					background: 'variant-filled-success'
				})}
		>
			kjspkg {t}
			{name}
		</button>
	{:else}
		<hr />
	{/if}
{/each}

<div
	class="card variant-glass-surface max-w-96 p-4 !rounded-container-token"
	data-popup="copy/install"
	style="opacity: 0;"
>
	<p>
		In case you aren't aware, you need the
		<a href={consts.KJSPKG_README} class="anchor">KJSPKG</a>
		tool to install this package!
	</p>
</div>
<div
	class="card variant-glass-surface max-w-96 p-4 !rounded-container-token"
	data-popup="copy/remove"
	style="opacity: 0;"
>
	<p>
		Got an issue? Need help? Use this packages
		<a href={link} class="anchor">issue tracker</a>
		to let us know!
	</p>
</div>

<div data-popup="copy/update" style="opacity: 0;" />
<div data-popup="copy/pkg" style="opacity: 0;" />
