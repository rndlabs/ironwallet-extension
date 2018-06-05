/* globals chrome */

chrome.browserAction.onClicked.addListener(tab => {
  chrome.tabs.executeScript(tab.ib, {file: 'toggle.js'})
  chrome.tabs.reload(tab.ib)
})

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.method === 'setActive') {
    if (request.active) {
      chrome.browserAction.setBadgeBackgroundColor({color: '#47caab'})
      chrome.browserAction.setBadgeText({text: 'ON', tabId: sender.tab.id})
    } else {
      chrome.browserAction.setBadgeText({text: '', tabId: sender.tab.id})
    }
  }
  return true
})
