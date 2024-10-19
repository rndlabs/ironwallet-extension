<script lang="ts">
	import { actions } from './store';
	import type { AppState } from './store';
	import { getActiveTab, getInitialSettings, isInjectedUrl, updateCurrentChain } from './helper';

	import Settings from './components/Settings.svelte';
	import { EXTENSION_PORT_NAME } from './constants';

	// Reactive store subscription
	let activeTab: chrome.tabs.Tab | undefined = undefined;
	let mmAppear: boolean = false;
	let isInjectedTab: boolean = false;
	let intervalId: number | undefined;

	// Connect to frame
	const frameConnect = chrome.runtime.connect({ name: EXTENSION_PORT_NAME });
	frameConnect.onMessage.addListener((state: AppState) => {
		actions.setFrameConnected(state.frameConnected);
		actions.setChains(state.availableChains);
		actions.setCurrentChain(state.currentChain);
	});

	let promise = async () => {
		console.info('Settings panel loaded');

		activeTab = await getActiveTab();
		isInjectedTab = isInjectedUrl(activeTab?.url);

		[mmAppear] = isInjectedTab ? await getInitialSettings(activeTab?.id) : [false];

		actions.setFrameConnected(isInjectedTab);

		if (isInjectedTab && activeTab?.id !== undefined) {
			// Set the interval and store the intervalId
			intervalId = window.setInterval(() => {
				updateCurrentChain(activeTab?.id);
			}, 1000);
		}

		console.debug('Initial settings', {
			activeTab,
			isInjectedTab,
			mmAppear
		});
	};
</script>

{#await promise()}
	<p>Loading...</p>
{:then}
	<Settings tab={activeTab} isSupportedTab={isInjectedTab} {mmAppear} />
{:catch error}
	<p style="color: red;">{error.message}</p>
{/await}
