<script lang="ts">
    import { toggleLocalSetting } from "../../helper";
    import { APPEAR_AS_MM } from "../../constants";

    // Props
    export let mmAppear: boolean;

    // Import components
    import AppearDescription from "./AppearDescription.svelte";
    import AppearToggle from "./AppearToggle.svelte";
    import ClusterRow from "../cluster/ClusterRow.svelte";
    import ClusterValue from "../cluster/ClusterValue.svelte";

    // Function to toggle the appearance mode
    function handleToggle() {
        toggleLocalSetting(APPEAR_AS_MM);
    }
</script>

<!-- Common rendering for both Metamask and Frame -->
<ClusterRow>
    <ClusterValue>
        <AppearDescription {mmAppear}>
            <span>
                Injecting as <span class={mmAppear ? 'mm' : 'frame'}>{mmAppear ? 'Metamask' : 'Frame'}</span>
            </span>
        </AppearDescription>
    </ClusterValue>
</ClusterRow>

<!-- Toggle switch for appearance -->
<ClusterRow>
    <ClusterValue onClick={handleToggle}>
        <AppearToggle>
            <span>
                Appear As <span class={mmAppear ? 'frame' : 'mm'}>{mmAppear ? 'Frame' : 'Metamask'}</span> Instead
            </span>
        </AppearToggle>
    </ClusterValue>
</ClusterRow>
