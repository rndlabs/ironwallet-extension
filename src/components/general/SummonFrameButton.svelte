<div class="summon-frame-button">
    <slot></slot>
</div>

<style>
    .summon-frame-button {
        width: 80px;
        height: 50px;
        display: flex;
        justify-content: center;
        align-items: center;
        box-sizing: border-box;
    }

    .summon-frame-button svg {
        height: 20px;
        transform: scaleX(-1);
    }
</style>
