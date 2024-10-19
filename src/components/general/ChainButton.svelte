<script lang="ts">
    import ClusterValue from "../cluster/ClusterValue.svelte";
    import ChainButtonIcon from "./ChainButtonIcon.svelte";
    import ChainButtonLabel from "./ChainButtonLabel.svelte";

    import { type Chain } from "../../store";
    import { chainConnected, updateCurrentChain } from "../../helper";

    export let index;
    export let chain: Chain;
    export let tabId: number;
    export let selected = false;

    const { chainId, name } = chain;

    $: isSelectable = chainConnected(chain);

    function handleClick() {
        if (isSelectable) {
            chrome.runtime.sendMessage({
                tab: tabId,
                method: "wallet_switchEthereumChain",
                params: [{ chainId }],
            });
            updateCurrentChain(tabId);
        }
    }
</script>

<ClusterValue
    style={`flex-grow: 0; width: calc(50% - 3px); border-bottom-right-radius: ${index === 0 ? "8px" : "auto"}; opacity: ${isSelectable ? 1 : 0.4}; cursor: ${isSelectable ? "pointer" : "default"}`}
    on:click={handleClick}
>
    <ChainButtonIcon {selected} />
    <ChainButtonLabel>{name}</ChainButtonLabel>
</ClusterValue>
