import { Bid } from './bid';

export interface Auction {
  _id?: string;
  title: string;
  description: string;
  price: number;
  category: string;
  imgUrl?: string;
  end_time: number;
  created_at?: number;
  created_by: {
    _id: string;
    name: string;
    email: string;
    imgUrl: string;
  };
  modified_at?: number;
  modified_by?: {
    _id: string;
    name: string;
    email: string;
    imgUrl: string;
  };
  status?: string;
  bids?: Array<Bid>;
  winning?: boolean;
  max_bid_amount?: number;
}
