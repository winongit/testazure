import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExtendBidsComponent } from './extend-bids.component';

describe('ExtendBidsComponent', () => {
  let component: ExtendBidsComponent;
  let fixture: ComponentFixture<ExtendBidsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExtendBidsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExtendBidsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
