import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardProcesosComponent } from './dashboard-procesos.component';

describe('DashboardProcesosComponent', () => {
  let component: DashboardProcesosComponent;
  let fixture: ComponentFixture<DashboardProcesosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardProcesosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DashboardProcesosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
