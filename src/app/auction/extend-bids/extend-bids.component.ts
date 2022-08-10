import { MatSnackBar } from '@angular/material/snack-bar';
import {
  AfterViewInit,
  Component,
  Inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Bid } from 'src/app/shared/models/bid';
import { MatSort, Sort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-extend-bids',
  templateUrl: './extend-bids.component.html',
  styleUrls: ['./extend-bids.component.scss'],
})
export class ExtendBidsComponent implements OnInit {
  displayedColumns: string[] = [
    'bid_amount',
    'created_by',
    'created_at',
    'winner',
  ];
  dataSource!: MatTableDataSource<Bid>;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(
    @Inject(MAT_DIALOG_DATA) public bids: Bid[],
    private dialogRef: MatDialogRef<ExtendBidsComponent>,
    private _snackBar: MatSnackBar
  ) {
    this.dataSource = new MatTableDataSource<Bid>(bids);
  }

  ngOnInit(): void {}

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
}
