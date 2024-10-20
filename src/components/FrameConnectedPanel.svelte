<script lang="ts">
	import { appStore } from '../store';

	import Cluster from './cluster/Cluster.svelte';
	import ClusterRow from './cluster/ClusterRow.svelte';
	import ClusterValue from './cluster/ClusterValue.svelte';
	import LogoWrap from './general/LogoWrap.svelte';
	import FrameConnected from './general/FrameConnected.svelte';
	import SummonFrameButton from './general/SummonFrameButton.svelte';

	// Reactively bind to `frameConnected` in the store
	let isConnected: boolean;

	$: isConnected = $appStore.frameConnected;

	function handleSummonFrame() {
		if (isConnected) chrome.runtime.sendMessage({ method: 'frame_summon', params: [] });
	}
</script>

<Cluster>
	<ClusterRow>
		<ClusterValue
			onClick={handleSummonFrame}
			style={{
				flexGrow: '1',
				color: isConnected ? 'var(--good)' : 'var(--moon)',
				justifyContent: 'space-between',
				height: '64px'
			}}
		>
			<LogoWrap
				src={isConnected ? '../icons/icon96good.png' : '../icons/icon96moon.png'}
				alt="Connection status"
			/>

			{#if isConnected}
				<FrameConnected style="color: var(--good)">Frame Connected</FrameConnected>
			{:else}
				<FrameConnected style="color: var(--moon)">Frame Disconnected</FrameConnected>
			{/if}

			<SummonFrameButton />
		</ClusterValue>
	</ClusterRow>
</Cluster>
