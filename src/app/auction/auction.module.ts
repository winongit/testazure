import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateAuctionComponent } from './create-auction/create-auction.component';
import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from '../shared/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { AuctionService } from './service/auction.service';
import { ListAuctionComponent } from '../bidding/list-auction/list-auction.component';
import { AuthGuard } from '../core/guards/authguard/auth.guard';
import { MyAuctionComponent } from './my-auction/my-auction.component';
import { ExtendAuctionComponent } from './extend-auction/extend-auction.component';
import { ExtendBidsComponent } from './extend-bids/extend-bids.component';
// /auction/

const routes: Routes = [
  { path: '', component: MyAuctionComponent, canActivate: [AuthGuard] },
  {
    path: 'create',
    component: CreateAuctionComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  declarations: [
    CreateAuctionComponent,
    MyAuctionComponent,
    ExtendAuctionComponent,
    ExtendBidsComponent,
  ],
  imports: [CommonModule, SharedModule, RouterModule.forChild(routes)],
  providers: [AuctionService],
})
export class AuctionModule {}
