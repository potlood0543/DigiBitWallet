import React, { useState } from 'react';
import './WalletAddresses.css';
import { Copy, ExternalLink, QrCode } from 'lucide-react';

const WalletAddresses = ({ username }) => {
  const [copiedAddress, setCopiedAddress] = useState(null);

  // Mock wallet addresses for different networks
  const walletAddresses = {
    polygon: {
      name: 'Polygon',
      symbol: 'POL',
      address: '0x5329c35b960360988aeae784c67c3a9e2f690d6c',
      color: '#8247E5',
      description: 'Use this to receive assets on Polygon'
    },
    arbitrum: {
      name: 'Arbitrum (Arc)',
      symbol: 'ARB',
      address: '0x5329c35b960360988aeae784c67c3a9e2f690d6c',
      color: '#28A0F0',
      description: 'Use this to receive assets on Arbitrum'
    },
    tron: {
      name: 'Tron',
      symbol: 'TRX',
      address: 'TAsuBCGfZb8sKfw1s58JcAHupPiXGPF2L',
      color: '#EB0029',
      description: 'Use this to receive assets on Tron'
    },
    bnb: {
      name: 'BNB Smart Chain',
      symbol: 'BNB',
      address: '0x5eBb7d5c517Bed16193a3621e6fB63528B7BC5C1',
      color: '#F3BA2F',
      description: 'Use this to receive assets on BNB Chain'
    }
  };

  const handleCopyAddress = (address, networkName) => {
    navigator.clipboard.writeText(address);
    setCopiedAddress(networkName);
    setTimeout(() => setCopiedAddress(null), 2000);
  };

  return (
    <div className="wallet-addresses-container">
      <div className="addresses-header">
        <h2>My Wallet Addresses</h2>
        <p>Account 1 / {username}</p>
      </div>

      <div className="addresses-grid">
        {Object.entries(walletAddresses).map(([key, wallet]) => (
          <div key={key} className="address-card">
            <div className="card-header" style={{ borderLeftColor: wallet.color }}>
              <div className="network-info">
                <h3>{wallet.name}</h3>
                <p className="network-description">{wallet.description}</p>
              </div>
              <div className="network-symbol" style={{ backgroundColor: wallet.color }}>
                {wallet.symbol}
              </div>
            </div>

            <div className="qr-section">
              <div className="qr-placeholder">
                <QrCode size={48} color={wallet.color} />
                <p>QR Code</p>
              </div>
            </div>

            <div className="address-display">
              <label>Network Address</label>
              <div className="address-box">
                <code>{wallet.address}</code>
                <button
                  className="copy-btn"
                  onClick={() => handleCopyAddress(wallet.address, key)}
                  title="Copy address"
                >
                  {copiedAddress === key ? '✓ Copied' : <Copy size={18} />}
                </button>
              </div>
            </div>

            <div className="address-actions">
              <button className="action-btn view-btn">
                <ExternalLink size={16} />
                View on Explorer
              </button>
              <button className="action-btn share-btn">
                Share Address
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="addresses-info">
        <p>⚠️ <strong>Important:</strong> Only send assets to the correct network address. Sending to the wrong network may result in permanent loss of funds.</p>
      </div>
    </div>
  );
};

export default WalletAddresses;
