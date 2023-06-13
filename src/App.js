import { useMemo, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Header from "./components/Header";
import Home from "./pages/Home";
import Staking from "./pages/Staking";
import "./App.css";

import { clusterApiUrl } from "@solana/web3.js";

import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react/lib/index.js";

import {
  getPhantomWallet,
  getSlopeWallet,
  getSolflareWallet,
  getLedgerWallet,
  getSolletWallet,
  getSolletExtensionWallet,
} from "@solana/wallet-adapter-wallets";

import { NEXT_PUBLIC_SOLANA_NETWORK } from "./consts/env";

import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import { WalletBalanceProvider } from "./hooks/use-wallet-balance";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base/lib/adapter";

const network = NEXT_PUBLIC_SOLANA_NETWORK;
function App() {
  // const network = clusterApiUrl('devnet');
  const endPoint = useMemo(() => "https://solana-api.projectserum.com", []);

  const wallets = useMemo(
    () => [
      getPhantomWallet(),
      getSolletWallet({ network }),
      getSolflareWallet(),
      getSolletExtensionWallet({ network }),
      getLedgerWallet(),
      getSlopeWallet(),
    ],
    []
  );

  return (
    <>
      <ConnectionProvider endpoint={endPoint}>
        <WalletProvider wallets={wallets} autoConnect>
          <WalletModalProvider>
            <WalletBalanceProvider>
              <div className="App">
                <Router>
                  <Header />
                  <Switch>
                    <Route exact path="/">
                      <Home />
                    </Route>
                    <Route path="/staking">
                      <Staking />
                    </Route>
                  </Switch>
                </Router>
              </div>
            </WalletBalanceProvider>
          </WalletModalProvider>
        </WalletProvider>
      </ConnectionProvider>
    </>
  );
}

export default App;
