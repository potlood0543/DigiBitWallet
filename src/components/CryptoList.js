import React, { useState } from 'react';
import './CryptoList.css';
import { TrendingUp, TrendingDown } from 'lucide-react';

const CryptoList = ({ cryptos, loading }) => {
  const [sortBy, setSortBy] = useState('marketCap');

  const formatCurrency = (value) => {
    if (value < 0.01) {
      return `$${value.toFixed(8)}`;
    }
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(value);
  };

  const formatMarketCap = (value) => {
    if (value >= 1000000000000) {
      return `$${(value / 1000000000000).toFixed(2)}T`;
    }
    if (value >= 1000000000) {
      return `$${(value / 1000000000).toFixed(2)}B`;
    }
    return `$${(value / 1000000).toFixed(2)}M`;
  };

  const sortedCryptos = [...cryptos].sort((a, b) => {
    if (sortBy === 'price') return b.price - a.price;
    if (sortBy === 'change24h') return b.change24h - a.change24h;
    return b.marketCap - a.marketCap;
  });

  if (loading) {
    return <div className="loading">Loading crypto prices...</div>;
  }

  return (
    <div className="crypto-list-container">
      <div className="list-header">
        <h2>Top 25 Cryptocurrencies</h2>
        <div className="sort-options">
          <button 
            className={sortBy === 'marketCap' ? 'active' : ''}
            onClick={() => setSortBy('marketCap')}
          >
            Market Cap
          </button>
          <button 
            className={sortBy === 'price' ? 'active' : ''}
            onClick={() => setSortBy('price')}
          >
            Price
          </button>
          <button 
            className={sortBy === 'change24h' ? 'active' : ''}
            onClick={() => setSortBy('change24h')}
          >
            24h Change
          </button>
        </div>
      </div>

      <div className="crypto-grid">
        {sortedCryptos.map((crypto, index) => (
          <div key={crypto.id} className="crypto-card">
            <div className="crypto-header">
              <div className="rank-and-name">
                <span className="rank">#{index + 1}</span>
                <div>
                  <div className="crypto-symbol">{crypto.symbol}</div>
                  <div className="crypto-name">{crypto.name}</div>
                </div>
              </div>
              <div className={`change-badge ${crypto.change24h >= 0 ? 'positive' : 'negative'}`}>
                {crypto.change24h >= 0 ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
                {Math.abs(crypto.change24h).toFixed(2)}%
              </div>
            </div>

            <div className="crypto-details">
              <div className="detail-row">
                <span className="label">Price</span>
                <span className="value">{formatCurrency(crypto.price)}</span>
              </div>
              <div className="detail-row">
                <span className="label">Market Cap</span>
                <span className="value">{formatMarketCap(crypto.marketCap)}</span>
              </div>
              <div className="detail-row">
                <span className="label">Network</span>
                <span className="value network">{crypto.network}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CryptoList;
