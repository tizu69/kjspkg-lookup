<script lang="ts">
	import { page } from '$app/stores';
	import { HeaderBar, SidebarL, SidebarR } from '$lib/index';
	import { AppShell, Toast, initializeStores } from '@skeletonlabs/skeleton';

	import '../app.pcss';

	initializeStores();
</script>

<Toast />

<AppShell
	slotSidebarLeft="hidden 2xl:block"
	slotSidebarRight="hidden 2xl:block"
	slotPageFooter="p-2 flex justify-between"
>
	<svelte:fragment slot="header">
		<HeaderBar />
	</svelte:fragment>

	<svelte:fragment slot="sidebarLeft">
		<SidebarR />
	</svelte:fragment>
	<!-- <svelte:fragment slot="sidebarRight">
	</svelte:fragment> -->

	<div class="container mx-auto space-y-4 p-10">
		{#key $page.url.pathname}
			<slot />
		{/key}
	</div>

	<svelte:fragment slot="pageFooter">
		<span class="hidden md:inline">
			<a
				href="https://github.com/Modern-Modpacks/kjspkg"
				class="anchor no-underline"
				target="_blank">KJSPKG @ GitHub</a
			>
			&bull;
			<a
				href="https://github.com/Modern-Modpacks/kjspkg-lookup"
				class="anchor no-underline"
				target="_blank">KJSPKG Lookup @ GitHub</a
			>
			&bull;
			<a href="https://modernmodpacks.site" class="anchor no-underline" target="_blank"
				>Modern Modpacks</a
			>
		</span>

		<span class="hidden text-sm opacity-50 md:inline">
			Website designed with love by <a
				href="https://github.com/tizu69"
				class="anchor no-underline"
				target="_blank">tizu69</a
			> &lt;3
		</span>
	</svelte:fragment>
</AppShell>
