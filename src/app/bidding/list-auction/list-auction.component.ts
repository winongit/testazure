import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/authservice/auth.service';
import { Auction } from 'src/app/shared/models/auction';
import { AuctionService } from '../../auction/service/auction.service';

@Component({
  selector: 'app-list-auction',
  templateUrl: './list-auction.component.html',
  styleUrls: ['./list-auction.component.scss']
})
export class ListAuctionComponent implements OnInit {

  logInUser: any;
  constructor(private auctionService: AuctionService,
    private router: Router,
    private authService: AuthService) { }

  auctions: Array<Auction> = [];

  ngOnInit(): void {
    this.loadAllAuctions();
  }

  loadAllAuctions() {
    this.auctionService.getAllAuctions().subscribe(response => {
      this.auctions = response;
      this.logInUser = this.authService.getLogInUser();
    });
  }

  bid(auction: Auction) {
    // Route to bid page
    let auctionId = auction._id as string;

    // this.router.navigate(['/bidding']);
    this.router.navigate(['/','bidding', auctionId]);
    // this.router.navigate(['/', 'todos', 'edit', todo._id]);
    

  }

}
