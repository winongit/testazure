import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Auction } from 'src/app/shared/models/auction';
import { AuctionService } from '../service/auction.service';

function dateValidator(): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} | null => {
    const today = new Date().getTime();

    if(!(control && control.value)) {
      // if there's no control or no value, that's ok
      return null;
    }

    let selectedDate: Date = new Date(control.value);
    console.log(typeof(selectedDate));

    // return null if there's no errors
    return selectedDate.getTime() < today 
      ? {invalidDate: 'You cannot use future dates' } 
      : null;
  }
}

@Component({
  selector: 'app-extend-auction',
  templateUrl: './extend-auction.component.html',
  styleUrls: ['./extend-auction.component.scss']
})
export class ExtendAuctionComponent implements OnInit {
  auctionExtendForm!: FormGroup;
  auction!: Auction;
  constructor(@Inject(MAT_DIALOG_DATA) public data: Auction,
    private dialogRef: MatDialogRef<ExtendAuctionComponent>,
    private auctionService: AuctionService,
    private fb: FormBuilder,
    private _snackBar: MatSnackBar) { 
    this.auction = data;
    
    this.auctionExtendForm = this.fb.group({
      new_end_time: ['', [Validators.required, dateValidator()]]
    })
  }

  ngOnInit(): void {
  }

  extend(auction: Auction) {
    let new_end_time = this.auctionExtendForm.get('new_end_time')?.value;
    let obj = {new_end_time};

    let auction_id = this.auction._id as string;

    this.auctionService.extendAuction(auction_id, obj).subscribe(response => {
      console.log('Auction extended');
      this.auction.end_time = new_end_time;
      this._snackBar.open('Auctoin extended successfuly', '', {
        duration: 5000
      })
      this.dialogRef.close();
    }, 
      error => {
        this._snackBar.open(error.error.message, '', {
          duration: 5000
        });
      }
    )
  } 

  dismiss() {
    this.dialogRef.close();
  }
}
