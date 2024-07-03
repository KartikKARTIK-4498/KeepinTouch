import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardproductComponent } from './dashboardproduct.component';

describe('DashboardproductComponent', () => {
  let component: DashboardproductComponent;
  let fixture: ComponentFixture<DashboardproductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardproductComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DashboardproductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
