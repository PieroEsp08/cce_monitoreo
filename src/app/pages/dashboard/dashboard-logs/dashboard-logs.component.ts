import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-dashboard-logs',
  standalone: true,
  imports: [CommonModule,FormsModule, HttpClientModule ],
  templateUrl: './dashboard-logs.component.html',
  styleUrl: './dashboard-logs.component.css'
})
export class DashboardLogsComponent {

  filtros = {
    fechaInicio: '',
    fechaFin: '',
    procesoOrigen: ''
  };

  registrosOriginal = [
   {
    nombre: '20230814LISTADO_DIRECTORIO_ENTIDADES',
    procesoOrigen: 'LISTADO DIRECTORIO',
    fechaGeneracion: '2023-08-14',
    estado: 'Completado',
    formato: 'LOG',
    tamanio: '3.2 MB',
    enlaceDescarga: 'assets/logs/20230814LISTADO_DIRECTORIO_ENTIDADES.log',
    enlaceDetalle: '#'
  },
  {
    nombre: '20230904CARGA-DIRECRORIO',
    procesoOrigen: 'CARGA DIRECTORIO',
    fechaGeneracion: '2023-09-04',
    estado: 'Completado',
    formato: 'LOG',
    tamanio: '1.8 MB',
    enlaceDescarga: 'assets/logs/20230904CARGA-DIRECRORIO.log',
    enlaceDetalle: '#'
  },
  {
    nombre: '20240715REPORTE-INTERBANK',
    procesoOrigen: 'INNMEDIATAS MASIVAS',
    fechaGeneracion: '2024-07-15',
    estado: 'En proceso',
    formato: 'LOG',
    tamanio: '1.2 MB',
    enlaceDescarga: 'assets/logs/20240715REPORTE-INTERBANK.log',
    enlaceDetalle: '#'
  },
  {
    nombre: '20250611INMEDIATAS-MASIVAS',
    procesoOrigen: 'INNMEDIATAS MASIVAS',
    fechaGeneracion: '2025-06-11',
    estado: 'Completado',
    formato: 'LOG',
    tamanio: '2.5 MB',
    enlaceDescarga: 'assets/logs/20250611INMEDIATAS-MASIVAS.log',
    enlaceDetalle: '#'
  },
  {
    nombre: '20250624VALIDACION-TITULARIDAD',
    procesoOrigen: 'VALIDACION TITULARIDAD',
    fechaGeneracion: '2025-06-24',
    estado: 'Con Observaciones',
    formato: 'LOG',
    tamanio: '900 KB',
    enlaceDescarga: 'assets/logs/20250624VALIDACION-TITULARIDAD.log',
    enlaceDetalle: '#'
  },
  {
    nombre: '20250808_REPORTE_CIRCULAR',
    procesoOrigen: 'REPORTE CIRCULAR',
    fechaGeneracion: '2025-08-08',
    estado: 'Completado',
    formato: 'LOG',
    tamanio: '900 KB',
    enlaceDescarga: 'assets/logs/20250808_REPORTE_CIRCULAR.log',
    enlaceDetalle: '#'
  },
  {
    nombre: '20250814_REPORTE_CIRCULAR',
    procesoOrigen: 'REPORTE CIRCULAR',
    fechaGeneracion: '2025-08-14',
    estado: 'Con Observaciones',
    formato: 'LOG',
    tamanio: '900 KB',
    enlaceDescarga: 'assets/logs/20250814_REPORTE_CIRCULAR.log',
    enlaceDetalle: '#'
  },
  {
    nombre: '20250717_REPORTE_CIRCULAR',
    procesoOrigen: 'REPORTE CIRCULAR',
    fechaGeneracion: '2025-07-17',
    estado: 'Completado',
    formato: 'LOG',
    tamanio: '900 KB',
    enlaceDescarga: 'assets/logs/20250717_REPORTE_CIRCULAR.log',
    enlaceDetalle: '#'
  },
  {
    nombre: '20250520INMEDIATAS-MASIVAS',
    procesoOrigen: 'INNMEDIATAS MASIVAS',
    fechaGeneracion: '2025-05-20',
    estado: 'Con Observaciones',
    formato: 'LOG',
    tamanio: '900 KB',
    enlaceDescarga: 'assets/logs/20250520INMEDIATAS-MASIVAS.log',
    enlaceDetalle: '#'
  },
  {
    nombre: '20250414REPORTEBCRP',
    procesoOrigen: 'INMMEDIATAS MASIVAS',
    fechaGeneracion: '2025-04-14',
    estado: 'Con Observaciones',
    formato: 'LOG',
    tamanio: '900 KB',
    enlaceDescarga: 'assets/logs/20250414REPORTEBCRP.log',
    enlaceDetalle: '#'
  },
  {
    nombre: '20250715_REPORTE_CIRCULAR',
    procesoOrigen: 'REPORTE CIRCULAR',
    fechaGeneracion: '2025-07-15',
    estado: 'Con Observaciones',
    formato: 'LOG',
    tamanio: '900 KB',
    enlaceDescarga: 'assets/logs/20250715_REPORTE_CIRCULAR.log',
    enlaceDetalle: '#'
  }

];

  registros = [...this.registrosOriginal];

  procesos: string[] = ['INNMEDIATAS MASIVAS', 'VALIDACION TITULARIDAD', 'CARGA DIRECTORIO','LISTADO DIRECTORIO','REPORTE BCRP','REPORTE CIRCULAR'];

  logContenido: string = '';

  constructor(private http: HttpClient) {}

  aplicarFiltros() {
    this.registros = this.registrosOriginal.filter(reporte => {
      const fecha = new Date(reporte.fechaGeneracion);
      const fechaInicio = this.filtros.fechaInicio ? new Date(this.filtros.fechaInicio) : null;
      const fechaFin = this.filtros.fechaFin ? new Date(this.filtros.fechaFin) : null;

      const cumpleFecha =
        (!fechaInicio || fecha >= fechaInicio) &&
        (!fechaFin || fecha <= fechaFin);

      const cumpleProceso =
        !this.filtros.procesoOrigen || reporte.procesoOrigen === this.filtros.procesoOrigen;

      return cumpleFecha && cumpleProceso;
    });
  }

   verDetalle(reporte: any) {
    // Cargar contenido del log usando HttpClient
    this.http.get(reporte.enlaceDescarga, { responseType: 'text' }).subscribe(
      data => {
        this.logContenido = data;
      },
      error => {
        this.logContenido = 'No se pudo cargar el contenido del log.';
        console.error(error);
      }
    );
  }

}
