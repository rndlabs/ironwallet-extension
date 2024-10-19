<div class="cluster-box-label">
    <slot></slot>
</div>

<style>
    .cluster-box-label {
        position: relative;
        font-size: 16px;
        padding: 16px 0px 8px 0px;
        font-family: "MainFont";
        font-weight: 400;
        display: flex;
        align-items: center;
        justify-content: center;
        color: var(--moon);
    }

    .cluster-box-label svg {
        position: relative;
        top: -1px;
        height: 16px;
        margin-right: 12px;
    }
</style>
