import { Layout } from './components/base';
import { ProvidersSandwich } from './providers/providers-sandwich';
import { Router } from './router/router';

export function App() {
  return (
    <ProvidersSandwich>
      <Layout>
        <Router />
      </Layout>
    </ProvidersSandwich>
  );
}
