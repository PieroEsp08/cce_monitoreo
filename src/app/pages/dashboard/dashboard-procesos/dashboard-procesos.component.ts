import { Component, DestroyRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { interval, Subscription } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { HttpClientModule, HttpClient } from '@angular/common/http';



@Component({
  selector: 'app-dashboard-procesos',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './dashboard-procesos.component.html',
  styleUrl: './dashboard-procesos.component.css'
})
export class DashboardProcesosComponent {

  private readonly destroyRef = inject(DestroyRef);

  private http = inject(HttpClient);

  mostrarModal = false;
  procesoSeleccionado: any = null;
  logContenido: string[] = [];
  private logIntervalSub?: Subscription;

  registros = [
    {
      nombreProceso: 'Innmediatas Masivas',
      estado: 'En pausa',
      ultimaEjecucion: '',
      tiempoProceso:'—',
      proximaEjecucion: '2025-08-09 06:00',
      duracion: '—',
      resultado: 'Éxito',
      enlaceDetalle: 'assets/logs/20251021_inmediatas_masivas.log',
      segundosRandom: 0
    },
    {
      nombreProceso: 'Validación Titularidad',
      estado: 'En pausa',
      ultimaEjecucion: '',
      tiempoProceso:'—',
      proximaEjecucion: '2025-08-09 05:00',
      duracion: '—',
      resultado: 'Pendiente',
      enlaceDetalle: 'assets/logs/20251020_validacion_titularidad.log',
      segundosRandom: 0
    },
    {
      nombreProceso: 'Carga Directorio',
      estado: 'Deshabilitado',
      ultimaEjecucion: '',
      tiempoProceso:'—',
      proximaEjecucion: '2025-08-09 04:00',
      duracion: '—',
      resultado: 'Éxito',
      enlaceDetalle: '#',
      segundosRandom: 0
    },
    {
      nombreProceso: 'Listado Directorio',
      estado: 'En pausa',
      ultimaEjecucion: '',
      tiempoProceso:'—',
      proximaEjecucion: '2025-08-09 15:30',
      duracion: '—',
      resultado: 'Advertencias detectadas',
      enlaceDetalle: 'assets/logs/20251020_listado_directorio_entidades.log',
      segundosRandom: 0
    },
    {
      nombreProceso: 'Reporte BCRP',
      estado: 'En pausa',
      ultimaEjecucion: '',
      tiempoProceso:'—',
      proximaEjecucion: '2025-08-09 10:45',
      duracion: '—',
      resultado: 'Éxito',
      enlaceDetalle: 'assets/logs/20251021_reporte_bcrp_interoperabilidad.log',
      segundosRandom: 0
    },
    {
      nombreProceso: 'Reporte Circular',
      estado: 'En pausa',
      ultimaEjecucion: '',
      tiempoProceso:'—',
      proximaEjecucion: '2025-08-09 06:30',
      duracion: '—',
      resultado: 'Pendiente',
      enlaceDetalle: 'assets/logs/20251021_reporte_circular_bcrp.log',
      segundosRandom: 0
    },
  ];

  constructor() {
    const ahora = new Date();
    const fechaHora = this.formatearFecha(ahora);
    console.log('Aplicación levantada a las:', fechaHora);

    // Inicializamos ultimaEjecucion y proximaEjecucion
    this.registros = this.registros.map(registro => {
      const minutosExtra = this.obtenerMinutosSegunProceso(registro.nombreProceso);
      const proxima = new Date(ahora.getTime() + minutosExtra * 60000);
      return {
        ...registro,
        ultimaEjecucion: fechaHora,
        proximaEjecucion: this.formatearFecha(proxima)
      };
    });

    // Intervalo que verifica cada 5 segundos
     interval(5000)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        const ahora = new Date();

        this.registros = this.registros.map(registro => {
          const proxima = new Date(registro.proximaEjecucion);

          // Iniciar ejecución si el estado es "En pausa" y la hora actual >= proximaEjecucion
          if (registro.estado === 'En pausa' && ahora >= proxima) {
            const segundosRandom = Math.floor(Math.random() * 15) + 1; // 1-15 segundos
            return {
              ...registro,
              estado: 'En ejecución',
               tiempoProceso: '—',
               duracion: '—',
              ultimaEjecucion: this.formatearFecha(proxima),
              segundosRandom
            };
          }

          // Finalizar ejecución si han pasado los segundosRandom
          if (registro.estado === 'En ejecución') {
            const finEjecucion = new Date(proxima.getTime() + registro.segundosRandom * 1000);
            if (ahora >= finEjecucion) {
              // Calculamos la nueva proxima ejecucion según el proceso
              const nuevaProxima = new Date(proxima.getTime() + this.obtenerMinutosSegunProceso(registro.nombreProceso) * 60000);

              // Usamos directamente segundosRandom para calcular la duración
              const totalSegundos = registro.segundosRandom;
              const minutos = Math.floor(totalSegundos / 60);
              const segundos = totalSegundos % 60;
              const duracion = `${minutos > 0 ? minutos + 'min ' : ''}${segundos} seg`;



              return {
                ...registro,
                estado: 'En pausa',
                tiempoProceso: this.formatearFecha(finEjecucion),
                segundosRandom: 0,
                proximaEjecucion: this.formatearFecha(nuevaProxima),
                duracion
              };
            }
          }

          return registro;
        });
      });
  }

  private obtenerMinutosSegunProceso(nombre: string): number {
    if (['Innmediatas Masivas', 'Validación Titularidad', 'Carga Directorio'].includes(nombre)) {
      return 1;
    } else if (['Listado Directorio', 'Reporte BCRP', 'Reporte Circular'].includes(nombre)) {
      return 2;
    }
    return 0;
  }

  private formatearFecha(fecha: Date): string {
  const year = fecha.getFullYear();
  const month = String(fecha.getMonth() + 1).padStart(2, '0');
  const day = String(fecha.getDate()).padStart(2, '0');
  const hours = String(fecha.getHours()).padStart(2, '0');
  const minutes = String(fecha.getMinutes()).padStart(2, '0');
  const seconds = String(fecha.getSeconds()).padStart(2, '0'); // agregamos segundos
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

verDetalle(event: Event, registro: any) {
    event.preventDefault();
    this.procesoSeleccionado = registro;
    this.mostrarModal = true;
    if (registro.enlaceDetalle && registro.enlaceDetalle !== '#') {
      this.cargarLogAnimado(registro.enlaceDetalle);
    } else {
      this.logContenido = ['No hay log disponible para este proceso.'];
    }

  }

  cerrarModal() {
    this.mostrarModal = false;
    this.procesoSeleccionado = null;
  }

  private cargarLogAnimado(ruta: string) {
    this.logContenido = ['Cargando log...'];

    this.http.get(ruta, { responseType: 'text' }).subscribe({
      next: (data) => {
        const lineas = data.split('\n');
        this.logContenido = [];
        let index = 0;

        this.logIntervalSub?.unsubscribe();

        this.logIntervalSub = interval(500).subscribe(() => {
          if (index < lineas.length) {
            this.logContenido.push(lineas[index]);
            index++;
          } else {
            this.logIntervalSub?.unsubscribe();
          }
        });
      },
      error: () => {
        this.logContenido = ['No se pudo cargar el archivo log.'];
      }
    });
  }
  

}
