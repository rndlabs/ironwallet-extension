<script lang="ts">
	import { get } from 'svelte/store';
	import { appStore, type Chain } from '../store';
	import { parseOrigin } from '../helper';
	import NotConnectedPanel from './NotConnectedPanel.svelte';
	import UnsupportedTabPanel from './UnsupportedTabPanel.svelte';
	import CurrentOriginTitle from './general/CurrentOriginTitle.svelte';
	import Cluster from './cluster/Cluster.svelte';
	import ChainSelect from './general/ChainSelect.svelte';
	import ClusterBoxMain from './cluster/ClusterBoxMain.svelte';
	import AppearsAsMmToggle from './general/AppearsAsMMToggle.svelte';

	// Props
	export let tab: chrome.tabs.Tab | undefined;
	export let isSupportedTab: boolean;
	export let mmAppear: boolean;

	// Get available chains and frame connection status from the store
	let availableChains: Chain[] = [];
	let isConnected: boolean = false;

	// Reactive subscription to store
	$: {
		const storeValues = get(appStore);
		availableChains = storeValues.availableChains || [];
		isConnected = storeValues.frameConnected;
	}

	// Parse the tab's origin
	const { protocol, origin } = parseOrigin(tab?.url);
</script>

{#if !isSupportedTab}
	<ClusterBoxMain style="margin-top: 12px;">
		<UnsupportedTabPanel origin={protocol + origin} />
	</ClusterBoxMain>
{:else if !isConnected}
	<ClusterBoxMain style="margin-top: 12px;">
		<NotConnectedPanel />
	</ClusterBoxMain>
{:else if tab && tab.id}
	<ClusterBoxMain style="margin-top: 12px;">
		<CurrentOriginTitle>
			{origin}
		</CurrentOriginTitle>

		<Cluster>
			{#if availableChains.length}
				<ChainSelect tabId={tab.id} />
				<div style="height: 9px;"></div>
			{/if}

			<AppearsAsMmToggle {mmAppear} />
		</Cluster>
	</ClusterBoxMain>
{/if}
