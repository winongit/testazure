import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExtendAuctionComponent } from './extend-auction.component';

describe('ExtendAuctionComponent', () => {
  let component: ExtendAuctionComponent;
  let fixture: ComponentFixture<ExtendAuctionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExtendAuctionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExtendAuctionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
