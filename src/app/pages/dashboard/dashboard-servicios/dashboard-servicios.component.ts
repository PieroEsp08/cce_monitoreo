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
    banco: 'Interbank',
    nombreArchivo: '0003MASIVAS20251021190801',
    fechaRecepcion: '2025-10-21 10:35',
    estado: 'Procesado',
    tamanio: '1.2 MB',
    procesoAsociado: 'Carga de Movimientos',
    enlaceDescarga: 'assets/logs/0003MASIVAS20251021190801.rpta.csv.pgp'
  },
  {
    banco: 'BCP',
    nombreArchivo: '0011MASIVAS20251002230101',
    fechaRecepcion: '2025-10-02 10:35',
    estado: 'Procesado',
    tamanio: '1.2 MB',
    procesoAsociado: 'Carga de Movimientos',
    enlaceDescarga: 'assets/logs/0011MASIVAS20251002230101.rpta.csv.pgp'
  },
  {
    banco: 'Scotiabank',
    nombreArchivo: '0023MASIVAS20251020162056',
    fechaRecepcion: '2025-10-20 09:20',
    estado: 'Pendiente',
    tamanio: '856 KB',
    procesoAsociado: 'Actualización de Clientes',
    enlaceDescarga: 'assets/logs/0023MASIVAS20251020162056.rpta.csv.pgp'
  },
  {
    banco: 'Scotiabank',
    nombreArchivo: '0023MASIVAS20251020162057',
    fechaRecepcion: '2025-10-20 09:20',
    estado: 'Pendiente',
    tamanio: '856 KB',
    procesoAsociado: 'Actualización de Clientes',
    enlaceDescarga: 'assets/logs/0023MASIVAS20251020162057.rpta.csv.pgp'
  },
  {
    banco: 'BBVA',
    nombreArchivo: '0035MASIVAS20251020154801',
    fechaRecepcion: '2025-10-20 08:50',
    estado: 'Error',
    tamanio: '512 KB',
    procesoAsociado: 'Validación de Pagos',
    enlaceDescarga: 'assets/logs/0035MASIVAS20251020154801.rpta.csv.pgp'
  },
    {
    banco: 'BBVA',
    nombreArchivo: '0035MASIVAS20251021121001',
    fechaRecepcion: '2025-10-21 08:50',
    estado: 'Error',
    tamanio: '512 KB',
    procesoAsociado: 'Validación de Pagos',
    enlaceDescarga: 'assets/logs/0035MASIVAS20251021121001.rpta.csv.pgp'
  },
  {
    banco: 'BBVA',
    nombreArchivo: '0035MASIVAS20251021123001',
    fechaRecepcion: '2025-10-21 17:15',
    estado: 'Procesado',
    tamanio: '2.4 MB',
    procesoAsociado: 'Consolidación de Transferencias',
    enlaceDescarga: 'assets/logs/0035MASIVAS20251021123001.rpta.csv.pgp'
  },
    {
    banco: 'Caja Huancayo',
    nombreArchivo: '0099MASIVAS20251021142301',
    fechaRecepcion: '2025-10-21 17:15',
    estado: 'Procesado',
    tamanio: '2.4 MB',
    procesoAsociado: 'Consolidación de Transferencias',
    enlaceDescarga: 'assets/logs/0099MASIVAS20251021142301.rpta.csv.pgp'
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


  bancos: string[] = ['BCP', 'BBVA', 'Interbank', 'Scotiabank','Caja Huancayo'];

  aplicarFiltros() {
  this.registros = this.registrosOriginal.filter(reporte => {
    const fecha = new Date(reporte.fechaRecepcion);
    const fechaInicio = this.filtros.fechaInicio ? new Date(this.filtros.fechaInicio) : null;
    const fechaFin = this.filtros.fechaFin ? new Date(this.filtros.fechaFin) : null;

    const cumpleFecha =
      (!fechaInicio || fecha >= fechaInicio) &&
      (!fechaFin || fecha <= fechaFin);

    const prefijosBanco: Record<string, string> = {
      BCP: "0011",
      Interbank: "0003",
      BBVA: "0035",
      Scotiabank: "0023",
       "Caja Huancayo": "0099"
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
