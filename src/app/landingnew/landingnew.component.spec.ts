import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingnewComponent } from './landingnew.component';

describe('LandingnewComponent', () => {
  let component: LandingnewComponent;
  let fixture: ComponentFixture<LandingnewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LandingnewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LandingnewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
