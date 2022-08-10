import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuctionService } from 'src/app/auction/service/auction.service';
import { AuthService } from 'src/app/core/services/authservice/auth.service';
import { Auction } from 'src/app/shared/models/auction';
import { BidService } from '../service/bid.service';

@Component({
  selector: 'app-my-bids',
  templateUrl: './my-bids.component.html',
  styleUrls: ['./my-bids.component.scss'],
})
export class MyBidsComponent implements OnInit {
  constructor(
    private router: Router,
    private bidService: BidService,
    private _snackBar: MatSnackBar
  ) {}

  auctions: Array<Auction> = [];
  ngOnInit(): void {
    this.loadMyAuctions();
  }

  loadMyAuctions() {
    this.bidService.getMyBids().subscribe((response) => {
      this.auctions = response;

      this.auctions.map((a) => {
        if (a.bids?.find((b) => b.winner === true)) {
          a.winning = true;
        }
      });
    });
  }
}
