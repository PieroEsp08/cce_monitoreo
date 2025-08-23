import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dashboard-servicios',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './dashboard-servicios.component.html',
  styleUrl: './dashboard-servicios.component.css'
})
export class DashboardServiciosComponent {

  filtros = {
    fechaInicio: '',
    fechaFin: '',
    banco: ''
  };

   registrosOriginal = [
   {
    banco: 'BCP',
    nombreArchivo: '002_Innmediatas_Masivas_',
    fechaRecepcion: '2025-08-08 10:35',
    estado: 'Procesado',
    tamanio: '1.2 MB',
    procesoAsociado: 'Carga de Movimientos',
    enlaceDetalle: '#'
  },
  {
    banco: 'BCP',
    nombreArchivo: '002_Validacion_Titularidad_',
    fechaRecepcion: '2025-08-08 10:35',
    estado: 'Procesado',
    tamanio: '1.2 MB',
    procesoAsociado: 'Carga de Movimientos',
    enlaceDetalle: '#'
  },
  {
    banco: 'Interbank',
    nombreArchivo: '003_Innmediatas_Masivas_',
    fechaRecepcion: '2025-08-08 09:20',
    estado: 'Pendiente',
    tamanio: '856 KB',
    procesoAsociado: 'Actualización de Clientes',
    enlaceDetalle: '#'
  },
  {
    banco: 'Interbank',
    nombreArchivo: '003_Validacion_Titularidad_',
    fechaRecepcion: '2025-08-08 09:20',
    estado: 'Pendiente',
    tamanio: '856 KB',
    procesoAsociado: 'Actualización de Clientes',
    enlaceDetalle: '#'
  },
  {
    banco: 'BBVA',
    nombreArchivo: '004_Innmediatas_Masivas_',
    fechaRecepcion: '2025-08-08 08:50',
    estado: 'Error',
    tamanio: '512 KB',
    procesoAsociado: 'Validación de Pagos',
    enlaceDetalle: '#'
  },
    {
    banco: 'BBVA',
    nombreArchivo: '004_Validacion_Titularidad_',
    fechaRecepcion: '2025-08-08 08:50',
    estado: 'Error',
    tamanio: '512 KB',
    procesoAsociado: 'Validación de Pagos',
    enlaceDetalle: '#'
  },
  {
    banco: 'Scotiabank',
    nombreArchivo: '005_Inmmediatas_Masivas_',
    fechaRecepcion: '2025-08-07 17:15',
    estado: 'Procesado',
    tamanio: '2.4 MB',
    procesoAsociado: 'Consolidación de Transferencias',
    enlaceDetalle: '#'
  },
    {
    banco: 'Scotiabank',
    nombreArchivo: '005_Validacion_Titularidad_',
    fechaRecepcion: '2025-08-07 17:15',
    estado: 'Procesado',
    tamanio: '2.4 MB',
    procesoAsociado: 'Consolidación de Transferencias',
    enlaceDetalle: '#'
  },
  ];

  registros = [...this.registrosOriginal];


   constructor() {
    this.agregarFechaRandomATodos();
  }

  // 👉 Genera fecha random del año y mes actual, <= hoy
  generarFechaRandom(): string {
    const hoy = new Date();
    const year = hoy.getFullYear();
    const month = hoy.getMonth(); // mes actual (0-11)
    const diaMaximo = hoy.getDate(); // hasta hoy

    const diaRandom = Math.floor(Math.random() * diaMaximo) + 1;
    const fechaRandom = new Date(year, month, diaRandom);

    const yyyy = fechaRandom.getFullYear();
    const mm = String(fechaRandom.getMonth() + 1).padStart(2, '0');
    const dd = String(fechaRandom.getDate()).padStart(2, '0');

    return `${yyyy}-${mm}-${dd}`;
  }

  agregarFechaRandomATodos() {
    this.registrosOriginal = this.registrosOriginal.map(registro => {
      if (registro.nombreArchivo.endsWith("_")) {
        const fechaRandom = this.generarFechaRandom();
        return {
          ...registro,
          nombreArchivo: registro.nombreArchivo + fechaRandom,
          fechaRecepcion: fechaRandom
        };
      }
      return registro;
    });

    this.registros = [...this.registrosOriginal];
  }


  bancos: string[] = ['BCP', 'BBVA', 'Interbank', 'Scotiabank'];

  aplicarFiltros() {
  this.registros = this.registrosOriginal.filter(reporte => {
    const fecha = new Date(reporte.fechaRecepcion);
    const fechaInicio = this.filtros.fechaInicio ? new Date(this.filtros.fechaInicio) : null;
    const fechaFin = this.filtros.fechaFin ? new Date(this.filtros.fechaFin) : null;

    const cumpleFecha =
      (!fechaInicio || fecha >= fechaInicio) &&
      (!fechaFin || fecha <= fechaFin);

    const prefijosBanco: Record<string, string> = {
      BCP: "002_",
      Interbank: "003_",
      BBVA: "004_",
      Scotiabank: "005_"
    };

    let cumpleBanco = true;

    if (this.filtros.banco) {
      const prefijo = prefijosBanco[this.filtros.banco];
      cumpleBanco = reporte.nombreArchivo.startsWith(prefijo);
    }

    return cumpleFecha && cumpleBanco;
  });
}

verDetalle(event: Event) {
  event.preventDefault(); // Evita que el navegador haga la navegación
  console.log('Click en ver detalle');
  // Por ahora no haces nada
}

}
