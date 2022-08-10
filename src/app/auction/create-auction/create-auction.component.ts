import { HttpResponse, HttpStatusCode } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarRef, SimpleSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
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
  selector: 'app-create-auction',
  templateUrl: './create-auction.component.html',
  styleUrls: ['./create-auction.component.scss']
})
export class CreateAuctionComponent implements OnInit {
  auctionForm!: FormGroup;
  selectedFiles?: FileList;
  selectedFileNames: string[] = [];
  uploadedFileName: string = "";
  auction!: Auction;

  imageSelect: boolean = false;

  previews: string[] = [];

  constructor(private fb: FormBuilder, private auctionService: AuctionService, private _snackBar: MatSnackBar,
    private router: Router) { 
    this.auctionForm = this.fb.group({  
      title: ['', Validators.required],
      category: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(1)]],
      description: ['', Validators.required],
      end_time: ['', [Validators.required, dateValidator()]]
    });
  }

  ngOnInit(): void {
  }

  save() {
    this.auction = {...this.auctionForm.value};

    // upload image first, after call back success, it will call the auction service
    this.uploadFiles();
  }

  dismiss () {
    this.auctionForm.get('title')?.setValue('');
    this.auctionForm.get('category')?.setValue('');
    this.auctionForm.get('price')?.setValue(0);
    this.auctionForm.get('description')?.setValue('');
    this.auctionForm.get('end_time')?.setValue('');

    this.imageSelect = false;
    this.previews = [];
    this.selectedFileNames = [];

  }

  openSnackBar(message: string, action: string) : MatSnackBarRef<SimpleSnackBar> {
    return this._snackBar.open(message, action, {
      duration: 5000,
    });
  }

  selectFiles(event: any): void {
    this.selectedFiles = event.target.files;
    this.previews = [];
    this.imageSelect = false;

    if (this.selectedFiles && this.selectedFiles[0]) {
      console.log('inside selected files')
      const numberOfFiles = this.selectedFiles.length;
      for (let i = 0; i < numberOfFiles; i++) {
        const reader = new FileReader();

        reader.onload = (e: any) => {
          console.log(e.target.result);
          this.previews.push(e.target.result);
        };

        reader.readAsDataURL(this.selectedFiles[i]);

        this.selectedFileNames.push(this.selectedFiles[i].name);
        this.imageSelect = true;
      }
    }
  }

  uploadFiles(): void {
    if (this.selectedFiles) {
      for (let i = 0; i < this.selectedFiles.length; i++) {
        this.upload(i, this.selectedFiles[i]);
      }
    }
  }

  upload(idx: number, file: File): void {
    if (file) {
      this.auctionService.upload(file).subscribe(
        (event: any) => {
          if (event instanceof HttpResponse) {
            console.log('upload successfully');
            console.log(event);
            if (event.status == HttpStatusCode.Ok) {
              this.auction.imgUrl = event.body.filename as string;

              // Save the auctoin
              this.auctionService.saveAuction(
                this.auction
              ).subscribe(res => {
                this.openSnackBar('Auction announced', 'Navigate')
                  .onAction().subscribe(() => {
                    this.router.navigate(['/','auction']);
                  });
              });
            }
          }
        }
      )
    } 
  }

}
