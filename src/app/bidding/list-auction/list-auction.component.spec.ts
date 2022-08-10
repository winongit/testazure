import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAuctionComponent } from './list-auction.component';

describe('ListAuctionComponent', () => {
  let component: ListAuctionComponent;
  let fixture: ComponentFixture<ListAuctionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListAuctionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListAuctionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
