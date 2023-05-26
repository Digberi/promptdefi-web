import './App.css';
import { ConnectButton } from './components/connect-button';
import { SendBatch } from './components/send-batch';
import { ProvidersSandwich } from './providers/providers-sandwich';

export function App() {
  return (
    <ProvidersSandwich>
      <ConnectButton />
      <SendBatch />
    </ProvidersSandwich>
  );
}
