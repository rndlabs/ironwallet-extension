<script lang="ts">
    import Overlay from "./general/Overlay.svelte";
    import SettingsScroll from "./general/SettingsScroll.svelte";
    import ClusterBoxMain from "./cluster/ClusterBoxMain.svelte";
    import FrameConnectedPanel from "./FrameConnectedPanel.svelte";
    import MainPanel from "./MainPanel.svelte";

    export let tab: chrome.tabs.Tab | undefined;
    export let isSupportedTab: boolean;
    export let mmAppear: boolean;

    const getScrollBarWidth = (): number => {
        if (typeof document === "undefined") return 0;

        const inner = document.createElement("p");
        inner.style.width = "100%";
        inner.style.height = "200px";

        const outer = document.createElement("div");
        outer.style.position = "absolute";
        outer.style.top = "0px";
        outer.style.left = "0px";
        outer.style.visibility = "hidden";
        outer.style.width = "200px";
        outer.style.height = "150px";
        outer.style.overflow = "hidden";

        outer.appendChild(inner);
        document.body.appendChild(outer);

        const w1 = inner.offsetWidth;
        outer.style.overflow = "scroll";

        let w2 = inner.offsetWidth;
        if (w1 === w2) w2 = outer.clientWidth;

        document.body.removeChild(outer);

        return w1 - w2;
    };
</script>

<Overlay />
<SettingsScroll scrollBar={getScrollBarWidth()}>
    <ClusterBoxMain><FrameConnectedPanel /></ClusterBoxMain>
    <MainPanel {tab} {isSupportedTab} {mmAppear} />
</SettingsScroll>
