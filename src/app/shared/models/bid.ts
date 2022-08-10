export interface Bid {
  _id?: string;
  bid_amount: number;
  status?: string;
  created_at?: number;
  created_by?: {
    _id: string;
    name: string;
    email: string;
  };
  modified_at?: number;
  modified_by?: {
    _id: string;
    name: string;
    email: string;
  };
  can_delete?: boolean;
  winner: boolean;
}
