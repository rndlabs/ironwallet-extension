<script lang="ts">
    import { get } from "svelte/store";
    import { appStore, type Chain } from "../store";
    import { parseOrigin } from "../helper";
    import NotConnectedPanel from "./NotConnectedPanel.svelte";
    import UnsupportedTabPanel from "./UnsupportedTabPanel.svelte";
    import CurrentOriginTitle from "./general/CurrentOriginTitle.svelte";
    import Cluster from "./cluster/Cluster.svelte";
    import ChainSelect from "./general/ChainSelect.svelte";
    import ClusterBoxMain from "./cluster/ClusterBoxMain.svelte";
    import AppearsAsMmToggle from "./general/AppearsAsMMToggle.svelte";

    // Props
    export let tab: chrome.tabs.Tab | undefined;
    export let isSupportedTab: boolean;
    export let mmAppear: boolean;

    // Get available chains and frame connection status from the store
    let availableChains: Chain[] = [];
    let isConnected: boolean = false;

    // Reactive subscription to store
    $: {
        const storeValues = get(appStore);
        availableChains = storeValues.availableChains || [];
        isConnected = storeValues.frameConnected;
    }

    // Parse the tab's origin
    const { protocol, origin } = parseOrigin(tab?.url!);
</script>

{#if !isConnected}
    <ClusterBoxMain style="margin-top: 12px;">
        <NotConnectedPanel />
    </ClusterBoxMain>
{:else if !isSupportedTab}
    <ClusterBoxMain style="margin-top: 12px;">
        <UnsupportedTabPanel origin={protocol + origin} />
    </ClusterBoxMain>
{:else}
    {#if tab && tab.id}
        <ClusterBoxMain style="margin-top: 12px;">
            <CurrentOriginTitle>
                <svg viewBox="0 0 512 512">
                    <path
                        fill="currentColor"
                        d="M448 32C483.3 32 512 60.65 512 96V416C512 451.3 483.3 480 448 480H64C28.65 480 0 451.3 0 416V96C0 60.65 28.65 32 64 32H448zM96 96C78.33 96 64 110.3 64 128C64 145.7 78.33 160 96 160H416C433.7 160 448 145.7 448 128C448 110.3 433.7 96 416 96H96z"
                    />
                </svg>
                {origin}
            </CurrentOriginTitle>

            <Cluster>
                {#if availableChains.length}
                    <ChainSelect tabId={tab.id} />
                    <div style="height: 9px;"></div>
                {/if}

                <AppearsAsMmToggle mmAppear={mmAppear}/>
            </Cluster>
        </ClusterBoxMain>
    {/if}
{/if}
