<script lang="ts">
	import { CenterLoader } from '$lib';
	import consts from '$lib/consts';
	import { markdownInline } from '$lib/utils';
	import { onMount } from 'svelte';

	export let locator: string;
	export let popupId: string;

	let thisPackage: { [k: string]: any } = {};
	let state: 'loading' | 'ready' | 'fail' = 'loading';

	let locatorInfo: RegExpMatchArray | [null, null, null, null, null] = [
		null,
		null,
		null,
		null,
		null
	];

	onMount(async () => {
		locatorInfo = locator.match(consts.LOCATOR_REGEX)!;

		const author = locatorInfo[1];
		const repo = locatorInfo[2];
		const branch = (locatorInfo[3]?.substring(1) ?? 'main') + '/'; // TODO: dynamic main branch name
		const path = (locatorInfo[4]?.substring(1) ?? '') + '/';

		try {
			const res = await fetch(
				`https://raw.githubusercontent.com/${author}/${repo}/${branch}${path}.kjspkg`
			);
			const json = await res.json();
			thisPackage = json;
			state = 'ready';
		} catch {
			state = 'fail';
		}
	});
</script>

<div
	class="card variant-glass-surface max-w-96 p-4 !rounded-container-token"
	data-popup={popupId}
	style="opacity: 0;"
>
	<dl>
		<dt class="text-sm opacity-50">Package preview</dt>
		{#if state == 'loading'}
			<CenterLoader />
		{:else if state == 'ready'}
			<dd class="style-markdown blockquote border-l-primary-500 *:pointer-events-none">
				{@html markdownInline(thisPackage.description)}
			</dd>
			<dd class="ml-6 text-sm opacity-50">
				{locatorInfo[1]}
			</dd>
		{:else if state == 'fail'}
			<dd>Something went wrong (this package doesn't seem to exist)</dd>
		{/if}
	</dl>
</div>
