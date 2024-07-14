export interface CoinData {
  id: number;
  name: string;
  symbol: string;
  cmc_rank: number;
  price: number;
  percent_change_1h: number;
  percent_change_24h: number;
  percent_change_7d: number;
  volume_24h: number;
  market_cap: number;
  quantity: number;
  amount: number;
}

export interface FormCrypto {
  id: any;
  quantity: string;
}

export interface FormCryptoPayload {
  id: number;
  quantity: string;
  username: string | null;
}

export interface FormCryptoUpdatePayload {
  quantity: any;
  username: string | null;
}

export interface CoinList {
  id: number;
  name: string;
  symbol: string;
}

export interface ApiCoinResponse {
  data: CoinList[];
}

interface Quote {
  USD: {
    price: number;
    volume_24h: number;
    volume_change_24h: number;
    percent_change_1h: number;
    percent_change_24h: number;
    percent_change_7d: number;
    percent_change_30d: number;
    percent_change_60d: number;
    percent_change_90d: number;
    market_cap: number;
    market_cap_dominance: number;
    fully_diluted_market_cap: number;
    tvl: number | null;
    last_updated: string;
  };
}

export interface CoinType {
  amount: number | null;
  id: number;
  name: string;
  symbol: string;
  slug: string;
  cmc_rank: number;
  quote: Quote;
  logo: string;
  description: string;
  quantity: number | null;
}
