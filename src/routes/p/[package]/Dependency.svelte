<script lang="ts">
	import { packageNameToReadableFormat } from '$lib/utils';
	import { IconPackage, IconPuzzle } from '@tabler/icons-svelte';

	export let t: any;
	// let mrUrl: string = '';

	/* onMount(async () => {
		if (t.startsWith('mod:')) {
			try {
				const res = await fetch(consts.MR_VALID + t.split(':')[1]);
				if (res.ok) mrUrl = consts.MR_TARGET + t.split(':')[1];
			} catch {}
		}
	}); */
</script>

{#if t.startsWith('mod:')}
	<span class="flex w-full items-center gap-2 p-2">
		<IconPuzzle />
		<span class="flex-auto">
			<dt class="font-bold">{t.split(':')[1]}</dt>
			<dd class="text-sm opacity-50">external mod</dd>
		</span>
	</span>
{:else}
	<a
		class="hover:variant-soft-primary rounded-container-token flex w-full items-center gap-2 p-2"
		href={`/p/${t}`}
		target="_blank"
	>
		<IconPackage />
		<span class="flex-auto">
			<dt class="font-bold">{packageNameToReadableFormat(t)}</dt>
			<dd class="text-sm opacity-50">KJS package</dd>
		</span>
	</a>
{/if}
