import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Chart, ChartConfiguration } from 'chart.js/auto';

@Component({
  selector: 'app-dashboard-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard-home.component.html',
  styleUrl: './dashboard-home.component.css'
})
export class DashboardHomeComponent {

  @ViewChild('myBarChart') myBarChart!: ElementRef<HTMLCanvasElement>;
  @ViewChild('myLineChart') myLineChart!: ElementRef<HTMLCanvasElement>;
  @ViewChild('myPieChart') myPieChart!: ElementRef<HTMLCanvasElement>;
  @ViewChild('myDoughnutChart') myDoughnutChart!: ElementRef<HTMLCanvasElement>;

  barChart!: Chart;
  lineChart!: Chart;
  pieChart!: Chart;
  doughnutChart!: Chart;


  // Datos dinámicos para las tarjetas
  reportesHoy = 124;
  procesosAutomaticos = 58;
  archivosBancos = 36;
  procesosError = 5;

  ngAfterViewInit(): void {
    // Gráfico de barras
    const barConfig: ChartConfiguration = {
      type: 'bar',
      data: {
        labels: ['BCP', 'BBVA', 'Scotiabank', 'Intebank'],
        datasets: [{
          label: 'Archivos Procesados',
          data: [50, 25, 10, 40],
          backgroundColor: 'rgba(54, 162, 235, 0.6)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
         maintainAspectRatio: false,
        scales: {
          y: { beginAtZero: true }
        }
      }
    };
    this.barChart = new Chart(this.myBarChart.nativeElement, barConfig);

    // Gráfico de líneas
    const lineConfig: ChartConfiguration = {
      type: 'line',
      data: {
        labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'],
        datasets: [{
          label: 'Archivos Procesados',
          data: [640, 620, 680, 600, 620,650,830,700,600,645,670,880],
          fill: false,
          borderColor: 'rgba(75, 192, 192, 1)',
          tension: 0.1
        }]
      },
      options: {
        responsive: true,
         maintainAspectRatio: false,
        scales: {
          y: { beginAtZero: true }
        }
      }
    };
    this.lineChart = new Chart(this.myLineChart.nativeElement, lineConfig);

    // Gráfico de pastel
    const pieConfig: ChartConfiguration = {
      type: 'pie',
      data: {
        labels: ['Archivos no procesados', 'Archivos con errores', 'Archivos sin errores'],
        datasets: [{
          data: [10, 20, 30],
          backgroundColor: [
            'rgba(252, 30, 78, 0.7)',
            'rgba(255, 206, 86, 0.7)',
            'rgba(4, 245, 4, 0.7)'
          ],
          hoverOffset: 20
        }]
      },
      options: {
        responsive: true,
         maintainAspectRatio: false,
        plugins: {
          legend: { position: 'right' }
        }
      }
    };
    this.pieChart = new Chart(this.myPieChart.nativeElement, pieConfig);

    // Gráfico de doughnut (rosquilla)
    const doughnutConfig: ChartConfiguration = {
      type: 'doughnut',
      data: {
        labels: ['BCP', 'BBVA', 'Scotiabank', 'Interbank'],
        datasets: [{
          label: 'Colors',
          data: [50, 25, 10, 40],
          backgroundColor: [
            'rgba(255, 99, 132, 0.7)',
            'rgba(54, 162, 235, 0.7)',
            'rgba(255, 206, 86, 0.7)',
            'rgba(75, 192, 192, 0.7)'
          ],
          hoverOffset: 20
        }]
      },
      options: {
        responsive: true,
         maintainAspectRatio: false,
        plugins: {
          legend: { position: 'right' }
        }
      }
    };
    this.doughnutChart = new Chart(this.myDoughnutChart.nativeElement, doughnutConfig);
  }

}
