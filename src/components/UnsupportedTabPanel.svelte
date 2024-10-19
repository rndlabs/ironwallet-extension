<script lang="ts">
	import Cluster from './cluster/Cluster.svelte';
	import ClusterRow from './cluster/ClusterRow.svelte';
	import ClusterValue from './cluster/ClusterValue.svelte';
	import UnsupportedTab from './general/UnsupportedTab.svelte';
	import CannotConnectSub from './general/CannotConnectSub.svelte';
	import UnsupportedOrigin from './general/UnsupportedOrigin.svelte';

	export let origin: string;
</script>

<Cluster>
	<ClusterRow>
		<ClusterValue>
			<div style="paddingBottom: 32px">
				<UnsupportedTab>Unsupported tab</UnsupportedTab>
				<CannotConnectSub>
					<div>Frame does not have access to</div>
					<UnsupportedOrigin>{origin}</UnsupportedOrigin>
					<div>tabs in this browser</div>
				</CannotConnectSub>
			</div>
		</ClusterValue>
	</ClusterRow>
</Cluster>
