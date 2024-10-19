<script lang="ts">
	export let pointerEvents: boolean = false;
	export let transparent: boolean = false;
	export let onClick: (() => void) | null = null;
	export let style: string | Record<string, string> = '';
</script>

<div
	class="cluster-value"
	class:pointer-events={pointerEvents}
	class:transparent
	class:clickable={onClick || pointerEvents}
	on:click={() => onClick && onClick()}
	style={typeof style === 'string'
		? style
		: Object.entries(style)
				.map(([key, value]) => `${key}: ${value};`)
				.join(' ')}
>
	<slot></slot>
</div>

<style>
	.cluster-value {
		flex-grow: 1;
		display: flex;
		justify-content: center;
		align-items: center;
		border-radius: 8px;
		margin-right: 3px;
		font-size: 14px;
		background: var(--ghostA);
		box-shadow: 0px 1px 2px var(--ghostX);
		border-bottom: 2px solid var(--ghostZ);
		overflow: hidden;
		margin-top: 1px;
		transition: all linear 0.1s;
		transform: translate3d(0, 0, 0);
		font-family: 'MainFont';
	}

	.clickable {
		cursor: pointer;
		margin-bottom: 0px;
		position: relative;
		z-index: 3;
	}

	.clickable:hover {
		background: var(--ghostB);
		transform: translateY(-1px);
		border-bottom: 2px solid var(--ghostZ);
		box-shadow: 0px 4px 30px -8px var(--ghostX);
		z-index: 300000;
	}

	.clickable:active {
		background: var(--ghostB);
		transform: translateY(0px);
		box-shadow: 0px 2px 4px var(--ghostX);
	}

	.transparent {
		background: transparent;
		box-shadow: none;
		border-bottom: 2px solid transparent;
	}

	.pointer-events {
		pointer-events: auto;
	}
</style>
