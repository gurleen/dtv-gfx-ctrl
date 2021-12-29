<script>
	import { store } from './store';
	import Info from './panels/Info.svelte';
	import Rundown from './panels/Rundown.svelte';
</script>

<main>
	<Info></Info>
	<Rundown></Rundown>
</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
		background-color: rgb(37, 44, 60);
		display: flex;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>