<script lang="ts">
	import { get } from 'svelte/store';
	import { appStore, type Chain } from '../../store';

	import ClusterRow from '../cluster/ClusterRow.svelte';
	import ChainButton from './ChainButton.svelte';

	// Props
	export let tabId: number;

	// Reactive variables for available chains and current chain
	let availableChains: Chain[];
	let currentChain: number | null;

	// Subscribe to appStore for available chains and current chain
	$: {
		const storeValues = get(appStore);
		availableChains = storeValues.availableChains || [];
		currentChain = storeValues.currentChain;
	}

	// Function to split chains into rows (with 2 chains per row)
	$: rows = availableChains.reduce<Chain[][]>((result, value, index, array) => {
		if (index % 2 === 0) result.push(array.slice(index, index + 2));
		return result;
	}, []);

	// Function to check if a chain is selected
	$: isSelected = (chain: Chain): boolean => {
		return parseInt(String(currentChain), 16) === parseInt(String(chain.chainId), 16);
	};
</script>

<!-- Template: Render each row of chains with ChainButton components -->
{#each rows as row}
	<ClusterRow style="justify-content: flex-start;">
		{#each row as chain, i}
			<ChainButton index={i} {chain} {tabId} selected={isSelected(chain)} />
		{/each}
	</ClusterRow>
{/each}
