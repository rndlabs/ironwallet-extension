<script>
    export let selected = false;
</script>

<div
    class="chain-button-icon"
    style="background: {selected ? 'var(--good)' : 'var(--ghostAZ)'};"
>
    <slot></slot>
</div>

<style>
    .chain-button-icon {
        position: absolute;
        top: 12px;
        left: 10px;
        width: 20px;
        height: 20px;
        border-radius: 10px;
        box-sizing: border-box;
        border: solid 3px var(--ghostZ);
    }
</style>
