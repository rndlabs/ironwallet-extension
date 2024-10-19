<script lang="ts">
	export let style: string | Record<string, string> = '';
</script>

<div
	class="cluster-row"
	style={typeof style === 'string'
		? style
		: Object.entries(style)
				.map(([key, value]) => `${key}: ${value};`)
				.join(' ')}
>
	<slot></slot>
</div>

<style>
	.cluster-row {
		display: flex;
		justify-content: center;
		align-items: stretch;
		font-weight: 300;
		margin-left: 3px;
	}

	.cluster-row:first-child > .cluster-value {
		border-top-left-radius: 18px;
	}

	.cluster-row:last-child > .cluster-value {
		border-bottom-left-radius: 18px;
	}
</style>
