<script lang="ts">
    export let style: string | Record<string, string> = "";
</script>

<div
    class="cluster-box-main"
    style={typeof style === "string"
        ? style
        : Object.entries(style)
              .map(([key, value]) => `${key}: ${value};`)
              .join(" ")}
>
    <slot></slot>
</div>

<style>
    .cluster-box-main {
        position: relative;
        z-index: 100001;
        border-radius: 26px;
        overflow: hidden;
        box-shadow:
            0px 4px 8px var(--ghostY),
            0px 2px 8px var(--ghostY);
        border-bottom: 2px solid var(--ghostZ);
        padding: 0;
        text-align: center;
        margin: 6px;
        box-sizing: border-box;
        background: var(--ghostAZ);
        user-select: none;
    }
</style>
