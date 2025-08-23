import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardReportesComponent } from './dashboard-reportes.component';

describe('DashboardReportesComponent', () => {
  let component: DashboardReportesComponent;
  let fixture: ComponentFixture<DashboardReportesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardReportesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DashboardReportesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
