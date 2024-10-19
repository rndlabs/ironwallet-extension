import { APPEAR_AS_MM } from "./constants";
import type { Chain } from "./store";

// Define the structure of a ScriptResult returned by chrome.scripting.executeScript
interface ScriptResult {
    result?: string | null;
}

// Function to get the active tab
export async function getActiveTabId(): Promise<number | undefined> {
    const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
    return tabs[0]?.id;
}

export async function getActiveTab(): Promise<chrome.tabs.Tab | undefined> {
    const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
    return tabs[0];
}

// Function to execute a script in a tab
async function executeScript<T>(tabId: number, func: (...args: any[]) => T, args: any[]): Promise<ScriptResult[]> {
    try {
        const result = await chrome.scripting.executeScript({
            target: { tabId },
            func,
            args,
        });

        return result as ScriptResult[];
    } catch (e) {
        // This can happen when trying to open the settings panel on a tab that doesn't support
        // script injection, such as a chrome:// tab
        return [];
    }
}

// Function to get a localStorage setting from a tab
export async function getLocalSettingOnTab<T>(tabId: number, key: string): Promise<T | false> {
    const results = await executeScript(tabId, (key: string) => localStorage.getItem(key), [key]);

    if (results && results.length > 0 && typeof results[0].result === 'string') {
        try {
            return JSON.parse(results[0].result) as T;
        } catch (e) {
            return false;
        }
    }

    return false;
}

export function getLocalSetting<T>(key: string): T | false {
    const results = window.localStorage.getItem(key);

    if (results && typeof results === 'string') {
        try {
            return JSON.parse(results) as T;
        } catch (e) {
            return false;
        }
    }

    return false;
}

// Function to set a localStorage setting in a tab
async function setLocalSetting(tabId: number, setting: string, val: string): Promise<void> {
    await executeScript(
        tabId,
        (key: string, value: string) => {
            localStorage.setItem(key, value);
            window.location.reload();
        },
        [setting, val]
    );
}

// Function to toggle a localStorage setting
export async function toggleLocalSetting(key: string): Promise<void> {
    const tabId = await getActiveTabId();

    if (tabId) {
        const currentValue = await getLocalSettingOnTab<boolean>(tabId, key);
        await setLocalSetting(tabId, key, JSON.stringify(!currentValue));

        window.close();
    }
}

export async function getInitialSettings(tabId?: number): Promise<[boolean]> {
    if (tabId) {
        return Promise.all([getLocalSettingOnTab<boolean>(tabId, APPEAR_AS_MM)])
    }

    return [false];
}

export const chainConnected = (chain: Chain) => {
    return chain.connected === undefined || chain.connected;
}

export const updateCurrentChain = (tabId?: number) => {
    if (tabId) {
        chrome.tabs.sendMessage(tabId, {
            type: 'embedded:action',
            action: { type: 'getChainId' }
        })    
    }
}

const originDomainRegex = /^(?<protocol>.+:(?:\/\/)?)(?<origin>[^\#\/]*)/;

interface ParsedOrigin {
    protocol: string;
    origin: string;
}

export function parseOrigin(url: string = ''): ParsedOrigin {
    const m = url.match(originDomainRegex);

    if (!m || !m.groups) {
        console.warn(`could not parse origin: ${url}`);
        return { origin: url, protocol: '' };
    }

    const { origin, protocol } = m.groups as { [key: string]: string }; // Explicitly typing m.groups
    return { origin, protocol } as ParsedOrigin; // Ensure result matches ParsedOrigin
}

export const isInjectedUrl = (url: string = ''): boolean => url.startsWith('http') || url.startsWith('file');
