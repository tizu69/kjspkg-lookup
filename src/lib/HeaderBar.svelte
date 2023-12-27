<script lang="ts">
	import { afterNavigate, goto } from '$app/navigation';
	import { base } from '$app/paths';
	import { page } from '$app/stores';
	import { IconBlank } from '$lib';
	import { AppBar } from '@skeletonlabs/skeleton';
	import {
		IconArrowLeft,
		IconCheck,
		IconColorSwatch,
		IconGridDots,
		IconSearch,
		IconSettings
	} from '@tabler/icons-svelte';
	import consts from './consts';
	import { contextMenu, type ContextMenuItem } from './overlays/contextMenu';
	import { getPos, triggerOverlay } from './overlays/overlay';
	import { userPreferencesStore } from './stores';
	import { goBack } from './utils';

	function getQuery(): string {
		return $page.route.id == '/s' ? $page.url.searchParams.get('q') ?? '' : '';
	}

	let searched = getQuery();
	let showOverlay = false;
	let allowSettingsClick = true;

	let inputElement: HTMLInputElement;
	let overlayTarget: HTMLDivElement;

	afterNavigate(() => (searched = getQuery()));

	$: settingsContextMenu = {
		initiator: 'left' as const,
		items: [
			{ type: 'SEPARATOR', header: 'Theme' },

			...[
				{ label: 'KJSPKG', name: 'kjspkg' },
				{ label: '(lighter)', name: 'kjspkg-lighter' },
				{ label: '(G_cat)', name: 'kjspkg-gcat' },
				{},
				{ label: 'Wintry', name: 'wintry' },
				{ label: 'Crimson', name: 'crimson' },
				{ label: 'Serenity', name: 'serenity' }
			].map(({ label, name }) => {
				if (!label || !name) return { type: 'SEPARATOR' };

				return {
					type: 'ITEM' as const,
					label,
					icon: $userPreferencesStore.theme == name ? IconCheck : IconBlank,
					action: () => {
						allowSettingsClick = false;

						document.documentElement.classList.add('color-animated');
						setTimeout(
							() => (
								document.documentElement.classList.remove('color-animated'),
								(allowSettingsClick = true)
							),
							2500
						);

						$userPreferencesStore.theme = name;
						document.body.dataset.theme = $userPreferencesStore.theme ?? 'kjspkg';
						// location.reload();
					}
				};
			})

			/* { type: 'SEPARATOR' },

			{
				type: 'ITEM',
				label: 'Light mode',
				icon: $userPreferencesStore.lightMode ? IconCheck : IconBlank,
				action: () => {
					if (!$userPreferencesStore.lightMode) {
						modalStore.trigger({
							type: 'confirm',
							body:
								"You're about to enable light mode. Light mode is not supported and your" +
								' experience may be degraded. Are you sure?',
							buttonTextConfirm: 'Enable',
							response(r) {
								if (r) $userPreferencesStore.lightMode = true;
								location.reload();
							}
						});
						return;
					}

					$userPreferencesStore.lightMode = false;
					location.reload();
				}
			} */
		] as ContextMenuItem[]
	};
</script>

<svelte:window on:keypress={() => inputElement.focus()} />

<AppBar
	gridColumns="lg:grid-cols-3 grid-cols-[auto_1fr_auto]"
	slotDefault="place-self-center"
	slotTrail="place-self-end"
	shadow="shadow-lg"
>
	<svelte:fragment slot="lead">
		<span class="flex items-center gap-2">
			{#if consts.WHERE_TO[$page.route.id ?? ''] != undefined}
				<button class="btn-icon hover:variant-soft-primary" on:click={goBack}>
					<IconArrowLeft />
				</button>
			{:else}
				<button class="btn-icon hover:variant-soft-primary" on:click={() => goto(base + '/s')}>
					<IconGridDots />
				</button>
			{/if}

			<span class="hidden items-center gap-2 lg:flex">
				<span class="divider-vertical lg:hidden" />

				<img src={consts.LOGO} alt="logo" class="aspect-square h-8 rounded-token" />
				KJSPKG Lookup
			</span>
		</span>
	</svelte:fragment>

	<div
		class="input-group input-group-divider w-full grid-cols-[1fr] lg:w-fit lg:grid-cols-[auto_1fr]"
		bind:this={overlayTarget}
	>
		<div class="hidden text-surface-400 lg:inline">
			<IconSearch class="hidden lg:block" />
		</div>

		<input
			type="search"
			placeholder="Search for packages"
			bind:this={inputElement}
			bind:value={searched}
			on:focus={() => (showOverlay = true)}
			on:blur={() => (showOverlay = false)}
			on:change={() => goto(base + `/s?q=${encodeURIComponent(searched || '')}`)}
		/>
	</div>

	<svelte:fragment slot="trail">
		<button
			class="btn-icon hover:variant-soft-primary"
			disabled={!allowSettingsClick}
			use:contextMenu={settingsContextMenu}
		>
			<IconColorSwatch />
		</button>
	</svelte:fragment>
</AppBar>

<!-- <div
	use:triggerOverlay={{
		pos: {
			x: getPos(overlayTarget).x,
			y: getPos(overlayTarget).y + getPos(overlayTarget).h + 8,
			w: getPos(overlayTarget).w + 'px',
			h: '8rem'
		},
		visible: showOverlay
	}}
	class="card variant-glass-secondary absolute p-2"
>
	TODO: top 3 results for quick access? idk, maybe that or something different (or maybe nothing at
	all) hehe :3
</div> -->
