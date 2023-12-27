<script lang="ts">
	import { goto } from '$app/navigation';
	import { base } from '$app/paths';
	import { page } from '$app/stores';
	import { CenterLoader, Dependency, ManagePackage } from '$lib';
	import consts from '$lib/consts';
	import { currentAuthorStore, packageListStore } from '$lib/stores';
	import {
		capitalizeFirstLetter,
		goBack,
		initPackageList,
		markdown,
		markdownInline,
		packageNameToReadableFormat
	} from '$lib/utils';
	import { getToastStore } from '@skeletonlabs/skeleton';
	import { onMount } from 'svelte';

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
	let docs = '',
		docLoc = '',
		issueLink = '';

	onMount(async () => {
		if (!(await initPackageList())) goto(base + '/s');

		locator = ($packageListStore ?? {})[$page.url.searchParams.get('id') ?? ''];
		if (!locator) {
			state = 'fail';
		}

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

		$currentAuthorStore = author ?? '';

		/* if (!$packageStatusStore.back.d.some((p) => p[0] == $page.url.searchParams.get('id')))
			$packageStatusStore.back.d = [
				...$packageStatusStore.back.d,
				...$packageStatusStore.search.d.filter((p) => p[0] == $page.url.searchParams.get('id'))
			]; */

		issueLink = `https://github.com/${author}/${repo}/issues`;
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

	$: title = `${packageNameToReadableFormat($page.url.searchParams.get('id') ?? 'no-name')} - KJSPKG Lookup`
</script>

<svelte:head>
	<title>{title}</title>

	<meta property="og:title" content="{title}" />
	<meta property="og:type" content="website" />
	<meta property="og:url" content="http://my.site.com" />
	<meta property="og:image" content="http://my.site.com/images/thumb.png" />
	<meta property="og:description" content="Site description" />
	<meta name="theme-color" content="#FF0000" />
</svelte:head>

{#if state == 'loading'}
	<CenterLoader />
{:else if state == 'ready'}
	<h1 class="font-bold text-center h2">
		<a
			href={`https://github.com/${locatorInfo[1]}/${locatorInfo[2]}`}
			class="no-underline select-text anchor"
			target="_blank"
		>
			{packageNameToReadableFormat($page.url.searchParams.get('id') ?? 'no-name') ?? 'This package'}
		</a>
	</h1>

	<div class="style-markdown blockquote w-full select-text overflow-x-scroll p-4 *:select-text">
		{@html markdownInline(thisPackage.description)}
	</div>

	<div class="grid grid-cols-1 gap-2 lg:grid-cols-2">
		<a class="flex p-4 card hover:variant-soft-primary" href={base + `/s?q=@author:${locatorInfo[1]}`}>
			<img
				src={consts.AVATARS + locatorInfo[1]}
				alt="author's profile afirst child cssvatar"
				class="h-8 my-auto mr-4 aspect-square rounded-token"
			/>
			<dl>
				<dt class="text-sm opacity-50">Created by</dt>
				<dd class="font-bold select-text">
					{locatorInfo[1]}
					{locatorInfo[1] != thisPackage.author ? `(${thisPackage.author})` : ''}
				</dd>
			</dl>
		</a>

		<div class="p-4 card">
			<dt class="text-sm opacity-50">Available for</dt>
			<dd class="flex gap-1 flex-wrap">
				{#each thisPackage.modloaders as t}
					<span class="select-text variant-filled-primary badge">{capitalizeFirstLetter(t)}</span>
				{/each}
				&bull;
				{#each thisPackage.versions as t}
					<span class="select-text variant-filled-primary badge">{`1.${+t + 10}`}</span>
				{/each}
			</dd>
		</div>

		<!-- <CodeBlock
			language="Install package"
			code={'kjspkg install ' + $page.url.searchParams.get('id')}
			background="variant-soft w-full"
			buttonCopied="ok have fun"
		/> -->

		<div class="hidden p-4 space-y-2 card md:block">
			<dt class="text-sm opacity-50">Manage package (click to copy)</dt>
			<dd class="flex flex-col gap-1">
				<ManagePackage name={$page.url.searchParams.get('id') ?? 'no-name'} link={issueLink} />
			</dd>
		</div>

		{#if thisPackage.dependencies.length > 0 || thisPackage.incompatibilities.length > 0}
			<div class="p-4 space-y-2 card h-fit">
				{#if thisPackage.dependencies.length > 0}
					<dt class="text-sm opacity-50">Depends on</dt>
					<dd class="flex w-full gap-1">
						<dl class="w-full list-dl">
							{#each thisPackage.dependencies as t}
								<Dependency {t} />
							{/each}
						</dl>
					</dd>
				{/if}
				{#if thisPackage.incompatibilities.length > 0}
					<dt class="text-sm opacity-50">Incompatible with</dt>
					<dd class="flex w-full gap-1">
						<dl class="w-full list-dl">
							{#each thisPackage.incompatibilities as t}
								<Dependency {t} />
							{/each}
						</dl>
					</dd>
				{/if}
			</div>
		{/if}

		{#if docs != ''}
			<section class="p-4 space-y-4 card h-fit lg:col-span-2">
				<dt class="text-sm opacity-50">
					<a href={docLoc} class="anchor" target="_blank">README file</a>
				</dt>
				<dd class="style-markdown flex select-text flex-col items-start *:select-text">
					{@html docs}
				</dd>
			</section>
		{/if}
	</div>
{:else if state == 'fail'}
	<!-- <p>Something went wrong (this package doesn't seem to exist)</p> -->
	{(() => {
		toastStore.trigger({
			message: `Package Broken`,
			hideDismiss: true,
			timeout: 5000,
			background: 'variant-filled-error'
		});
		goBack();
	})()}
{/if}
