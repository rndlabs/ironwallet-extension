/* globals chrome */

import React from 'react'
import Restore from 'react-restore'
import ReactDOM from 'react-dom'
import styled from 'styled-components'

import { Cluster, ClusterValue, ClusterRow, ClusterBoxMain } from './Cluster'

const APPEAR_AS_MM = '__frameAppearAsMM__'

const initialState = {
  frameConnected: false,
  appearAsMM: false,
}

const actions = {
  setChains: (u, chains) => {
    u('availableChains', () => chains)
  },
  setCurrentChain: (u, chain) => {
    u('currentChain', () => chain)
  },
  setFrameConnected: (u, connected) => {
    u('frameConnected', () => connected)
  }
}

const store = Restore.create(initialState, actions)

const getScrollBarWidth = () => {
  if (typeof document === 'undefined') return 0
  const inner = document.createElement('p')
  inner.style.width = '100%'
  inner.style.height = '200px'
  const outer = document.createElement('div')
  outer.style.position = 'absolute'
  outer.style.top = '0px'
  outer.style.left = '0px'
  outer.style.visibility = 'hidden'
  outer.style.width = '200px'
  outer.style.height = '150px'
  outer.style.overflow = 'hidden'
  outer.appendChild(inner)
  document.body.appendChild(outer)
  var w1 = inner.offsetWidth
  outer.style.overflow = 'scroll'
  var w2 = inner.offsetWidth
  if (w1 == w2) w2 = outer.clientWidth
  document.body.removeChild(outer)
  return w1 - w2
}

async function getActiveTab() {
  const tabs = await chrome.tabs.query({ active: true, currentWindow: true })
  return tabs[0]
}

async function executeScript(tabId, func, args) {
  try {
    const result = await chrome.scripting.executeScript({
      target: { tabId },
      func,
      args
    })

    return result
  } catch (e) {
    // this can happen when trying to open the settings panel while on a tab that doesn't support
    // script injection, such as a chrome:// tab
    return []
  }
}

async function getLocalSetting(tabId, key) {
  const results = await executeScript(tabId, (key) => localStorage.getItem(key), [key])

  if (results && results.length > 0) {
    try {
      return JSON.parse(results[0].result || false)
    } catch (e) {
      return false
    }
  }

  return false
}

async function setLocalSetting(tabId, setting, val) {
  return executeScript(
    tabId,
    (key, val) => {
      localStorage.setItem(key, val)
      window.location.reload()
    },
    [setting, val]
  )
}

async function toggleLocalSetting(key) {
  const activeTab = await getActiveTab()

  if (activeTab) {
    const currentValue = await getLocalSetting(activeTab.id, key)
    setLocalSetting(activeTab.id, key, !currentValue)

    window.close()
  }
}

const SettingsScroll = styled.div`
  overflow-x: hidden;
  overflow-y: scroll;
  box-sizing: border-box;
  max-height: 580px;
  margin-right: -${(props) => props.scrollBar || 0}px;
  background: var(--ghostY);
  margin: 10px;
  border-radius: 30px;
`

const FrameConnected = styled.div`
  font-size: 14px;
  text-transform: uppercase;
  font-weight: 600;
  letter-spacing: 1px;
  padding-left: 1px;
`

const LogoWrap = styled.div`
  width: 80px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;

  img {
    height: 20px;
  }
`

const SummonFrameButton = styled.div`
  width: 80px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;

  svg {
    height: 20px;
    transform: scaleX(-1);
  }
`

const FrameButton = styled.div`
  width: 140px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  font-size: 16px;
  font-weight: 400;
`

const AppearDescription = styled.div`
  font-weight: 600;
  text-transform: uppercase;
  font-size: 14px;
  padding-left: 1px;
  letter-spacing: 1px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-left: 1px;
  letter-spacing: 1px;
  height: 50px;

  svg {
    height: 16px;
    margin-right: 8px;
  }
`

const AppearToggle = styled.div`
  position: relative;
  height: 32px;
  font-weight: 600;
  display: flex;
  justify-content: center;
  align-items: center;
  text-transform: uppercase;
  cursor: pointer;
  font-size: 12px;
  overflow: hidden;
  padding-left: 1px;
  letter-spacing: 1px;
`

const NotConnected = styled.div`
  padding: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
`

const CannotConnectSub = styled.div`
  padding: 0px 32px 0px 32px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  flex-direction: column;
`

const UnsupportedTab = styled.div`
  padding: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
`

const UnsupportedOrigin = styled.div`
  color: var(--moon);
  padding-top: 4px;
  padding-bottom: 4px;
  font-size: 18px;
`

const Download = styled.a`
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
  padding-right: 1px;

  * {
    pointer-events: none;
  }

  &:visited {
    color: var(--good);
  }
`

const CurrentOriginTitle = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 15px;
  height: 44px;
  padding-top: 8px;
  margin-top: 0px;
  font-weight: 400;
  svg {
    position: relative;
    top: 1px;
    margin-right: 10px;
    height: 15px;
  }
`

const ChainButtonIcon = styled.div`
  position: absolute;
  top: 12px;
  left: 10px;
  width: 20px;
  height: 20px;
  background: ${(props) => (props.selected ? 'var(--good)' : 'var(--ghostAZ)')};
  border-radius: 10px;
  box-sizing: border-box;
  border: solid 3px var(--ghostZ);
`

const ChainButtonLabel = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
  font-size: 14px;
  padding-left: 4px;
  font-weight: 500;
  height: 44px;
`

const Overlay = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: linear-gradient(-35deg, var(--overlayA) 0%, var(--overlayB) 100%);
  z-index: 9999999999999;
  pointer-events: none;
`

const originDomainRegex = /^(?<protocol>.+:(?:\/\/)?)(?<origin>[^\#\/]*)/

function parseOrigin(url = '') {
  const m = url.match(originDomainRegex)

  if (!m) {
    console.warn(`could not parse origin: ${url}`)
    return url
  }

  return m.groups || { origin: url, protocol: '' }
}

const chainConnected = ({ connected }) => connected === undefined || connected

const isInjectedUrl = (url = '') => url.startsWith('http') || url.startsWith('file')

const ChainButton = ({ index, chain, tab, selected }) => {
  const { chainId, name } = chain
  const isSelectable = chainConnected(chain)
  return (
    <ClusterValue
      style={{
        flexGrow: 0,
        width: 'calc(50% - 3px)',
        borderBottomRightRadius: index === 0 ? '8px' : 'auto',
        opacity: isSelectable ? 1 : 0.4,
        cursor: isSelectable ? 'pointer' : 'default'
      }}
      onClick={() => {
        if (isSelectable) {
          chrome.runtime.sendMessage({
            tab,
            method: 'wallet_switchEthereumChain',
            params: [{ chainId }]
          })
          updateCurrentChain(tab)
        }
      }}
    >
      <ChainButtonIcon selected={selected} />
      <ChainButtonLabel>{name}</ChainButtonLabel>
    </ClusterValue>
  )
}

// const isFirefox = Boolean(window?.browser && browser?.runtime)

class _Settings extends React.Component {
  notConnected() {
    return (
      <Cluster>
        <ClusterRow>
          <ClusterValue>
            <div style={{ paddingBottom: '32px' }}>
              <NotConnected>Unable to connect to Frame</NotConnected>
              <CannotConnectSub>Make sure the Frame desktop app is running</CannotConnectSub>
              <CannotConnectSub>on your machine or download it below</CannotConnectSub>
            </div>
          </ClusterValue>
        </ClusterRow>
        <ClusterRow>
          <ClusterValue pointerEvents={true}>
            <Download href='https://frame.sh' target='_newtab'>
              Download Frame
            </Download>
          </ClusterValue>
        </ClusterRow>
      </Cluster>
    )
  }

  unsupportedTab(origin) {
    return (
      <Cluster>
        <ClusterRow>
          <ClusterValue>
            <div style={{ paddingBottom: '32px' }}>
              <UnsupportedTab>Unsupported tab</UnsupportedTab>
              <CannotConnectSub>
                <div>Frame does not have access to</div>
                <UnsupportedOrigin>{origin}</UnsupportedOrigin>
                <div>tabs in this browser</div>
              </CannotConnectSub>
            </div>
          </ClusterValue>
        </ClusterRow>
      </Cluster>
    )
  }

  frameConnected() {
    const isConnected = this.store('frameConnected')

    return (
      <Cluster>
        <ClusterRow>
          <ClusterValue
            onClick={() => {
              if (isConnected) chrome.runtime.sendMessage({ method: 'frame_summon', params: [] })
            }}
            style={{
              flexGrow: 1,
              color: isConnected ? 'var(--good)' : 'var(--moon)',
              justifyContent: 'space-between',
              height: '64px'
            }}
          >
            <LogoWrap>
              <img src={isConnected ? '../icons/icon96good.png' : '../icons/icon96moon.png'} />
            </LogoWrap>
            {isConnected ? (
              <FrameConnected style={{ color: 'var(--good)' }}>{'Frame Connected'}</FrameConnected>
            ) : (
              <FrameConnected style={{ color: 'var(--moon)' }}>{'Frame Disconnected'}</FrameConnected>
            )}
            <SummonFrameButton>
              <svg viewBox='0 0 512 512'>
                <path
                  fill='currentColor'
                  d='M416 32h-64c-17.67 0-32 14.33-32 32s14.33 32 32 32h64c17.67 0 32 14.33 32 32v256c0 17.67-14.33 32-32 32h-64c-17.67 0-32 14.33-32 32s14.33 32 32 32h64c53.02 0 96-42.98 96-96V128C512 74.98 469 32 416 32zM342.6 233.4l-128-128c-12.51-12.51-32.76-12.49-45.25 0c-12.5 12.5-12.5 32.75 0 45.25L242.8 224H32C14.31 224 0 238.3 0 256s14.31 32 32 32h210.8l-73.38 73.38c-12.5 12.5-12.5 32.75 0 45.25s32.75 12.5 45.25 0l128-128C355.1 266.1 355.1 245.9 342.6 233.4z'
                />
              </svg>
            </SummonFrameButton>
          </ClusterValue>
        </ClusterRow>
      </Cluster>
    )
  }

  appearAsMMToggle() {
    return this.props.mmAppear ? (
      <>
        <ClusterRow>
          <ClusterValue>
            <AppearDescription>
              <svg viewBox='0 0 576 512'>
                <path
                  fill='var(--mm)'
                  d='M288 64C39.52 64 0 182.1 0 273.5C0 379.5 78.8 448 176 448c27.33 0 51.21-6.516 66.11-36.79l19.93-40.5C268.3 358.6 278.1 352.4 288 352.1c9.9 .3711 19.7 6.501 25.97 18.63l19.93 40.5C348.8 441.5 372.7 448 400 448c97.2 0 176-68.51 176-174.5C576 182.1 536.5 64 288 64zM160 320c-35.35 0-64-28.65-64-64s28.65-64 64-64c35.35 0 64 28.65 64 64S195.3 320 160 320zM416 320c-35.35 0-64-28.65-64-64s28.65-64 64-64c35.35 0 64 28.65 64 64S451.3 320 416 320z'
                />
              </svg>
              <span>
                Injecting as <span className='mm'>Metamask</span>
              </span>
            </AppearDescription>
          </ClusterValue>
        </ClusterRow>
        <ClusterRow>
          <ClusterValue onClick={() => toggleLocalSetting(APPEAR_AS_MM)}>
            <AppearToggle>
              <span>
                Appear As <span className='frame'>Frame</span> Instead
              </span>
            </AppearToggle>
          </ClusterValue>
        </ClusterRow>
      </>
    ) : (
      <>
        <ClusterRow>
          <ClusterValue>
            <AppearDescription>
              <svg viewBox='0 0 448 512'>
                <path
                  fill='var(--good)'
                  d='M176 448C167.3 448 160 455.3 160 464V512h32v-48C192 455.3 184.8 448 176 448zM272 448c-8.75 0-16 7.25-16 16s7.25 16 16 16s16-7.25 16-16S280.8 448 272 448zM164 172l8.205 24.62c1.215 3.645 6.375 3.645 7.59 0L188 172l24.62-8.203c3.646-1.219 3.646-6.375 0-7.594L188 148L179.8 123.4c-1.215-3.648-6.375-3.648-7.59 0L164 148L139.4 156.2c-3.646 1.219-3.646 6.375 0 7.594L164 172zM336.1 315.4C304 338.6 265.1 352 224 352s-80.03-13.43-112.1-36.59C46.55 340.2 0 403.3 0 477.3C0 496.5 15.52 512 34.66 512H128v-64c0-17.75 14.25-32 32-32h128c17.75 0 32 14.25 32 32v64h93.34C432.5 512 448 496.5 448 477.3C448 403.3 401.5 340.2 336.1 315.4zM64 224h13.5C102.3 280.5 158.4 320 224 320s121.8-39.5 146.5-96H384c8.75 0 16-7.25 16-16v-96C400 103.3 392.8 96 384 96h-13.5C345.8 39.5 289.6 0 224 0S102.3 39.5 77.5 96H64C55.25 96 48 103.3 48 112v96C48 216.8 55.25 224 64 224zM104 136C104 113.9 125.5 96 152 96h144c26.5 0 48 17.88 48 40V160c0 53-43 96-96 96h-48c-53 0-96-43-96-96V136z'
                />
              </svg>
              <span>
                Injecting as <span className='frame'>Frame</span>
              </span>
            </AppearDescription>
          </ClusterValue>
        </ClusterRow>
        <ClusterRow>
          <ClusterValue onClick={() => toggleLocalSetting(APPEAR_AS_MM)}>
            <AppearToggle>
              <span>
                Appear As <span className='mm'>Metamask</span> Instead
              </span>
            </AppearToggle>
          </ClusterValue>
        </ClusterRow>
      </>
    )
  }

  chainSelect() {
    const chains = this.store('availableChains') || []
    const currentChain = this.store('currentChain')

    const rows = chains.reduce((result, value, index, array) => {
      if (index % 2 === 0) result.push(array.slice(index, index + 2))
      return result
    }, [])

    return rows.map((row) => (
      <ClusterRow style={{ justifyContent: 'flex-start' }}>
        {row.map((chain, i) => (
          <ChainButton
            index={i}
            chain={chain}
            tab={this.props.tab}
            selected={chain.chainId === parseInt(currentChain, 16)}
          />
        ))}
      </ClusterRow>
    ))
  }

  currentChain() {
    try {
      const availableChains = this.store('availableChains')
      const currentChain = this.store('currentChain')
      const currentChainDetails = availableChains.find(({ chainId }) => chainId === currentChain)
      if (currentChainDetails && currentChainDetails.name) {
        return currentChainDetails.name
      } else {
        const chainInt = parseInt(currentChain)
        if (isNaN(chainInt)) {
          return '?'
        } else {
          return chainInt
        }
      }
    } catch (e) {
      return '?'
    }
  }

  renderMainPanel() {
    const isConnected = this.store('frameConnected')
    const {
      tab: { url },
      isSupportedTab
    } = this.props
    const { protocol, origin } = parseOrigin(url)

    if (!isConnected) {
      return <ClusterBoxMain style={{ marginTop: '12px' }}>{this.notConnected()}</ClusterBoxMain>
    }

    if (!isSupportedTab) {
      return (
        <ClusterBoxMain style={{ marginTop: '12px' }}>
          {this.unsupportedTab(protocol + origin)}
        </ClusterBoxMain>
      )
    }

    return (
      <>
        <ClusterBoxMain style={{ marginTop: '12px' }}>
          <CurrentOriginTitle>
            <svg viewBox='0 0 512 512'>
              <path
                fill='currentColor'
                d='M448 32C483.3 32 512 60.65 512 96V416C512 451.3 483.3 480 448 480H64C28.65 480 0 451.3 0 416V96C0 60.65 28.65 32 64 32H448zM96 96C78.33 96 64 110.3 64 128C64 145.7 78.33 160 96 160H416C433.7 160 448 145.7 448 128C448 110.3 433.7 96 416 96H96z'
              />
            </svg>
            {origin}
          </CurrentOriginTitle>
          <Cluster>
            {this.store('availableChains').length ? (
              <>
                {this.chainSelect()}
                <div style={{ height: '9px' }} />
              </>
            ) : null}
            {this.appearAsMMToggle()}
          </Cluster>
        </ClusterBoxMain>
      </>
    )
  }

  render() {
    return (
      <>
        <Overlay />
        <SettingsScroll scrollBar={getScrollBarWidth()}>
          <ClusterBoxMain>{this.frameConnected()}</ClusterBoxMain>
          {this.renderMainPanel()}
        </SettingsScroll>
      </>
    )
  }
}

const Settings = Restore.connect(_Settings, store)

const frameConnect = chrome.runtime.connect({ name: 'frame_connect' })

frameConnect.onMessage.addListener((state) => {
  store.setFrameConnected(state.connected)
  store.setChains(state.availableChains)
  store.setCurrentChain(state.currentChain)
})

const updateCurrentChain = (tab) => {
  chrome.tabs.sendMessage(tab.id, {
    type: 'embedded:action',
    action: { type: 'getChainId' }
  })
}

async function getInitialSettings(tabId) {
  return Promise.all([getLocalSetting(tabId, APPEAR_AS_MM)])
}

document.addEventListener('DOMContentLoaded', async function () {
  console.info('Settings panel loaded')

  const activeTab = await getActiveTab()
  const isInjectedTab = isInjectedUrl(activeTab?.url)

  const [mmAppear] = isInjectedTab ? await getInitialSettings(activeTab.id) : [false]

  if (isInjectedTab) {
    setInterval(() => {
      updateCurrentChain(activeTab)
    }, 1000)
  }

  console.debug('Initial settings', { activeTab, isInjectedTab, mmAppear })

  const root = document.getElementById('root')

  ReactDOM.render(
    <Settings tab={activeTab} isSupportedTab={isInjectedTab} mmAppear={mmAppear} />,
    root
  )
})
