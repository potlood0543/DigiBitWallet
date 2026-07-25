import React, { useState } from 'react';
import './WalletAddresses.css';
import { Copy, ExternalLink, QrCode } from 'lucide-react';

const WalletAddresses = ({ username }) => {
  const [copiedAddress, setCopiedAddress] = useState(null);

  // Fixed wallet addresses for all users
  const walletAddresses = {
    bitcoin: {
      name: 'Bitcoin',
      symbol: 'BTC',
      address: 'bc1q4mphe3yxq9ltp4lckdj9e7c05048tl4yf3lqu6',
      color: '#F7931A',
      description: 'Use this to receive assets on Bitcoin',
      warning: 'Only send Bitcoin (BTC) assets to this address. Other assets will be lost forever.'
    },
    solana: {
      name: 'Solana',
      symbol: 'SOL',
      address: 'BpDcoshC29bCpXZd4GqAtiXW1ocBJWRSCQgaCyAePicm',
      color: '#00D4AA',
      description: 'Use this to receive assets on Solana',
      warning: 'Only send Solana (SOL) assets to this address. Other assets will be lost forever.'
    },
    ethereum: {
      name: 'Ethereum',
      symbol: 'ETH',
      address: '0x5eBb7d5c517Bed16193a3621e6fB63528B7BC5C1',
      color: '#627EEA',
      description: 'Use this to receive assets on Ethereum',
      warning: 'Only send Ethereum (ETH) assets to this address. Other assets will be lost forever.'
    },
    polygon: {
      name: 'Polygon',
      symbol: 'POL',
      address: '0x5329c35b960360988aeae784c67c3a9e2f690d6c',
      color: '#8247E5',
      description: 'Use this to receive assets on Polygon',
      warning: 'Only send Polygon (POL) assets to this address. Other assets will be lost forever.'
    },
    arbitrum: {
      name: 'Arbitrum (Arc)',
      symbol: 'ARB',
      address: '0x5329c35b960360988aeae784c67c3a9e2f690d6c',
      color: '#28A0F0',
      description: 'Use this to receive assets on Arbitrum',
      warning: 'Only send Arbitrum (ARB) assets to this address. Other assets will be lost forever.'
    },
    tron: {
      name: 'Tron',
      symbol: 'TRX',
      address: 'TAsuBCGfZb8sKfw1s58JcAHupPiXGPF2L',
      color: '#EB0029',
      description: 'Use this to receive assets on Tron',
      warning: 'Only send TRON (TRX) assets to this address. Other assets will be lost forever.'
    },
    bnb: {
      name: 'BNB Smart Chain',
      symbol: 'BNB',
      address: '0x5eBb7d5c517Bed16193a3621e6fB63528B7BC5C1',
      color: '#F3BA2F',
      description: 'Use this to receive assets on BNB Chain',
      warning: 'Only send BNB Smart Chain (BNB) assets to this address. Other assets will be lost forever.'
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
            <div className="warning-banner" style={{ backgroundColor: wallet.color + '20', borderLeftColor: wallet.color }}>
              <span>⚠️ {wallet.warning}</span>
            </div>

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
        <p>⚠️ <strong>CRITICAL:</strong> Each network has its own unique address. Sending coins to the wrong network address will result in permanent loss of funds. Always double-check the network before sending.</p>
      </div>
    </div>
  );
};

export default WalletAddresses;
