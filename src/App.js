import React, { useState, useEffect } from 'react';
import './App.css';
import CryptoList from './components/CryptoList';
import Wallet from './components/Wallet';
import Header from './components/Header';
import { fetchCryptoPrices } from './services/cryptoService';

function App() {
  const [cryptos, setCryptos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('portfolio');
  const [wallet, setWallet] = useState({
    balance: 50000,
    holdings: {
      BTC: { amount: 0.5, value: 0 },
      ETH: { amount: 2.0, value: 0 },
      BNB: { amount: 10, value: 0 },
      SOL: { amount: 25, value: 0 },
      ADA: { amount: 500, value: 0 }
    }
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await fetchCryptoPrices();
        setCryptos(data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch crypto prices. Using mock data.');
        setCryptos(getMockCryptoData());
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 10000);
    return () => clearInterval(interval);
  }, []);

  const getMockCryptoData = () => {
    return [
      { id: 'bitcoin', symbol: 'BTC', name: 'Bitcoin', price: 42500, change24h: 2.5, network: 'Bitcoin', marketCap: 850000000000 },
      { id: 'ethereum', symbol: 'ETH', name: 'Ethereum', price: 2250, change24h: 1.8, network: 'Ethereum', marketCap: 270000000000 },
      { id: 'binancecoin', symbol: 'BNB', name: 'Binance Coin', price: 625, change24h: 1.2, network: 'BNB Chain', marketCap: 96000000000 },
      { id: 'solana', symbol: 'SOL', name: 'Solana', price: 145, change24h: 3.2, network: 'Solana', marketCap: 65000000000 },
      { id: 'cardano', symbol: 'ADA', name: 'Cardano', price: 0.98, change24h: -0.5, network: 'Cardano', marketCap: 35000000000 },
      { id: 'polkadot', symbol: 'DOT', name: 'Polkadot', price: 8.5, change24h: 1.1, network: 'Polkadot', marketCap: 12000000000 },
      { id: 'dogecoin', symbol: 'DOGE', name: 'Dogecoin', price: 0.12, change24h: 2.3, network: 'Dogecoin', marketCap: 18000000000 },
      { id: 'shiba-inu', symbol: 'SHIB', name: 'Shiba Inu', price: 0.000015, change24h: 1.5, network: 'Ethereum', marketCap: 9000000000 },
      { id: 'litecoin', symbol: 'LTC', name: 'Litecoin', price: 120, change24h: 0.8, network: 'Litecoin', marketCap: 16000000000 },
      { id: 'uniswap', symbol: 'UNI', name: 'Uniswap', price: 7.2, change24h: 2.1, network: 'Ethereum', marketCap: 6000000000 },
      { id: 'link', symbol: 'LINK', name: 'Chainlink', price: 18.5, change24h: 1.9, network: 'Ethereum', marketCap: 9000000000 },
      { id: 'ripple', symbol: 'XRP', name: 'XRP', price: 0.52, change24h: 1.3, network: 'XRP Ledger', marketCap: 30000000000 },
      { id: 'tron', symbol: 'TRX', name: 'TRON', price: 0.098, change24h: 0.9, network: 'TRON', marketCap: 10000000000 },
      { id: 'stellar', symbol: 'XLM', name: 'Stellar', price: 0.088, change24h: -0.2, network: 'Stellar', marketCap: 3000000000 },
      { id: 'cosmos', symbol: 'ATOM', name: 'Cosmos', price: 9.2, change24h: 1.7, network: 'Cosmos', marketCap: 3500000000 },
      { id: 'avalanche-2', symbol: 'AVAX', name: 'Avalanche', price: 38, change24h: 2.2, network: 'Avalanche', marketCap: 14000000000 },
      { id: 'polygon', symbol: 'MATIC', name: 'Polygon', price: 0.85, change24h: 1.4, network: 'Polygon', marketCap: 8000000000 },
      { id: 'optimism', symbol: 'OP', name: 'Optimism', price: 2.8, change24h: 1.6, network: 'Ethereum', marketCap: 1500000000 },
      { id: 'arbitrum', symbol: 'ARB', name: 'Arbitrum', price: 1.2, change24h: 2.4, network: 'Ethereum', marketCap: 1200000000 },
      { id: 'monero', symbol: 'XMR', name: 'Monero', price: 185, change24h: 0.6, network: 'Monero', marketCap: 3200000000 },
      { id: 'zcash', symbol: 'ZEC', name: 'Zcash', price: 32, change24h: -0.1, network: 'Zcash', marketCap: 320000000 },
      { id: 'near', symbol: 'NEAR', name: 'NEAR Protocol', price: 5.8, change24h: 1.8, network: 'NEAR', marketCap: 6000000000 },
      { id: 'sui', symbol: 'SUI', name: 'Sui', price: 1.15, change24h: 3.1, network: 'Sui', marketCap: 3600000000 },
      { id: 'aptos', symbol: 'APT', name: 'Aptos', price: 9.5, change24h: 2.9, network: 'Aptos', marketCap: 3000000000 }
    ];
  };

  const calculatePortfolioValue = () => {
    if (cryptos.length === 0) return wallet.balance;
    let total = wallet.balance;
    Object.entries(wallet.holdings).forEach(([symbol, holding]) => {
      const crypto = cryptos.find(c => c.symbol === symbol);
      if (crypto) {
        total += holding.amount * crypto.price;
      }
    });
    return total;
  };

  return (
    <div className="App">
      <Header portfolioValue={calculatePortfolioValue()} />
      
      <div className="tabs">
        <button 
          className={`tab-btn ${activeTab === 'portfolio' ? 'active' : ''}`}
          onClick={() => setActiveTab('portfolio')}
        >
          Portfolio
        </button>
        <button 
          className={`tab-btn ${activeTab === 'market' ? 'active' : ''}`}
          onClick={() => setActiveTab('market')}
        >
          Market
        </button>
      </div>

      <div className="container">
        {error && <div className="error-message">{error}</div>}
        
        {activeTab === 'portfolio' ? (
          <Wallet wallet={wallet} cryptos={cryptos} />
        ) : (
          <CryptoList cryptos={cryptos} loading={loading} />
        )}
      </div>
    </div>
  );
}

export default App;
