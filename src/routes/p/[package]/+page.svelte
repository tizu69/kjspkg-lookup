<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import CenterLoader from '$lib/CenterLoader.svelte';
	import consts from '$lib/consts';
	import { currentAuthorStore, packageListStore } from '$lib/stores';
	import {
		capitalizeFirstLetter,
		initPackageList,
		markdown,
		markdownInline,
		packageNameToReadableFormat
	} from '$lib/utils';
	import { clipboard, getToastStore } from '@skeletonlabs/skeleton';
	import { onMount } from 'svelte';
	import Dependency from './Dependency.svelte';
	import { base } from '$app/paths';

	const toastStore = getToastStore();

	let thisPackage: { [k: string]: any } = {};
	let state: 'loading' | 'ready' | 'fail' = 'loading';

	let locator: string = '';
	let locatorInfo: RegExpMatchArray | [null, null, null, null, null] = [
		null,
		null,
		null,
		null,
		null
	];
	let docs = '', docLoc = '';

	onMount(async () => {
		if (!(await initPackageList())) goto(base + '/s/*');

		locator = ($packageListStore ?? {})[$page.params.package];
		if (!locator) {
			state = 'fail';
		};

		locatorInfo = locator.match(consts.LOCATOR_REGEX) ?? [null, null, null, null, null];

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

		$currentAuthorStore = author ?? '';

		docLoc = `https://github.com/${author}/${repo}/blob/${branch}${path}/README.md`;

		try {
			const targetUrl = docLoc.replace(
				new RegExp(consts.DOCS_URL_REGEX),
				'raw.githubusercontent.com/$1/$2'
			);

			const res = await fetch(targetUrl);
			if (!res.ok) return;

			const text = await res.text();
			docs = markdown(text);
		} catch {}
	});
</script>

{#if state == 'loading'}
	<CenterLoader />
{:else if state == 'ready'}
	<h1 class="h3 text-center">
		<a
			href={`https://github.com/${locatorInfo[1]}/${locatorInfo[2]}`}
			class="anchor"
			target="_blank"
		>
			{packageNameToReadableFormat($page.params.package) ?? 'This package'}
		</a>
	</h1>

	<div class="blockquote p-4 style-markdown w-full overflow-x-scroll">
		{@html markdownInline(thisPackage.description)}
	</div>

	<div class="grid grid-cols-1 gap-2 lg:grid-cols-2">
		<a
			class="card flex p-4 hover:variant-soft-primary"
			href={`https://github.com/${locatorInfo[1]}`}
			target="_blank"
		>
			<img
				src={consts.AVATARS + locatorInfo[1]}
				alt="author's profile afirst child cssvatar"
				class="my-auto mr-4 aspect-square h-8 rounded-token"
			/>
			<dl>
				<dt class="text-sm opacity-50">Created by</dt>
				<dd class="font-bold">
					{locatorInfo[1]}
					{locatorInfo[1] != thisPackage.author ? `(${thisPackage.author})` : ''}
				</dd>
			</dl>
		</a>

		<div class="card p-4">
			<dt class="text-sm opacity-50">Available for</dt>
			<dd class="flex gap-1">
				{#each thisPackage.modloaders as t}
					<span class="variant-filled-primary badge">{capitalizeFirstLetter(t)}</span>
				{/each}
				&bull;
				{#each thisPackage.versions as t}
					<span class="variant-filled-primary badge">{`1.${+t + 10}`}</span>
				{/each}
			</dd>
		</div>

		<!-- <CodeBlock
			language="Install package"
			code={'kjspkg install ' + $page.params.package}
			background="variant-soft w-full"
			buttonCopied="ok have fun"
		/> -->

		<div class="card space-y-2 p-4 hidden md:block">
			<dt class="text-sm opacity-50">Manage package</dt>
			<dd class="flex flex-col gap-1">
				{#each ['install', 'remove', 'update', '', 'pkg'] as t}
					{#if t}
						<button
							class="code pt-1 text-left hover:brightness-110 active:scale-95"
							use:clipboard={`kjspkg ${t} ${$page.params.package}`}
							on:click={() =>
								toastStore.trigger({
									message: 'Copied to clipboard!',
									hideDismiss: true,
									timeout: 1000,
									background: 'variant-glass-success'
								})}
						>
							kjspkg {t}
							{$page.params.package}
						</button>
					{:else}
						<hr />
					{/if}
				{/each}
			</dd>
		</div>

		{#if thisPackage.dependencies.length > 0 || thisPackage.incompatibilities.length > 0}
			<div class="card h-fit space-y-2 p-4">
				{#if thisPackage.dependencies.length > 0}
					<dt class="text-sm opacity-50">Depends on</dt>
					<dd class="flex w-full gap-1">
						<dl class="list-dl w-full">
							{#each thisPackage.dependencies as t}
								<Dependency {t} />
							{/each}
						</dl>
					</dd>
				{/if}
				{#if thisPackage.incompatibilities.length > 0}
					<dt class="text-sm opacity-50">Incompatible with</dt>
					<dd class="flex w-full gap-1">
						<dl class="list-dl w-full">
							{#each thisPackage.incompatibilities as t}
								<Dependency {t} />
							{/each}
						</dl>
					</dd>
				{/if}
			</div>
		{/if}

		{#if docs != ''}
			<section class="card h-fit space-y-4 p-4 lg:col-span-2">
				<dt class="text-sm opacity-50"><a href={docLoc} class="anchor" target="_blank">README file</a></dt>
				<dd class="style-markdown flex flex-col items-start">{@html docs}</dd>
			</section>
		{/if}
	</div>
{:else if state == 'fail'}
	<p>Something went wrong (this package doesn't seem to exist)</p>
{/if}
