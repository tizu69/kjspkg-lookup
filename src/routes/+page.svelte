<script lang="ts">
	import { goto } from '$app/navigation';
	import { base } from '$app/paths';
	import { userPreferencesStore } from '$lib/stores';
	import { getToastStore } from '@skeletonlabs/skeleton';
	import { onMount } from 'svelte';

	const toastStore = getToastStore();

	onMount(() => {
		switch ($userPreferencesStore.visitState) {
			case 0:
				$userPreferencesStore.visitState = 1;
				goto(base + '/home');
				break;
			case 1:
				$userPreferencesStore.visitState = 2;
				goto(base + '/home');
				break;
			case 2:
				goto(base + '/home');
				toastStore.trigger({
					message: 'Do you wish to be redirected to the package list automatically?',
					timeout: 30_000,
					background: 'variant-filled-success',
					action: {
						label: 'Sure!',
						response: () => setTimeout(() => ($userPreferencesStore.visitState = 5), 1)
					},
					callback(response) {
						if (response.status == 'closed') $userPreferencesStore.visitState = 4;
					}
				});
				break;
			case 4:
				goto(base + '/home');
				break;
			case 5:
				goto(base + '/s');
				break;
			default:
				$userPreferencesStore.visitState = 0;
				goto(base + '/home');
				break;
		}
	});
</script>
