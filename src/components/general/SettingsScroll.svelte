<script>
    export let scrollBar = 0;
</script>

<div class="settings-scroll" style="margin-right: -{scrollBar}px;">
    <slot></slot>
</div>

<style>
    .settings-scroll {
        overflow-x: hidden;
        overflow-y: scroll;
        box-sizing: border-box;
        max-height: 580px;
        background: var(--ghostY);
        margin: 10px;
        border-radius: 30px;
    }
</style>
