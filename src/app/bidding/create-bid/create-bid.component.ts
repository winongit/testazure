import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { mergeMap } from 'rxjs';
import { AuctionService } from 'src/app/auction/service/auction.service';
import { AuthService } from 'src/app/core/services/authservice/auth.service';
import { Auction } from 'src/app/shared/models/auction';
import { Bid } from 'src/app/shared/models/bid';
import { User } from 'src/app/user/models/user';
import { BidService } from '../service/bid.service';

@Component({
  selector: 'app-create-bid',
  templateUrl: './create-bid.component.html',
  styleUrls: ['./create-bid.component.scss'],
})
export class CreateBidComponent implements OnInit {
  bidForm!: FormGroup;

  auction!: Auction;

  displayedColumns: string[] = ['bid_amount', 'updated_at', 'can_delete'];
  dataSource!: MatTableDataSource<Bid>;

  logInUser: any;
  buttonDisable: boolean = true;

  max_bid_amount: number = 0;

  constructor(
    private router: Router,
    private ar: ActivatedRoute,
    private auctionService: AuctionService,
    private bidService: BidService,
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private authService: AuthService
  ) {
    this.ar.paramMap
      .pipe(
        mergeMap((parms: any) =>
          this.auctionService.getAuction(parms.get('auction_id'))
        )
      )
      .subscribe((response) => {
        console.log('i am auction response');
        console.log(response);
        this.auction = response;

        this.max_bid_amount = this.auction.max_bid_amount as number;
        console.log(this.max_bid_amount);
        if (this.max_bid_amount == 0) {
          this.max_bid_amount = this.auction.price;
        } else {
          this.max_bid_amount = this.max_bid_amount + 1;
        }

        console.log(this.max_bid_amount);

        this.bidForm = this.fb.group({
          bid_amount: [
            0,
            [Validators.required, Validators.min(this.max_bid_amount)],
          ],
        });

        console.log(this.authService.getLogInUser());
        this.logInUser = this.authService.getLogInUser();
        this.refreshBid();
        this.checkUserForBidding();
      });
  }

  ngOnInit(): void {}

  refreshAuction(auction_id: string) {}

  checkUserForBidding() {
    if (this.logInUser._id === this.auction.created_by?._id) {
      this.buttonDisable = true;
    }
  }

  bid() {
    let bid = { ...this.bidForm.value };

    let auctionId = this.auction._id as string;
    this.bidService.createBid(bid, auctionId).subscribe((response) => {
      this.auction = response;

      this.refreshBid();
      this._snackBar.open('Bid submitted successfully', '', {
        duration: 5000,
      });
    });
  }

  refreshBid() {
    let bids = this.auction.bids;
    console.log('i am on bids');
    console.log(bids);
    bids?.sort((a, b) => {
      let a_modify_at = a.modified_at as Number;
      let b_modify_at = b.modified_at as Number;

      if (a_modify_at > b_modify_at) return -1;
      if (a_modify_at < b_modify_at) return 1;
      return 0;
    });

    if (bids && bids?.length > 0) {
      bids[0].can_delete = true;
    }

    this.dataSource = new MatTableDataSource<Bid>(bids);
  }

  deleteBid(bid: Bid) {
    console.log('delete bid');
    if (confirm('Are you sure you want to delete this bid?')) {
      let bid_id = bid._id as string;
      let auction_id = this.auction._id as string;
      this.bidService.deleteBid(bid_id, auction_id).subscribe((response) => {
        this.auction.bids = this.auction.bids?.filter((b) => b._id !== bid_id);
        this.refreshBid();
      });
    }
  }
}
