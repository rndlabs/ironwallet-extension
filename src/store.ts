import { writable } from 'svelte/store';

export interface Chain {
	chainId: number;
	connected?: boolean;
	name?: string;
}

// Define the types for the store state
export interface AppState {
	frameConnected: boolean;
	availableChains: Chain[];
	currentChain: number | null;
}

// Define the initial state with proper types
const initialState: AppState = {
	frameConnected: false,
	availableChains: [],
	currentChain: null
};

// Create a writable store with the initial state
export const appStore = writable<AppState>(initialState);

// Define actions to update the store state
export const actions = {
	setChains: (chains: Chain[]) => {
		appStore.update((state) => ({
			...state,
			availableChains: chains
		}));
	},
	setCurrentChain: (chain: number | null) => {
		appStore.update((state) => ({
			...state,
			currentChain: chain
		}));
	},
	setFrameConnected: (connected: boolean) => {
		appStore.update((state) => ({
			...state,
			frameConnected: connected
		}));
	}
};
