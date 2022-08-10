import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateBidComponent } from './create-bid/create-bid.component';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../core/guards/authguard/auth.guard';
import { AuctionService } from '../auction/service/auction.service';
import { SharedModule } from '../shared/shared.module';
import { BidService } from './service/bid.service';
import { ListAuctionComponent } from './list-auction/list-auction.component';
import { MyBidsComponent } from './my-bids/my-bids.component';

const routes: Routes = [
  { path: '', component: ListAuctionComponent, canActivate: [AuthGuard] },
  {
    path: ':auction_id',
    component: CreateBidComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'my-bids/current',
    component: MyBidsComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  declarations: [CreateBidComponent, ListAuctionComponent, MyBidsComponent],
  imports: [CommonModule, SharedModule, RouterModule.forChild(routes)],
  providers: [AuctionService, BidService],
})
export class BiddingModule {}
