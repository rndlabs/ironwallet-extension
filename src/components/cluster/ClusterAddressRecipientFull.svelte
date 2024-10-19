<div class="cluster-address-recipient-full">
	<slot></slot>
</div>

<style>
	.cluster-address-recipient-full {
		position: absolute;
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;
		padding-bottom: 1px;
		display: flex;
		justify-content: center;
		align-items: center;
		cursor: pointer;
		z-index: 40000;
		border-radius: 8px;
		font-weight: 500;
		background: var(--ghostB);
		opacity: 0;
		box-shadow: 0px 4px 4px var(--ghostZ);
		transition: 0.05s linear all;
	}

	.cluster-address-recipient-full:hover {
		opacity: 1;
		transform: translateX(0px) scale(1);
	}
</style>
