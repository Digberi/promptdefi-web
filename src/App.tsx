import './App.css'
import { ProvidersSandwich } from './providers/providers-sandwich'
import { ConnectButton } from './components/connect-button'

function App() {
  return (
    <ProvidersSandwich>
      <ConnectButton />
    </ProvidersSandwich>
  )
}

export default App
