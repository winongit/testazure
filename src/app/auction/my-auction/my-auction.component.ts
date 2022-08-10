import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { catchError } from 'rxjs';
import { AuthService } from 'src/app/core/services/authservice/auth.service';
import { Auction } from 'src/app/shared/models/auction';
import { Bid } from 'src/app/shared/models/bid';
import { ExtendAuctionComponent } from '../extend-auction/extend-auction.component';
import { ExtendBidsComponent } from '../extend-bids/extend-bids.component';
import { AuctionService } from '../service/auction.service';

@Component({
  selector: 'app-my-auction',
  templateUrl: './my-auction.component.html',
  styleUrls: ['./my-auction.component.scss'],
})
export class MyAuctionComponent implements OnInit {
  constructor(
    private auctionService: AuctionService,
    private router: Router,
    private authService: AuthService,
    private _snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  auctions: Array<Auction> = [];
  logInUser: any;

  ngOnInit(): void {
    console.log('i am on my auction');
    this.logInUser = this.authService.getLogInUser();
    this.loadMyAuctions();
  }

  loadMyAuctions() {
    this.auctionService.getAllAuctions().subscribe((response) => {
      this.auctions = response;

      this.auctions = response.filter(
        (a) => a.created_by._id === this.logInUser._id
      );
    });
  }

  cancel(auction: Auction) {
    let auction_id = auction._id as string;

    if (confirm('Are you sure you want to cancle this auction?')) {
      // Confirmation page
      this.auctionService.cancelAuction(auction_id).subscribe(
        (response) => {
          console.log('auction cancelled');
          console.log(response);

          this._snackBar.open('Auction has been cancelled', '', {
            duration: 5000,
          });
          auction.status = 'C';
        },
        (error) => {
          console.log(error);
          this._snackBar.open(error.error.message, '', {
            duration: 5000,
          });
        }
      );
    }
  }

  extend(auction: Auction) {
    let dialogRef = this.dialog.open(ExtendAuctionComponent, {
      width: '450px',
      data: auction,
    });
  }

  extendBids(bids: Bid[] | undefined) {
    let dialogRef = this.dialog.open(ExtendBidsComponent, {
      width: '700px',
      data: bids,
    });
  }
}
