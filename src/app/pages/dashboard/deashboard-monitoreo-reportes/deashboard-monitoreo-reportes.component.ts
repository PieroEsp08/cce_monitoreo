import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';  

@Component({
  selector: 'app-deashboard-monitoreo-reportes',
  standalone: true,
  imports: [CommonModule,FormsModule ],
  templateUrl: './deashboard-monitoreo-reportes.component.html',
  styleUrl: './deashboard-monitoreo-reportes.component.css'
})
export class DeashboardMonitoreoReportesComponent {

  filtros = {
    fechaInicio: '',
    fechaFin: '',
    estado: '',
    banco: ''
  };

  // Lista original con todos los registros
  registrosOriginal = [
     {
    nombre: '002_Listado_Directorio_',
    procesoOrigen: 'Listado Directorio',
    fechaGeneracion: '2025-08-01',
    estado: 'Completado',
    formato: 'CSV',
    tamanio: '3.2 MB',
    enlaceDescarga: '#',
    enlaceDetalle: '#'
  },
  {
    nombre: '003_Listado_Directorio_',
    procesoOrigen: 'Listado Directorio',
    fechaGeneracion: '2025-07-30',
    estado: 'Completado',
    formato: 'CSV',
    tamanio: '1.8 MB',
    enlaceDescarga: '#',
    enlaceDetalle: '#'
  },
  {
    nombre: '004_Listado_Directorio_',
    procesoOrigen: 'Listado Directorio',
    fechaGeneracion: '2025-08-05',
    estado: 'Completado',
    formato: 'CSV',
    tamanio: '1.2 MB',
    enlaceDescarga: '#',
    enlaceDetalle: '#'
  },
  {
    nombre: 'BCRP_Reporte_Circular_2025-08-04',
    procesoOrigen: 'Reporte Cirular',
    fechaGeneracion: '2025-08-04',
    estado: 'Completado',
    formato: 'CSV',
    tamanio: '2.5 MB',
    enlaceDescarga: '#',
    enlaceDetalle: '#'
  },
  {
    nombre: 'BCRP_Reporte_Circular_2025-08-11',
    procesoOrigen: 'Reporte Cirular',
    fechaGeneracion: '2025-08-11',
    estado: 'Completado',
    formato: 'CSV',
    tamanio: '900 KB',
    enlaceDescarga: '#',
    enlaceDetalle: '#'
  },
  {
    nombre: 'BCRP_Reporte_Circular_2025-08-18',
    procesoOrigen: 'Reporte Cirular',
    fechaGeneracion: '2025-08-18',
    estado: 'Completado',
    formato: 'CSV',
    tamanio: '900 KB',
    enlaceDescarga: '#',
    enlaceDetalle: '#'
  },
  {
    nombre: 'BCRP_Reporte_Circular_2025-08-04',
    procesoOrigen: 'Reporte BCRP',
    fechaGeneracion: '2025-08-04',
    estado: 'Completado',
    formato: 'CSV',
    tamanio: '2.5 MB',
    enlaceDescarga: '#',
    enlaceDetalle: '#'
  },
  {
    nombre: 'BCRP_Reporte_Circular_2025-08-11',
    procesoOrigen: 'Reporte BCRP',
    fechaGeneracion: '2025-08-11',
    estado: 'Completado',
    formato: 'CSV',
    tamanio: '900 KB',
    enlaceDescarga: '#',
    enlaceDetalle: '#'
  },
  {
    nombre: 'BCRP_Reporte_Circular_2025-08-18',
    procesoOrigen: 'Reporte BCRP',
    fechaGeneracion: '2025-08-18',
    estado: 'Completado',
    formato: 'CSVL',
    tamanio: '900 KB',
    enlaceDescarga: '#',
    enlaceDetalle: '#'
  },
  ];

  // Lista que se muestra en la tabla
  registros = [...this.registrosOriginal];

     constructor() {
    this.agregarFechaRandomATodos();
  }

  // 👉 Genera fecha aleatoria del mes actual y <= hoy
  generarFechaRandom(): string {
    const hoy = new Date();
    const year = hoy.getFullYear();
    const month = hoy.getMonth(); // mes actual (0-11)
    const diaMaximo = hoy.getDate(); // límite: día actual

    const diaRandom = Math.floor(Math.random() * diaMaximo) + 1; // entre 1 y hoy
    const fechaRandom = new Date(year, month, diaRandom);

    const yyyy = fechaRandom.getFullYear();
    const mm = String(fechaRandom.getMonth() + 1).padStart(2, '0');
    const dd = String(fechaRandom.getDate()).padStart(2, '0');

    return `${yyyy}-${mm}-${dd}`;
  }

  agregarFechaRandomATodos() {
    this.registrosOriginal = this.registrosOriginal.map(registro => {
      if (registro.nombre.endsWith("_")) {
        const fechaRandom = this.generarFechaRandom();
        return {
          ...registro,
          nombre: registro.nombre + fechaRandom,
          fechaGeneracion: fechaRandom
        };
      }
      return registro;
    });

    this.registros = [...this.registrosOriginal];
  }

  bancos: string[] = ['BCP', 'BBVA', 'Interbank', 'Scotiabank', 'BCRP'];

  aplicarFiltros() {
  this.registros = this.registrosOriginal.filter(reporte => {
    const fecha = new Date(reporte.fechaGeneracion);
    const fechaInicio = this.filtros.fechaInicio ? new Date(this.filtros.fechaInicio) : null;
    const fechaFin = this.filtros.fechaFin ? new Date(this.filtros.fechaFin) : null;

    const cumpleFecha =
      (!fechaInicio || fecha >= fechaInicio) &&
      (!fechaFin || fecha <= fechaFin);

    const cumpleEstado =
      !this.filtros.estado || reporte.estado === this.filtros.estado;

    const prefijosBanco: Record<string, string> = {
      BCP: "002_",
      Interbank: "003_",
      BBVA: "004_",
      Scotiabank: "005_",
      BCRP: "BCRP_"
    };

    let cumpleBanco = true;

    if (this.filtros.banco) {
      const prefijo = prefijosBanco[this.filtros.banco];
      cumpleBanco = reporte.nombre.startsWith(prefijo);
    }

    return cumpleFecha && cumpleEstado && cumpleBanco;
  });
}

verDetalle(event: Event) {
  event.preventDefault(); // Evita que el navegador haga la navegación
  console.log('Click en ver detalle');
  // Por ahora no haces nada
}

}
