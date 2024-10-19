<div class="cluster-column">
	<slot></slot>
</div>

<style>
	.cluster-column {
		display: flex;
		flex-direction: column;
		flex-grow: 1;
		font-size: 14px;
		align-items: stretch;
	}

	.cluster-column > .cluster-value {
		border-radius: 8px;
	}

	.cluster-column:first-child > .cluster-value:first-child {
		border-top-left-radius: 18px;
	}

	.cluster-column:last-child > .cluster-value:first-child {
		border-top-right-radius: 18px;
	}
</style>
