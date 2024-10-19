<script lang="ts">
    export let style: string | Record<string, string> = "";
</script>

<div
    class="frame-connected"
    style={typeof style === "string"
        ? style
        : Object.entries(style)
              .map(([key, value]) => `${key}: ${value};`)
              .join(" ")}
>
    <slot></slot>
</div>

<style>
    .frame-connected {
        font-size: 14px;
        text-transform: uppercase;
        font-weight: 600;
        letter-spacing: 1px;
        padding-left: 1px;
    }
</style>
