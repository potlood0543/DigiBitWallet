import React from 'react';
import './Header.css';
import { TrendingUp } from 'lucide-react';

const Header = ({ portfolioValue }) => {
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(value);
  };

  return (
    <div className="header">
      <div className="header-content">
        <div className="logo">
          <TrendingUp size={32} />
          <h1>DigiBitWallet</h1>
        </div>
        <div className="portfolio-info">
          <div className="portfolio-label">Portfolio Value</div>
          <div className="portfolio-value">{formatCurrency(portfolioValue)}</div>
        </div>
      </div>
    </div>
  );
};

export default Header;
