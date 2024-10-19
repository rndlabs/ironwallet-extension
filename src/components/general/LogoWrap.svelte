<script lang="ts">
    export let src: string;
    export let alt: string;
</script>

<div class="logo-wrap">
    <img {src} {alt} />
</div>

<style>
    .logo-wrap {
        width: 80px;
        height: 50px;
        display: flex;
        justify-content: center;
        align-items: center;
        box-sizing: border-box;
    }

    .logo-wrap img {
        height: 20px;
    }
</style>
