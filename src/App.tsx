import './App.css'
import { ProvidersSandwich } from './providers/providers-sandwich'
import { ConnectButton } from './components/connect-button'
import { EthBalance } from './components/eth-balance'

function App() {
  return (
    <ProvidersSandwich>
      <ConnectButton />
      <EthBalance />
    </ProvidersSandwich>
  )
}

export default App
