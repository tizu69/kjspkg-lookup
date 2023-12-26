<script lang="ts">
	import { goto } from '$app/navigation';
	import { base } from '$app/paths';
	import { page } from '$app/stores';
	import consts from '$lib/consts';

	if ($page.url.hash != '') {
		goto(base + `/p/${$page.url.hash.substring(1)}`);
	}
</script>

<img src={consts.LOGO} alt="logo" class="mx-auto aspect-square h-32 rounded-token" />
<h1 class="h1 text-center hover:hue-rotate">KJSPKG</h1>

<hr />

<p class="text-center">
	This website serves as a means to share KJSPKG packages more easily. Use the search bar above to
	search for packages, or <a href="{base}/s" class="anchor">browse all packages</a>.
</p>
<p class="text-center">
	Think something's missing? Please report it to us. For the time being, you can alternatively use
	the old <a href="{base}/legacy/index.html" class="anchor">legacy lookup</a>.
</p>
