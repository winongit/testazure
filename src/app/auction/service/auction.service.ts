import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Auction } from 'src/app/shared/models/auction';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuctionService {
  constructor(private http: HttpClient) {}

  private apiUrl = environment.apiUrl;

  saveAuction(auction: Auction) {
    return this.http.post(`${this.apiUrl}/auctions`, auction);
  }

  upload(file: File): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();

    formData.append('picture', file);
    const req = new HttpRequest(
      'POST',
      `${this.apiUrl}/auctions/upload`,
      formData,
      {
        reportProgress: true,
        responseType: 'json',
      }
    );

    return this.http.request(req);
  }

  getAllAuctions() {
    return this.http.get<Array<Auction>>(`${this.apiUrl}/auctions`);
  }

  getAuction(id: string) {
    return this.http.get<Auction>(`${this.apiUrl}/auctions/${id}`);
  }

  cancelAuction(id: string) {
    return this.http.patch(`${this.apiUrl}/auctions/${id}/cancel`, {});
  }

  extendAuction(id: string, extnedObj: any) {
    return this.http.patch(`${this.apiUrl}/auctions/${id}/extend`, extnedObj);
  }
}
