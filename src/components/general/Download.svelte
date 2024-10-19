<script>
    export let href = "#";
    export let target;
</script>

<a class="download" {href} {target}>
    <slot></slot>
</a>

<style>
    .download {
        color: var(--good);
        height: 64px;
        width: 100%;
        font-weight: 700;
        display: flex;
        justify-content: center;
        align-items: center;
        text-transform: uppercase;
        cursor: pointer;
        font-size: 17px;
        letter-spacing: 1px;
        text-decoration: none; /* Ensure no underline */
    }

    .download * {
        pointer-events: none;
    }

    .download:visited {
        color: var(--good);
    }
</style>
