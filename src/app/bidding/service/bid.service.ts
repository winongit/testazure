import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Auction } from 'src/app/shared/models/auction';
import { Bid } from 'src/app/shared/models/bid';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BidService {
  constructor(private http: HttpClient) {}

  private apiURL = environment.apiUrl;

  createBid(bid: Bid, auction_id: string) {
    return this.http.post<Auction>(
      `${this.apiURL}/bid/auction/${auction_id}`,
      bid
    );
  }

  deleteBid(bid_id: string, auction_id: string) {
    return this.http.delete(
      `${this.apiURL}/bid/${bid_id}/auction/${auction_id}`
    );
  }

  getMyBids() {
    return this.http.get<Array<Auction>>(`${this.apiURL}/bid`);
  }
}
