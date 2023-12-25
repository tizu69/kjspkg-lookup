<script lang="ts">
	import { base } from '$app/paths';
	import { page } from '$app/stores';
	import consts from '$lib/consts';
	import { packageNameToReadableFormat } from '$lib/utils';

	export let p: [string, string][] = [];
</script>

{#each p as [name, locator]}
	{@const locatorInfo = locator.match(consts.LOCATOR_REGEX) ?? [null, null, null, null, null]}
	{@const author = locatorInfo[1]}
	{@const repo = locatorInfo[2]}
	{@const branch = locatorInfo[3]}
	{@const path = locatorInfo[4]}

	<a href={`${base}/p/${name}`} class="card hover:variant-soft-primary flex p-4" class:!variant-filled-primary={$page.params.package == name}>
		<img
			src={consts.AVATARS + author}
			alt="author's profile avatar"
			class="rounded-token my-auto mr-4 aspect-square h-8"
		/>
		<dl>
			<dt class="font-bold">{packageNameToReadableFormat(name)}</dt>
			<dd class="text-sm opacity-50">
				{#if branch}
					<span>on branch {branch.substring(1)}</span>
				{/if}
				{#if path}
					<span>at path {path.substring(1)}</span>
				{/if}
				{#if name != repo}
					<span>in repo {repo}</span>
				{/if}

				<span>by {author}</span>
			</dd>
		</dl>
	</a>
{/each}
