import React, { useState } from 'react';
import './Wallet.css';
import { Send, ArrowDownLeft, TrendingUp } from 'lucide-react';

const Wallet = ({ wallet, cryptos }) => {
  const [selectedHolding, setSelectedHolding] = useState(null);

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

  const getTotalBalance = () => {
    let total = wallet.balance;
    Object.entries(wallet.holdings).forEach(([symbol, holding]) => {
      const crypto = cryptos.find(c => c.symbol === symbol);
      if (crypto) {
        total += holding.amount * crypto.price;
      }
    });
    return total;
  };

  const getHoldingValue = (symbol, amount) => {
    const crypto = cryptos.find(c => c.symbol === symbol);
    if (crypto) {
      return amount * crypto.price;
    }
    return 0;
  };

  const holdings = Object.entries(wallet.holdings)
    .filter(([_, holding]) => holding.amount > 0)
    .map(([symbol, holding]) => ({
      symbol,
      amount: holding.amount,
      value: getHoldingValue(symbol, holding.amount),
      crypto: cryptos.find(c => c.symbol === symbol)
    }))
    .sort((a, b) => b.value - a.value);

  const portfolioValue = getTotalBalance();
  const cryptoValue = holdings.reduce((sum, h) => sum + h.value, 0);
  const cashPercentage = (wallet.balance / portfolioValue * 100).toFixed(1);
  const cryptoPercentage = (cryptoValue / portfolioValue * 100).toFixed(1);

  return (
    <div className="wallet-container">
      <div className="wallet-overview">
        <div className="balance-card">
          <div className="balance-label">Cash Balance</div>
          <div className="balance-amount">{formatCurrency(wallet.balance)}</div>
          <div className="balance-percentage">{cashPercentage}% of portfolio</div>
        </div>
        <div className="balance-card crypto">
          <div className="balance-label">Crypto Holdings</div>
          <div className="balance-amount">{formatCurrency(cryptoValue)}</div>
          <div className="balance-percentage">{cryptoPercentage}% of portfolio</div>
        </div>
      </div>

      <div className="holdings-section">
        <div className="section-header">
          <h2>Your Holdings</h2>
          <p className="holdings-count">You own {holdings.length} different cryptocurrencies</p>
        </div>

        {holdings.length === 0 ? (
          <div className="no-holdings">
            <TrendingUp size={48} />
            <p>You don't have any crypto holdings yet</p>
            <p className="hint">Visit the Market tab to see available cryptocurrencies</p>
          </div>
        ) : (
          <div className="holdings-grid">
            {holdings.map((holding) => (
              <div 
                key={holding.symbol} 
                className="holding-card"
                onClick={() => setSelectedHolding(selectedHolding === holding.symbol ? null : holding.symbol)}
              >
                <div className="holding-header">
                  <div className="holding-info">
                    <div className="holding-symbol">{holding.symbol}</div>
                    <div className="holding-name">{holding.crypto?.name}</div>
                  </div>
                  <div className="holding-icons">
                    <Send size={18} />
                  </div>
                </div>

                <div className="holding-amounts">
                  <div className="amount-row">
                    <span className="label">Amount</span>
                    <span className="amount">{holding.amount} {holding.symbol}</span>
                  </div>
                  <div className="amount-row">
                    <span className="label">Current Price</span>
                    <span className="price">{formatCurrency(holding.crypto?.price || 0)}</span>
                  </div>
                </div>

                <div className="holding-value">
                  <span className="label">Total Value</span>
                  <span className="value">{formatCurrency(holding.value)}</span>
                </div>

                {holding.crypto && (
                  <div className="holding-network">
                    <ArrowDownLeft size={14} />
                    <span>Network: {holding.crypto.network}</span>
                  </div>
                )}

                {selectedHolding === holding.symbol && (
                  <div className="holding-actions">
                    <button className="action-btn send-btn">Send</button>
                    <button className="action-btn trade-btn">Trade</button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Wallet;
