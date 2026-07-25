// Crypto Service - Fetches real-time crypto prices from CoinGecko API

const COINGECKO_API = 'https://api.coingecko.com/api/v3';

const TOP_25_CRYPTOS = [
  'bitcoin',
  'ethereum',
  'binancecoin',
  'solana',
  'cardano',
  'polkadot',
  'dogecoin',
  'shiba-inu',
  'litecoin',
  'uniswap',
  'ripple',
  'link',
  'stellar',
  'tron',
  'cosmos',
  'avalanche-2',
  'polygon',
  'optimism',
  'arbitrum',
  'monero',
  'zcash',
  'near',
  'sui',
  'aptos',
  'vechain'
];

// Network mappings
const NETWORK_MAP = {
  'bitcoin': 'Bitcoin',
  'ethereum': 'Ethereum',
  'binancecoin': 'BNB Chain',
  'solana': 'Solana',
  'cardano': 'Cardano',
  'polkadot': 'Polkadot',
  'dogecoin': 'Dogecoin',
  'shiba-inu': 'Ethereum',
  'litecoin': 'Litecoin',
  'uniswap': 'Ethereum',
  'ripple': 'XRP Ledger',
  'link': 'Ethereum',
  'stellar': 'Stellar',
  'tron': 'TRON',
  'cosmos': 'Cosmos',
  'avalanche-2': 'Avalanche',
  'polygon': 'Polygon',
  'optimism': 'Ethereum',
  'arbitrum': 'Ethereum',
  'monero': 'Monero',
  'zcash': 'Zcash',
  'near': 'NEAR',
  'sui': 'Sui',
  'aptos': 'Aptos',
  'vechain': 'VeChain'
};

export const fetchCryptoPrices = async () => {
  try {
    const ids = TOP_25_CRYPTOS.join(',');
    const response = await fetch(
      `${COINGECKO_API}/simple/price?ids=${ids}&vs_currencies=usd&include_market_cap=true&include_24hr_vol=true&include_24hr_change=true&order=market_cap_desc&per_page=250&page=1`
    );

    if (!response.ok) {
      throw new Error('Failed to fetch crypto prices');
    }

    const data = await response.json();

    // Transform the data to our format
    const cryptos = TOP_25_CRYPTOS
      .filter(id => data[id])
      .map((id, index) => ({
        id,
        symbol: getSymbolFromId(id),
        name: getNameFromId(id),
        price: data[id].usd || 0,
        change24h: data[id].usd_24h_change || 0,
        marketCap: data[id].usd_market_cap || 0,
        network: NETWORK_MAP[id] || 'Unknown'
      }))
      .sort((a, b) => (b.marketCap || 0) - (a.marketCap || 0));

    return cryptos;
  } catch (error) {
    console.error('Error fetching crypto prices:', error);
    throw error;
  }
};

const getSymbolFromId = (id) => {
  const symbolMap = {
    'bitcoin': 'BTC',
    'ethereum': 'ETH',
    'binancecoin': 'BNB',
    'solana': 'SOL',
    'cardano': 'ADA',
    'polkadot': 'DOT',
    'dogecoin': 'DOGE',
    'shiba-inu': 'SHIB',
    'litecoin': 'LTC',
    'uniswap': 'UNI',
    'ripple': 'XRP',
    'link': 'LINK',
    'stellar': 'XLM',
    'tron': 'TRX',
    'cosmos': 'ATOM',
    'avalanche-2': 'AVAX',
    'polygon': 'MATIC',
    'optimism': 'OP',
    'arbitrum': 'ARB',
    'monero': 'XMR',
    'zcash': 'ZEC',
    'near': 'NEAR',
    'sui': 'SUI',
    'aptos': 'APT',
    'vechain': 'VET'
  };
  return symbolMap[id] || id.toUpperCase();
};

const getNameFromId = (id) => {
  const nameMap = {
    'bitcoin': 'Bitcoin',
    'ethereum': 'Ethereum',
    'binancecoin': 'Binance Coin',
    'solana': 'Solana',
    'cardano': 'Cardano',
    'polkadot': 'Polkadot',
    'dogecoin': 'Dogecoin',
    'shiba-inu': 'Shiba Inu',
    'litecoin': 'Litecoin',
    'uniswap': 'Uniswap',
    'ripple': 'XRP',
    'link': 'Chainlink',
    'stellar': 'Stellar',
    'tron': 'TRON',
    'cosmos': 'Cosmos',
    'avalanche-2': 'Avalanche',
    'polygon': 'Polygon',
    'optimism': 'Optimism',
    'arbitrum': 'Arbitrum',
    'monero': 'Monero',
    'zcash': 'Zcash',
    'near': 'NEAR Protocol',
    'sui': 'Sui',
    'aptos': 'Aptos',
    'vechain': 'VeChain'
  };
  return nameMap[id] || id;
};
