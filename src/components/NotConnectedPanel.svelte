<script lang="ts">
	import Cluster from './cluster/Cluster.svelte';
	import ClusterRow from './cluster/ClusterRow.svelte';
	import ClusterValue from './cluster/ClusterValue.svelte';
	import NotConnected from './general/NotConnected.svelte';
	import CannotConnectSub from './general/CannotConnectSub.svelte';
	import Download from './general/Download.svelte';
</script>

<Cluster>
	<ClusterRow>
		<ClusterValue>
			<div style={`paddingBottom: 32px`}>
				<NotConnected>Unable to connect to Frame</NotConnected>
				<CannotConnectSub>Make sure the Frame desktop app is running</CannotConnectSub>
				<CannotConnectSub>on your machine or download it below</CannotConnectSub>
			</div>
		</ClusterValue>
	</ClusterRow>
	<ClusterRow>
		<ClusterValue pointerEvents={true}>
			<Download href="https://frame.sh" target="_newtab">Download Frame</Download>
		</ClusterValue>
	</ClusterRow>
</Cluster>
