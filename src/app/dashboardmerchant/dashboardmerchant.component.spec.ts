import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardmerchantComponent } from './dashboardmerchant.component';

describe('DashboardmerchantComponent', () => {
  let component: DashboardmerchantComponent;
  let fixture: ComponentFixture<DashboardmerchantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardmerchantComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DashboardmerchantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
