export interface responseTransaction {
  address: string;
  name: string;
  symbol: string;
  decimals: string;
  balance: string;
}

export interface addressType {
  address: string;
}

export interface tokenType {
  address: string;
  symbol: string;
  name: string;
  decimals: string;
}

export interface returnObjectType {
  status: boolean;
  message: string;
  resault: object | null;
}
