<div class="overlay">
	<slot></slot>
</div>

<style>
	.overlay {
		position: absolute;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		background: linear-gradient(-35deg, var(--overlayA) 0%, var(--overlayB) 100%);
		z-index: 9999999999999;
		pointer-events: none;
	}
</style>
