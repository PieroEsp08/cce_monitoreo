import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeashboardMonitoreoReportesComponent } from './deashboard-monitoreo-reportes.component';

describe('DeashboardMonitoreoReportesComponent', () => {
  let component: DeashboardMonitoreoReportesComponent;
  let fixture: ComponentFixture<DeashboardMonitoreoReportesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeashboardMonitoreoReportesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DeashboardMonitoreoReportesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
