import './App.css'
import { ProvidersSandwich } from './providers/providers-sandwich'
import { ConnectButton } from './components/connect-button'
import { EthBalance } from './components/eth-balance'
import { SendBatch } from './components/send-batch'

function App() {
  return (
    <ProvidersSandwich>
      <ConnectButton />
      <EthBalance />
      <SendBatch />
    </ProvidersSandwich>
  )
}

export default App
