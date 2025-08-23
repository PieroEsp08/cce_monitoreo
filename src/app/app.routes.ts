import { Routes } from '@angular/router';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { DashboardHomeComponent } from './pages/dashboard/dashboard-home/dashboard-home.component';
import { DashboardProcesosComponent } from './pages/dashboard/dashboard-procesos/dashboard-procesos.component';
import { DeashboardMonitoreoReportesComponent } from './pages/dashboard/deashboard-monitoreo-reportes/deashboard-monitoreo-reportes.component';
import { DashboardLogsComponent } from './pages/dashboard/dashboard-logs/dashboard-logs.component';
import { DashboardServiciosComponent } from './pages/dashboard/dashboard-servicios/dashboard-servicios.component';
import { LoginComponent } from './auth/login/login.component';


export const routes: Routes = [

  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },

  {
  path: '',
  component: MainLayoutComponent,
  children: [
    { path: 'inicio', component: DashboardHomeComponent },
    { path: 'procesos', component: DashboardProcesosComponent},
    { path: 'reportes', component: DeashboardMonitoreoReportesComponent },
    { path: 'servicios', component: DashboardServiciosComponent },
    { path: 'logs', component: DashboardLogsComponent}
    ]
  },

];